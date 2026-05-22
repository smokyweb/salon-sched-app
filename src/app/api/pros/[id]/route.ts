import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const pro = await prisma.proProfile.findUnique({
      where: { id: params.id },
      include: {
        user: { select: { name: true, email: true, image: true } },
        services: { where: { isActive: true } },
        availability: { where: { isActive: true } },
      },
    })

    if (!pro) {
      return NextResponse.json({ error: 'Pro not found' }, { status: 404 })
    }

    return NextResponse.json({ pro })
  } catch (error) {
    console.error('Get pro error:', error)
    return NextResponse.json({ error: 'Failed to fetch pro' }, { status: 500 })
  }
}
