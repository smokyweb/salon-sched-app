import Navbar from '../../../components/Navbar'
import AIVoiceWidget from '../../../components/AIVoiceWidget'
import { PROFESSIONALS, REVIEWS, TIME_SLOTS } from '../../../lib/data'
import { MapPin, Star, CheckCircle, Phone, Instagram, Globe, Heart, Share2, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function ProProfilePage({ params }: { params: { id: string } }) {
  const pro = PROFESSIONALS.find(p => p.id === params.id) || PROFESSIONALS[0]
  const reviews = REVIEWS.filter(r => r.professionalId === pro.id)

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <div className="pt-16 pb-20">
        {/* Hero cover */}
        <div className={`h-52 bg-gradient-to-br ${pro.coverColor} relative`}>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-4 pb-0">
            <div className="flex items-end gap-5">
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-dark shadow-2xl flex-shrink-0 mb-0 translate-y-14">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pro.avatar} alt={pro.name} className="w-full h-full object-cover bg-slate-600" />
              </div>
              <div className="pb-3 flex-1 min-w-0 translate-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-black text-white">{pro.name}</h1>
                  {pro.verified && <CheckCircle size={18} className="text-blue-400 fill-blue-400/20" />}
                </div>
                <p className="text-white/80 text-sm">{pro.specialty}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile content */}
        <div className="max-w-5xl mx-auto px-4 pt-20 grid lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info bar */}
            <div className="flex flex-wrap items-center gap-4 py-2">
              <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                <MapPin size={14} />
                <span>Suite {pro.suite} · {pro.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span className="text-white font-semibold text-sm">{pro.rating}</span>
                <span className="text-slate-500 text-sm">({pro.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-3 ml-auto">
                <button className="glass border border-white/10 rounded-lg p-2 text-slate-400 hover:text-white transition-colors"><Heart size={15} /></button>
                <button className="glass border border-white/10 rounded-lg p-2 text-slate-400 hover:text-white transition-colors"><Share2 size={15} /></button>
                <button className="glass border border-white/10 rounded-lg p-2 text-slate-400 hover:text-white transition-colors"><Phone size={15} /></button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {pro.tags.map(t => (
                <span key={t} className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-pink-500/20 text-pink-300">{t}</span>
              ))}
              {pro.services.map(s => (
                <span key={s} className="px-3 py-1 rounded-full text-xs glass border border-white/10 text-slate-300">{s}</span>
              ))}
            </div>

            {/* About */}
            <div className="glass rounded-2xl p-5 border border-white/10">
              <h3 className="font-bold text-white mb-3">About</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{pro.bio}</p>
            </div>

            {/* Portfolio */}
            <div className="glass rounded-2xl p-5 border border-white/10">
              <h3 className="font-bold text-white mb-4">Portfolio</h3>
              <div className="grid grid-cols-4 gap-2">
                {pro.portfolio.map((color, i) => (
                  <div key={i} className="aspect-square rounded-xl" style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}>
                    <div className="w-full h-full rounded-xl bg-black/20 hover:bg-black/10 transition-colors cursor-pointer flex items-center justify-center text-2xl opacity-30 hover:opacity-60">
                      {['✂️', '🎨', '✨', '💆'][i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="glass rounded-2xl p-5 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">Reviews</h3>
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-amber-400 text-amber-400" />
                  <span className="font-bold text-white">{pro.rating}</span>
                  <span className="text-slate-500 text-sm">({pro.reviewCount})</span>
                </div>
              </div>
              {reviews.length > 0 ? reviews.map(r => (
                <div key={r.id} className="py-3 border-t border-white/5 first:border-t-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">{r.avatar}</div>
                    <span className="text-white text-sm font-medium">{r.author}</span>
                    <div className="flex ml-1">{[...Array(r.rating)].map((_, i) => <Star key={i} size={11} className="fill-amber-400 text-amber-400" />)}</div>
                    <span className="text-slate-500 text-xs ml-auto">{r.date}</span>
                  </div>
                  <p className="text-slate-400 text-sm">{r.text}</p>
                </div>
              )) : (
                <p className="text-slate-500 text-sm">No reviews yet — be the first to book!</p>
              )}
            </div>
          </div>

          {/* Right — Booking panel */}
          <div className="space-y-4">
            <div className="glass rounded-2xl p-5 border border-white/10 sticky top-20">
              <h3 className="font-bold text-white mb-1">Book Appointment</h3>
              <p className="text-slate-400 text-xs mb-4">Starting from {pro.price}</p>

              {/* Service selector */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Service</label>
                <select className="w-full glass border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500/50 bg-transparent">
                  {pro.services.map(s => <option key={s} value={s} className="bg-dark">{s}</option>)}
                </select>
              </div>

              {/* Date */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Date</label>
                <input type="date" className="w-full glass border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500/50 bg-transparent" />
              </div>

              {/* Time slots */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Available Times</label>
                <div className="grid grid-cols-3 gap-1.5 max-h-32 overflow-y-auto">
                  {TIME_SLOTS.slice(0, 12).map(slot => (
                    <button key={slot}
                      className="glass border border-white/10 rounded-lg px-2 py-1.5 text-xs text-slate-300 hover:border-pink-500/50 hover:text-pink-300 transition-all text-center">
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <Link href={`/book/${pro.id}`}
                className="btn-brand w-full text-center py-3 text-sm block rounded-xl">
                Confirm Booking
              </Link>

              <p className="text-slate-500 text-xs text-center mt-3">Free cancellation up to 24 hrs before</p>
            </div>

            {/* Contact */}
            <div className="glass rounded-2xl p-4 border border-white/10">
              <h4 className="text-white font-semibold text-sm mb-3">Contact & Links</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors">
                  <Phone size={14} /> Call via AI Receptionist
                </button>
                <button className="w-full flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors">
                  <Instagram size={14} /> Instagram
                </button>
                <button className="w-full flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors">
                  <Globe size={14} /> Website
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AIVoiceWidget />
    </div>
  )
}

export async function generateStaticParams() {
  return PROFESSIONALS.map(p => ({ id: p.id }))
}
