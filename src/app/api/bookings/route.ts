import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { proId, serviceId, date, notes } = await req.json()

    if (!proId || !serviceId || !date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const service = await prisma.service.findUnique({ where: { id: serviceId } })
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    const booking = await prisma.booking.create({
      data: {
        customerId: session.user.id,
        proId,
        serviceId,
        date: new Date(date),
        duration: service.duration,
        totalAmount: service.price,
        notes: notes || null,
        status: 'PENDING',
      },
      include: {
        service: true,
        pro: { include: { user: { select: { name: true } } } },
      },
    })

    return NextResponse.json({ success: true, booking }, { status: 201 })
  } catch (error) {
    console.error('Create booking error:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userWithProfile = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { proProfile: true },
    })

    let bookings

    if ((userWithProfile as any)?.role === 'PRO' && userWithProfile?.proProfile) {
      bookings = await prisma.booking.findMany({
        where: { proId: userWithProfile.proProfile.id },
        orderBy: { date: 'asc' },
        include: {
          customer: { select: { name: true, email: true, image: true } },
          service: true,
        },
      })
    } else {
      bookings = await prisma.booking.findMany({
        where: { customerId: session.user.id },
        orderBy: { date: 'asc' },
        include: {
          pro: {
            include: { user: { select: { name: true, image: true } } },
          },
          service: true,
        },
      })
    }

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Get bookings error:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}
