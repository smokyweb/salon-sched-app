'use client'
import Link from 'next/link'
import { Star, MapPin, CheckCircle, Scissors, Sparkles } from 'lucide-react'

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

// Deterministic muted gradient per profile id
function getGradient(id: string) {
  const gradients = [
    'from-slate-700 to-slate-800',
    'from-zinc-700 to-zinc-800',
    'from-stone-700 to-stone-800',
    'from-neutral-700 to-neutral-800',
    'from-gray-700 to-slate-800',
    'from-slate-800 to-zinc-700',
  ]
  const idx = id.charCodeAt(0) % gradients.length
  return gradients[idx]
}

function getInitials(name: string | null, email: string) {
  const n = name || email.split('@')[0]
  return n.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

export default function ProfessionalCard({ pro }: { pro: Professional }) {
  const minPrice = pro.services.length > 0
    ? Math.min(...pro.services.map(s => s.price))
    : null

  return (
    <Link href={`/pro/${pro.id}`} className="block group">
      <div className="rounded-2xl overflow-hidden border border-white/8 hover:border-white/15 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        style={{ background: 'rgba(22,22,35,0.9)' }}>

        {/* Cover */}
        <div className={`h-28 bg-gradient-to-br ${getGradient(pro.id)} relative flex items-center justify-center`}>
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/15 shadow-lg flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.3)' }}>
            {pro.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={pro.avatar} alt={pro.businessName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-white/70 font-bold text-lg">
                {getInitials(pro.businessName, pro.user.email)}
              </span>
            )}
          </div>

          {pro.isVerified && (
            <div className="absolute top-3 right-3">
              <CheckCircle size={16} className="text-blue-400" />
            </div>
          )}

          {pro.planTier === 'elite' && (
            <div className="absolute top-3 left-3">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Elite
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-white text-sm leading-tight truncate">{pro.businessName}</h3>
              <p className="text-slate-500 text-xs mt-0.5 truncate">
                {pro.specialty || 'Beauty & Wellness'}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              {minPrice !== null && (
                <p className="text-slate-300 text-sm font-medium">from ${minPrice}</p>
              )}
              {pro.reviewCount > 0 && (
                <div className="flex items-center gap-1 justify-end mt-0.5">
                  <Star size={10} className="fill-amber-400 text-amber-400" />
                  <span className="text-amber-400 text-xs font-medium">{pro.rating.toFixed(1)}</span>
                  <span className="text-slate-600 text-xs">({pro.reviewCount})</span>
                </div>
              )}
            </div>
          </div>

          {pro.location && (
            <div className="flex items-center gap-1.5 mt-2.5 text-xs text-slate-500">
              <MapPin size={11} />
              <span className="truncate">{pro.location}</span>
            </div>
          )}

          {/* Services */}
          {pro.services.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {pro.services.slice(0, 3).map(s => (
                <span key={s.id} className="text-xs px-2 py-0.5 rounded-full text-slate-400 border border-white/8"
                  style={{ background: 'rgba(255,255,255,0.04)' }}>
                  {s.name}
                </span>
              ))}
              {pro.services.length > 3 && (
                <span className="text-xs px-2 py-0.5 rounded-full text-slate-600">
                  +{pro.services.length - 3} more
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-600">
              <Scissors size={11} />
              <span>No services listed yet</span>
            </div>
          )}

          {/* Book button */}
          <button className="w-full mt-4 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
            View Profile
          </button>
        </div>
      </div>
    </Link>
  )
}
