'use client'
import Link from 'next/link'
import { Star, MapPin, Clock, CheckCircle } from 'lucide-react'

type Professional = {
  id: string; name: string; businessName: string; specialty: string;
  location: string; suite: string; rating: number; reviewCount: number;
  price: string; nextAvailable: string; services: string[]; tags: string[];
  coverColor: string; avatar: string; verified: boolean;
}

export default function ProfessionalCard({ pro }: { pro: Professional }) {
  return (
    <Link href={`/pro/${pro.id}`} className="block group">
      <div className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all hover:transform hover:-translate-y-1 hover:shadow-glow">
        {/* Cover */}
        <div className={`h-32 bg-gradient-to-br ${pro.coverColor} relative flex items-center justify-center`}>
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={pro.avatar} alt={pro.name} className="w-full h-full object-cover bg-slate-600" />
          </div>
          {/* Tags */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {pro.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-xs font-semibold px-2 py-0.5 rounded-full bg-black/30 text-white backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
          {pro.verified && (
            <div className="absolute top-3 right-3">
              <CheckCircle size={18} className="text-blue-400 fill-blue-400/20" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-white text-base leading-tight">{pro.name}</h3>
              <p className="text-slate-400 text-xs mt-0.5">{pro.specialty}</p>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <p className="font-bold text-white text-sm">{pro.price}</p>
              <div className="flex items-center gap-1 justify-end mt-0.5">
                <Star size={11} className="fill-amber-400 text-amber-400" />
                <span className="text-amber-400 text-xs font-semibold">{pro.rating}</span>
                <span className="text-slate-500 text-xs">({pro.reviewCount})</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-400">
            <MapPin size={12} />
            <span>Suite {pro.suite} · {pro.location}</span>
          </div>

          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-emerald-400 font-medium">
            <Clock size={12} />
            <span>{pro.nextAvailable}</span>
          </div>

          {/* Services pills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {pro.services.slice(0, 3).map(s => (
              <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                {s}
              </span>
            ))}
          </div>

          {/* Book button */}
          <button className="w-full mt-4 py-2.5 btn-brand text-sm font-semibold rounded-xl">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  )
}
