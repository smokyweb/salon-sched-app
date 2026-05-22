import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const pros = await prisma.proProfile.findMany({
      where: { isActive: true },
      orderBy: [{ isVerified: 'desc' }, { rating: 'desc' }],
      include: {
        user: { select: { name: true, email: true, image: true } },
        services: { where: { isActive: true }, take: 3 },
      },
    })

    return NextResponse.json({ pros })
  } catch (error) {
    console.error('Get pros error:', error)
    return NextResponse.json({ error: 'Failed to fetch pros' }, { status: 500 })
  }
}
