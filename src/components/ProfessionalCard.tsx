'use client'
import Link from 'next/link'
import { Star, MapPin, CheckCircle, Scissors } from 'lucide-react'

type Professional = {
  id: string
  businessName: string
  specialty: string | null
  location: string | null
  rating: number
  reviewCount: number
  isVerified: boolean
  isActive: boolean
  planTier: string
  avatar: string | null
  services: { id: string; name: string; price: number; duration: number }[]
  user: { name: string | null; email: string }
}

// Logo-derived gradients: blue → purple → magenta
const COVER_GRADIENTS = [
  { from: '#0E1B45', to: '#4B2D7F' },   // navy → purple
  { from: '#1A6FD4', to: '#4B2D7F' },   // royal blue → purple
  { from: '#4B2D7F', to: '#E83592' },   // purple → magenta
  { from: '#1A6FD4', to: '#E83592' },   // blue → magenta (full span)
  { from: '#0E1B45', to: '#5C1A5E' },   // navy → plum
  { from: '#5C1A5E', to: '#E83592' },   // plum → magenta
]

function getCoverGradient(id: string) {
  return COVER_GRADIENTS[id.charCodeAt(0) % COVER_GRADIENTS.length]
}

function getInitials(name: string | null, email: string) {
  const n = name || email.split('@')[0]
  return n.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

export default function ProfessionalCard({ pro }: { pro: Professional }) {
  const minPrice = pro.services.length > 0
    ? Math.min(...pro.services.map(s => s.price))
    : null

  const grad = getCoverGradient(pro.id)

  return (
    <Link href={`/pro/${pro.id}`} className="block group">
      <div className="rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
        style={{ background: '#0E1B45', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>

        {/* Cover gradient banner */}
        <div className="h-28 relative flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${grad.from}, ${grad.to})` }}>

          {/* Avatar circle */}
          <div className="w-16 h-16 rounded-full border-2 border-white/25 shadow-lg flex items-center justify-center overflow-hidden"
            style={{ background: 'rgba(0,0,0,0.35)' }}>
            {pro.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={pro.avatar} alt={pro.businessName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-white font-bold text-lg">{getInitials(pro.businessName, pro.user.email)}</span>
            )}
          </div>

          {/* Verified badge */}
          {pro.isVerified && (
            <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(26,111,212,0.3)', border: '1px solid rgba(26,111,212,0.5)' }}>
              <CheckCircle size={14} className="text-blue-300" />
            </div>
          )}

          {/* Elite badge */}
          {pro.planTier === 'elite' && (
            <div className="absolute top-3 left-3 text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(232,53,146,0.25)', border: '1px solid rgba(232,53,146,0.5)', color: '#F25CA2' }}>
              Elite
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-bold text-white text-sm leading-tight truncate">{pro.businessName}</h3>
              <p className="text-sm mt-0.5 truncate" style={{ color: '#7BA3D8' }}>
                {pro.specialty || 'Beauty & Wellness'}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              {minPrice !== null && (
                <p className="text-white text-sm font-semibold">from ${minPrice}</p>
              )}
              {pro.reviewCount > 0 && (
                <div className="flex items-center gap-1 justify-end mt-0.5">
                  <Star size={10} className="fill-amber-400 text-amber-400" />
                  <span className="text-amber-400 text-xs font-semibold">{pro.rating.toFixed(1)}</span>
                  <span className="text-xs" style={{ color: '#4B6080' }}>({pro.reviewCount})</span>
                </div>
              )}
            </div>
          </div>

          {pro.location && (
            <div className="flex items-center gap-1.5 mt-2.5 text-xs" style={{ color: '#5C7A9E' }}>
              <MapPin size={11} />
              <span className="truncate">{pro.location}</span>
            </div>
          )}

          {/* Services pills */}
          {pro.services.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {pro.services.slice(0, 3).map(s => (
                <span key={s.id}
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: 'rgba(75,45,127,0.35)', border: '1px solid rgba(75,45,127,0.6)', color: '#C4A0F0' }}>
                  {s.name}
                </span>
              ))}
              {pro.services.length > 3 && (
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: '#5C7A9E' }}>
                  +{pro.services.length - 3}
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 mt-3 text-xs" style={{ color: '#3D5270' }}>
              <Scissors size={11} />
              <span>Services coming soon</span>
            </div>
          )}

          {/* Book button */}
          <button
            className="w-full mt-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 group-hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #1A6FD4, #E83592)' }}>
            View & Book
          </button>
        </div>
      </div>
    </Link>
  )
}
