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

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const data = await req.json()
  if (data.password) {
    const bcrypt = await import('bcryptjs')
    data.password = await bcrypt.default.hash(data.password, 12)
  }
  const user = await prisma.user.update({ where: { id: params.id }, data })
  return NextResponse.json({ user: { ...user, password: undefined } })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  await prisma.user.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
