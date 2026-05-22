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
  const services = await prisma.service.findMany({
    orderBy: { name: 'asc' },
    include: { pro: { select: { businessName: true } } },
  })
  return NextResponse.json({ services })
}

export async function POST(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const data = await req.json()
  const service = await prisma.service.create({ data })
  return NextResponse.json({ service }, { status: 201 })
}
