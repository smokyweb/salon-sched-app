import Navbar from '../../components/Navbar'
import ProfessionalCard from '../../components/ProfessionalCard'
import AIVoiceWidget from '../../components/AIVoiceWidget'
import { PROFESSIONALS, SERVICES } from '../../lib/data'
import { SlidersHorizontal, Search, MapPin } from 'lucide-react'

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <div className="pt-20 pb-16">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-black text-white mb-2">Find Your Perfect Professional</h1>
          <p className="text-slate-400">Browse {PROFESSIONALS.length * 4}+ verified beauty & wellness professionals near you</p>
        </div>

        {/* Search + Filters */}
        <div className="sticky top-16 z-30 bg-dark/90 backdrop-blur-md border-b border-white/10 px-4 py-3">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="flex-1 glass rounded-xl flex items-center gap-2 px-3 border border-white/10">
              <Search size={16} className="text-slate-400" />
              <input placeholder="Search services, names..." className="flex-1 bg-transparent text-white text-sm py-2.5 focus:outline-none placeholder-slate-500" />
            </div>
            <div className="glass rounded-xl flex items-center gap-2 px-3 border border-white/10 sm:w-48">
              <MapPin size={16} className="text-slate-400" />
              <input placeholder="Arlington, TX" className="flex-1 bg-transparent text-white text-sm py-2.5 focus:outline-none placeholder-slate-500" />
            </div>
            <button className="glass border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2 text-slate-300 hover:text-white text-sm transition-colors">
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>
          {/* Category pills */}
          <div className="max-w-7xl mx-auto flex gap-2 mt-2 overflow-x-auto pb-1 scrollbar-hide">
            {['All', ...SERVICES.map(s => s.name)].map(s => (
              <button key={s}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${s === 'All' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'glass border border-white/10 text-slate-400 hover:text-white'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <p className="text-slate-400 text-sm mb-4">{PROFESSIONALS.length} professionals found · Available today</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROFESSIONALS.map(pro => (
              <ProfessionalCard key={pro.id} pro={pro} />
            ))}
            {/* Load more placeholder */}
            <div className="glass rounded-2xl border border-dashed border-white/20 flex items-center justify-center p-8 col-span-full sm:col-span-1">
              <button className="text-slate-400 hover:text-white text-sm transition-colors">Load more professionals →</button>
            </div>
          </div>
        </div>
      </div>
      <AIVoiceWidget />
    </div>
  )
}
