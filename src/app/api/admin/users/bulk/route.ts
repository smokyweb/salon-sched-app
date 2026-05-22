import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return null
  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (user?.role !== 'ADMIN') return null
  return session
}

export async function POST(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { users } = await req.json()

  if (!Array.isArray(users) || users.length === 0) {
    return NextResponse.json({ error: 'No users provided' }, { status: 400 })
  }
  if (users.length > 500) {
    return NextResponse.json({ error: 'Max 500 users per batch' }, { status: 400 })
  }

  const results = { created: 0, skipped: 0, errors: [] as string[] }

  // Process in chunks of 50 to avoid DB overload
  const CHUNK = 50
  for (let i = 0; i < users.length; i += CHUNK) {
    const chunk = users.slice(i, i + CHUNK)
    await Promise.all(chunk.map(async (u: any, idx: number) => {
      const rowNum = i + idx + 1
      try {
        const email = u.email?.trim().toLowerCase()
        if (!email || !email.includes('@')) {
          results.errors.push(`Row ${rowNum}: invalid email "${u.email}"`)
          results.skipped++
          return
        }

        const role = ['CUSTOMER', 'PRO', 'ADMIN'].includes(u.role?.toUpperCase())
          ? u.role.toUpperCase()
          : 'CUSTOMER'

        const existing = await prisma.user.findUnique({ where: { email } })
        if (existing) {
          results.skipped++
          return
        }

        const password = u.password?.trim()
        const hashed = password && password.length >= 8
          ? await bcrypt.hash(password, 10)
          : await bcrypt.hash('Glowly2026!', 10) // default password

        await prisma.user.create({
          data: {
            email,
            name: u.name?.trim() || null,
            role,
            password: hashed,
            ...(role === 'PRO' ? {
              proProfile: {
                create: {
                  businessName: u.businessName?.trim() || u.name?.trim() || email.split('@')[0],
                  specialty: u.specialty?.trim() || null,
                  location: u.location?.trim() || null,
                  planTier: 'starter',
                }
              }
            } : {})
          }
        })
        results.created++
      } catch (e: any) {
        results.errors.push(`Row ${rowNum} (${u.email}): ${e.message}`)
        results.skipped++
      }
    }))
  }

  return NextResponse.json({ success: true, ...results })
}
