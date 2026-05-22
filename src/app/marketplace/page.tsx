import Navbar from '../../components/Navbar'
import ProfessionalCard from '../../components/ProfessionalCard'
import { prisma } from '../../lib/prisma'
import { SlidersHorizontal, Search, MapPin, Sparkles, Users } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const CATEGORIES = [
  'All', 'Hair', 'Nails', 'Skin', 'Massage', 'Makeup', 'Brows', 'Lashes', 'Other'
]

async function getPros() {
  try {
    return await prisma.proProfile.findMany({
      where: { isActive: true },
      orderBy: [{ isVerified: 'desc' }, { rating: 'desc' }, { createdAt: 'desc' }],
      include: {
        user: { select: { name: true, email: true } },
        services: {
          where: { isActive: true },
          orderBy: { price: 'asc' },
          take: 6,
        },
      },
    })
  } catch {
    return []
  }
}

export default async function MarketplacePage() {
  const pros = await getPros()
  const totalServices = pros.reduce((n, p) => n + p.services.length, 0)

  return (
    <div className="min-h-screen" style={{ background: '#080D1A' }}>
      <Navbar />

      {/* Hero header — logo palette: navy → purple gradient */}
      <div className="pt-20">
        <div className="relative overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #0E1B45 0%, #4B2D7F 60%, #1a0d2e 100%)' }}>
          {/* Decorative orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: '#E83592' }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none"
            style={{ background: '#1A6FD4' }} />

          <div className="relative max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
              Find Your Professional
            </h1>
            <p style={{ color: '#7BA3D8' }} className="text-sm">
              {pros.length > 0
                ? `${pros.length} verified professional${pros.length !== 1 ? 's' : ''} · ${totalServices} service${totalServices !== 1 ? 's' : ''} available`
                : 'Be the first professional to join Glowly'}
            </p>
          </div>
        </div>

        {/* Search + Filters bar */}
        <div className="sticky top-16 z-30 border-b"
          style={{ background: 'rgba(8,13,26,0.97)', backdropFilter: 'blur(20px)', borderColor: 'rgba(75,45,127,0.3)' }}>
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row gap-2.5">
            {/* Search input */}
            <div className="flex-1 flex items-center gap-2 px-3 rounded-xl border text-sm"
              style={{ background: 'rgba(26,111,212,0.08)', border: '1px solid rgba(26,111,212,0.2)' }}>
              <Search size={14} style={{ color: '#1A6FD4' }} className="flex-shrink-0" />
              <input
                placeholder="Search by name, specialty, or service..."
                className="flex-1 bg-transparent text-white py-2.5 focus:outline-none text-sm"
                style={{ '::placeholder': { color: '#3D5270' } } as any} />
            </div>

            {/* Location input */}
            <div className="flex items-center gap-2 px-3 rounded-xl border sm:w-44"
              style={{ background: 'rgba(26,111,212,0.08)', border: '1px solid rgba(26,111,212,0.2)' }}>
              <MapPin size={14} style={{ color: '#1A6FD4' }} className="flex-shrink-0" />
              <input
                placeholder="Location"
                className="flex-1 bg-transparent text-white py-2.5 focus:outline-none text-sm" />
            </div>

            {/* Filters button */}
            <button
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90"
              style={{ background: 'rgba(75,45,127,0.25)', border: '1px solid rgba(75,45,127,0.5)', color: '#C4A0F0' }}>
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>

          {/* Category pills */}
          <div className="max-w-7xl mx-auto px-4 flex gap-2 pb-3 overflow-x-auto">
            {CATEGORIES.map((cat, i) => (
              <button key={cat}
                className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={i === 0 ? {
                  background: 'linear-gradient(135deg, #1A6FD4, #E83592)',
                  color: '#fff',
                  border: 'none',
                } : {
                  background: 'rgba(75,45,127,0.15)',
                  border: '1px solid rgba(75,45,127,0.35)',
                  color: '#8B72B8',
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Professionals grid */}
        <div className="max-w-7xl mx-auto px-4 mt-8 pb-20">
          {pros.length === 0 ? (
            /* Empty state */
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: 'rgba(75,45,127,0.2)', border: '1px solid rgba(75,45,127,0.4)' }}>
                <Users size={28} style={{ color: '#8B72B8' }} />
              </div>
              <h2 className="text-white font-bold text-lg mb-2">No professionals listed yet</h2>
              <p className="text-sm max-w-sm mx-auto mb-6" style={{ color: '#5C7A9E' }}>
                Be among the first to join Glowly and start getting booked by clients near you.
              </p>
              <a href="/signup?role=pro"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #1A6FD4, #4B2D7F, #E83592)' }}>
                <Sparkles size={14} /> Join as a Professional
              </a>
            </div>
          ) : (
            <>
              <p className="text-xs mb-5" style={{ color: '#4B6080' }}>
                {pros.length} professional{pros.length !== 1 ? 's' : ''} found
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {pros.map(pro => (
                  <ProfessionalCard key={pro.id} pro={pro} />
                ))}
              </div>

              {/* Join CTA */}
              <div className="mt-14 rounded-2xl p-8 text-center"
                style={{ background: 'linear-gradient(135deg, rgba(14,27,69,0.8), rgba(75,45,127,0.5))', border: '1px solid rgba(75,45,127,0.4)' }}>
                <p className="text-white font-semibold mb-1">Are you a beauty or wellness professional?</p>
                <p className="text-sm mb-5" style={{ color: '#7BA3D8' }}>
                  Join Glowly to get discovered, manage bookings, and grow your business.
                </p>
                <a href="/signup?role=pro"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #1A6FD4, #E83592)' }}>
                  <Sparkles size={14} /> Join Glowly Free
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
