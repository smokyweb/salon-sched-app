import Navbar from '../../components/Navbar'
import ProfessionalCard from '../../components/ProfessionalCard'
import { prisma } from '../../lib/prisma'
import { SlidersHorizontal, Search, MapPin, Sparkles, Users } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Kanchi Cafe palette
// Background: #0D1220  (deepest navy)
// Surface:    #1A2244  (card/panel navy)
// Gold:       #D4A843  (text, accents)
// Royal Blue: #1E5FAE  (peacock blue)
// Teal:       #0E7A8C  (peacock teal)
// Saffron:    #E87830  (warm accent)
// Cream:      #F0E8D8  (primary text)
// Muted:      #7A9BC4  (secondary text)

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
    <div className="min-h-screen" style={{ background: '#0D1220' }}>
      <Navbar />

      {/* Hero — Kanchi deep navy with gold accents */}
      <div className="pt-20">
        <div className="relative overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #0D1220 0%, #1A2244 50%, #0F1A3A 100%)' }}>

          {/* Decorative orbs matching peacock / saffron tones */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: '#D4A843' }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-8 pointer-events-none"
            style={{ background: '#1E5FAE' }} />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full blur-3xl opacity-6 pointer-events-none"
            style={{ background: '#0E7A8C' }} />

          {/* Gold top border line */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent 0%, #D4A843 40%, #E87830 60%, transparent 100%)' }} />

          <div className="relative max-w-7xl mx-auto px-4 py-12">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                {/* Gold ornamental dot like the label's decorative motif */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(180deg, #D4A843, #E87830)' }} />
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#D4A843' }}>
                    Glowly Marketplace
                  </span>
                </div>
                <h1 className="text-3xl font-black tracking-tight mb-2" style={{ color: '#F0E8D8' }}>
                  Find Your Professional
                </h1>
                <p className="text-sm" style={{ color: '#7A9BC4' }}>
                  {pros.length > 0
                    ? `${pros.length} verified professional${pros.length !== 1 ? 's' : ''} · ${totalServices} service${totalServices !== 1 ? 's' : ''} available`
                    : 'Be the first professional to join Glowly'}
                </p>
              </div>

              {/* Stats chips */}
              {pros.length > 0 && (
                <div className="flex gap-3 flex-wrap">
                  {[
                    { label: 'Professionals', value: pros.length, color: '#D4A843' },
                    { label: 'Services', value: totalServices, color: '#0E7A8C' },
                  ].map(s => (
                    <div key={s.label} className="rounded-xl px-4 py-2.5 text-center"
                      style={{ background: 'rgba(26,34,68,0.6)', border: `1px solid rgba(${s.color === '#D4A843' ? '212,168,67' : '14,122,140'},0.3)` }}>
                      <p className="text-lg font-black" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-xs" style={{ color: '#4A6480' }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-8"
            style={{ background: 'linear-gradient(to bottom, transparent, #0D1220)' }} />
        </div>

        {/* Search + Filter bar */}
        <div className="sticky top-16 z-30"
          style={{
            background: 'rgba(13,18,32,0.97)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(212,168,67,0.12)',
          }}>
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row gap-2.5">

            {/* Search */}
            <div className="flex-1 flex items-center gap-2 px-3 rounded-xl"
              style={{ background: 'rgba(26,34,68,0.6)', border: '1px solid rgba(212,168,67,0.15)' }}>
              <Search size={14} style={{ color: '#D4A843' }} className="flex-shrink-0" />
              <input
                placeholder="Search by name, specialty, or service..."
                className="flex-1 bg-transparent py-2.5 focus:outline-none text-sm"
                style={{ color: '#F0E8D8' }}
              />
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 px-3 rounded-xl sm:w-44"
              style={{ background: 'rgba(26,34,68,0.6)', border: '1px solid rgba(212,168,67,0.15)' }}>
              <MapPin size={14} style={{ color: '#D4A843' }} className="flex-shrink-0" />
              <input
                placeholder="Location"
                className="flex-1 bg-transparent py-2.5 focus:outline-none text-sm"
                style={{ color: '#F0E8D8' }}
              />
            </div>

            {/* Filters */}
            <button
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90"
              style={{
                background: 'rgba(14,122,140,0.15)',
                border: '1px solid rgba(14,122,140,0.35)',
                color: '#5BBFCC',
              }}>
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>

          {/* Category pills */}
          <div className="max-w-7xl mx-auto px-4 flex gap-2 pb-3 overflow-x-auto">
            {CATEGORIES.map((cat, i) => (
              <button key={cat}
                className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all hover:opacity-90"
                style={i === 0 ? {
                  background: 'linear-gradient(135deg, #B8860B, #D4A843)',
                  color: '#0D1220',
                  border: 'none',
                } : {
                  background: 'rgba(26,34,68,0.5)',
                  border: '1px solid rgba(212,168,67,0.2)',
                  color: '#7A9BC4',
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 mt-8 pb-24">
          {pros.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: 'rgba(26,34,68,0.6)', border: '1px solid rgba(212,168,67,0.2)' }}>
                <Users size={28} style={{ color: '#D4A843' }} />
              </div>
              <h2 className="font-bold text-lg mb-2" style={{ color: '#F0E8D8' }}>No professionals listed yet</h2>
              <p className="text-sm max-w-sm mx-auto mb-6" style={{ color: '#4A6480' }}>
                Be among the first to join Glowly and start getting booked.
              </p>
              <a href="/signup?role=pro"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #B8860B, #D4A843)', color: '#0D1220' }}>
                <Sparkles size={14} /> Join as a Professional
              </a>
            </div>
          ) : (
            <>
              <p className="text-xs mb-5" style={{ color: '#3D5270' }}>
                {pros.length} professional{pros.length !== 1 ? 's' : ''} found
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {pros.map(pro => (
                  <ProfessionalCard key={pro.id} pro={pro} />
                ))}
              </div>

              {/* Join CTA */}
              <div className="mt-16 rounded-2xl p-10 text-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #0F1628 0%, #1A2244 50%, #0F1A38 100%)',
                  border: '1px solid rgba(212,168,67,0.2)',
                }}>
                {/* Gold top border */}
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, #D4A843, transparent)' }} />

                <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(212,168,67,0.15)', border: '1px solid rgba(212,168,67,0.3)' }}>
                  <Sparkles size={18} style={{ color: '#D4A843' }} />
                </div>
                <p className="font-bold mb-1" style={{ color: '#F0E8D8' }}>
                  Are you a beauty or wellness professional?
                </p>
                <p className="text-sm mb-6" style={{ color: '#4A6480' }}>
                  Join Glowly to get discovered, manage bookings, and grow your clientele.
                </p>
                <a href="/signup?role=pro"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #B8860B, #D4A843, #E0BC5E)', color: '#0D1220' }}>
                  Join Glowly Free →
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
