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
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: { proProfile: { select: { id: true, businessName: true, planTier: true } } },
  })
  return NextResponse.json({ users: users.map(u => ({ ...u, password: undefined })) })
}

export async function POST(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { email, name, role, password } = await req.json()
  if (!email || !role) return NextResponse.json({ error: 'email and role required' }, { status: 400 })
  const bcrypt = await import('bcryptjs')
  const hashed = password ? await bcrypt.default.hash(password, 12) : null
  const user = await prisma.user.create({
    data: { email, name, role, password: hashed },
  })
  return NextResponse.json({ user: { ...user, password: undefined } }, { status: 201 })
}
