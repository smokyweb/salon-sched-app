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

// Kanchi Cafe palette — cycling card header gradients
const COVER_GRADIENTS = [
  { from: '#1A2244', to: '#1E5FAE' },   // navy → royal blue (peacock)
  { from: '#1A2244', to: '#0E7A8C' },   // navy → peacock teal
  { from: '#1E2A50', to: '#2878CC' },   // deep navy → bright blue
  { from: '#1A2244', to: '#4A3010' },   // navy → dark amber
  { from: '#0D1B35', to: '#1E5FAE' },   // darkest navy → royal blue
  { from: '#1A2244', to: '#2C6B3A' },   // navy → forest green
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
      <div
        className="rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1"
        style={{
          background: '#0F1628',
          border: '1px solid rgba(212,168,67,0.15)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
        }}>

        {/* Cover banner */}
        <div className="h-28 relative flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${grad.from}, ${grad.to})` }}>

          {/* Gold shimmer line at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #D4A843, transparent)' }} />

          {/* Avatar */}
          <div className="w-16 h-16 rounded-full border-2 shadow-lg flex items-center justify-center overflow-hidden"
            style={{ background: 'rgba(26,34,68,0.7)', borderColor: 'rgba(212,168,67,0.4)' }}>
            {pro.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={pro.avatar} alt={pro.businessName} className="w-full h-full object-cover" />
            ) : (
              <span className="font-bold text-lg" style={{ color: '#D4A843' }}>
                {getInitials(pro.businessName, pro.user.email)}
              </span>
            )}
          </div>

          {/* Verified */}
          {pro.isVerified && (
            <div className="absolute top-3 right-3">
              <CheckCircle size={16} style={{ color: '#D4A843' }} />
            </div>
          )}

          {/* Elite */}
          {pro.planTier === 'elite' && (
            <div className="absolute top-3 left-3 text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(212,168,67,0.2)', border: '1px solid rgba(212,168,67,0.5)', color: '#E0BC5E' }}>
              Elite
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-bold text-sm leading-tight truncate" style={{ color: '#F0E8D8' }}>
                {pro.businessName}
              </h3>
              <p className="text-xs mt-0.5 truncate" style={{ color: '#7A9BC4' }}>
                {pro.specialty || 'Beauty & Wellness'}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              {minPrice !== null && (
                <p className="text-sm font-semibold" style={{ color: '#D4A843' }}>
                  from ${minPrice}
                </p>
              )}
              {pro.reviewCount > 0 && (
                <div className="flex items-center gap-1 justify-end mt-0.5">
                  <Star size={10} style={{ fill: '#E87830', color: '#E87830' }} />
                  <span className="text-xs font-semibold" style={{ color: '#E87830' }}>
                    {pro.rating.toFixed(1)}
                  </span>
                  <span className="text-xs" style={{ color: '#3D5270' }}>({pro.reviewCount})</span>
                </div>
              )}
            </div>
          </div>

          {pro.location && (
            <div className="flex items-center gap-1.5 mt-2.5 text-xs" style={{ color: '#4A6480' }}>
              <MapPin size={11} />
              <span className="truncate">{pro.location}</span>
            </div>
          )}

          {/* Service pills */}
          {pro.services.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {pro.services.slice(0, 3).map(s => (
                <span key={s.id} className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: 'rgba(14,122,140,0.2)',
                    border: '1px solid rgba(14,122,140,0.4)',
                    color: '#5BBFCC',
                  }}>
                  {s.name}
                </span>
              ))}
              {pro.services.length > 3 && (
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: '#3D5270' }}>
                  +{pro.services.length - 3}
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 mt-3 text-xs" style={{ color: '#2D3F55' }}>
              <Scissors size={11} />
              <span>Services coming soon</span>
            </div>
          )}

          {/* CTA button — gold gradient */}
          <button
            className="w-full mt-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 group-hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #B8860B, #D4A843, #E0BC5E)',
              color: '#0F1628',
            }}>
            View & Book
          </button>
        </div>
      </div>
    </Link>
  )
}
