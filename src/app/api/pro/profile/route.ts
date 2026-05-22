import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const profile = await prisma.proProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        services: { where: { isActive: true } },
        availability: { where: { isActive: true } },
      },
    })

    if (!profile) {
      return NextResponse.json({ error: 'Pro profile not found' }, { status: 404 })
    }

    return NextResponse.json({ profile })
  } catch (error) {
    console.error('Get pro profile error:', error)
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()
    const { businessName, bio, specialty, location, phone, avatar } = data

    const profile = await prisma.proProfile.update({
      where: { userId: session.user.id },
      data: {
        ...(businessName && { businessName }),
        ...(bio !== undefined && { bio }),
        ...(specialty !== undefined && { specialty }),
        ...(location !== undefined && { location }),
        ...(phone !== undefined && { phone }),
        ...(avatar !== undefined && { avatar }),
      },
    })

    return NextResponse.json({ success: true, profile })
  } catch (error) {
    console.error('Update pro profile error:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
