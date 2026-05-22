import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return null
  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (user?.role !== 'ADMIN') return null
  return session
}

export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const profiles = await prisma.proProfile.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { email: true, name: true } },
      services: true,
      _count: { select: { bookings: true } },
    },
  })
  return NextResponse.json({ profiles })
}

export async function POST(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const data = await req.json()
  const profile = await prisma.proProfile.create({ data })
  return NextResponse.json({ profile }, { status: 201 })
}
