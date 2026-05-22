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
    <div className="min-h-screen" style={{ background: '#0d0d1a' }}>
      <Navbar />

      {/* Header */}
      <div className="pt-20 pb-0">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Find a Professional
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              {pros.length > 0
                ? `${pros.length} verified professional${pros.length !== 1 ? 's' : ''} · ${totalServices} service${totalServices !== 1 ? 's' : ''} available`
                : 'No professionals listed yet — be the first to join.'}
            </p>
          </div>
        </div>

        {/* Search + Filters bar */}
        <div className="sticky top-16 z-30 border-b border-white/8"
          style={{ background: 'rgba(13,13,26,0.95)', backdropFilter: 'blur(16px)' }}>
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row gap-2.5">
            <div className="flex-1 flex items-center gap-2 px-3 rounded-xl border border-white/10 text-sm"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              <Search size={14} className="text-slate-500 flex-shrink-0" />
              <input
                placeholder="Search by name, specialty, or service..."
                className="flex-1 bg-transparent text-white py-2.5 focus:outline-none placeholder-slate-600 text-sm" />
            </div>
            <div className="flex items-center gap-2 px-3 rounded-xl border border-white/10 sm:w-44"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              <MapPin size={14} className="text-slate-500 flex-shrink-0" />
              <input
                placeholder="Location"
                className="flex-1 bg-transparent text-white py-2.5 focus:outline-none placeholder-slate-600 text-sm" />
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white text-sm transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>

          {/* Category pills */}
          <div className="max-w-7xl mx-auto px-4 flex gap-2 pb-3 overflow-x-auto">
            {CATEGORIES.map((cat, i) => (
              <button key={cat}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  i === 0
                    ? 'text-white border border-white/20'
                    : 'text-slate-500 border border-white/8 hover:text-slate-300 hover:border-white/15'
                }`}
                style={i === 0 ? { background: 'rgba(255,255,255,0.1)' } : { background: 'transparent' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Professionals grid */}
        <div className="max-w-7xl mx-auto px-4 mt-8 pb-20">
          {pros.length === 0 ? (
            // Empty state
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center mx-auto mb-5"
                style={{ background: 'rgba(255,255,255,0.04)' }}>
                <Users size={28} className="text-slate-600" />
              </div>
              <h2 className="text-white font-semibold text-lg mb-2">No professionals yet</h2>
              <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
                Be among the first to join Glowly and start getting booked by clients in your area.
              </p>
              <a href="/signup?role=pro"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white border border-white/15 hover:border-white/25 transition"
                style={{ background: 'rgba(255,255,255,0.07)' }}>
                <Sparkles size={14} /> Join as a Professional
              </a>
            </div>
          ) : (
            <>
              <p className="text-slate-500 text-xs mb-5">
                {pros.length} professional{pros.length !== 1 ? 's' : ''} found
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {pros.map(pro => (
                  <ProfessionalCard key={pro.id} pro={pro} />
                ))}
              </div>

              {/* Join CTA at bottom */}
              <div className="mt-12 rounded-2xl border border-white/8 p-8 text-center"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <p className="text-slate-400 text-sm mb-3">Are you a beauty or wellness professional?</p>
                <a href="/signup?role=pro"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white border border-white/15 hover:border-white/25 transition"
                  style={{ background: 'rgba(255,255,255,0.07)' }}>
                  <Sparkles size={14} /> Join Glowly
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
