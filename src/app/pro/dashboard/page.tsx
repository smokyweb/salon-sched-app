import Navbar from '../../../components/Navbar'
import { Calendar, DollarSign, Users, TrendingUp, Bell, Phone, Star, MessageSquare, Plus, ChevronRight, Clock } from 'lucide-react'
import Link from 'next/link'

const UPCOMING = [
  { time: '9:00 AM', client: 'Jessica Martinez', service: 'Balayage', duration: '2.5 hrs', status: 'confirmed', price: '$185' },
  { time: '12:30 PM', client: 'Aaliyah Brown', service: 'Haircut & Style', duration: '1 hr', status: 'confirmed', price: '$75' },
  { time: '2:00 PM', client: 'New Client', service: 'Color Consultation', duration: '30 min', status: 'pending', price: 'Free' },
  { time: '4:00 PM', client: 'Rachel Thompson', service: 'Toner & Blowout', duration: '1.5 hrs', status: 'confirmed', price: '$95' },
]

export default function ProDashboard() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <div className="pt-20 pb-16 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">Good morning, Ariana ✨</h1>
            <p className="text-slate-400 text-sm mt-1">Thursday, May 21 · 4 appointments today</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="glass border border-white/10 rounded-xl p-2.5 text-slate-400 hover:text-white transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-500"></span>
            </button>
            <Link href="/pro/calendar" className="btn-brand px-4 py-2.5 text-sm flex items-center gap-2">
              <Plus size={15} /> New Booking
            </Link>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Today's Revenue", value: '$455', change: '+12%', icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
            { label: 'This Month', value: '$4,280', change: '+23%', icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
            { label: 'Active Clients', value: '312', change: '+8 new', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
            { label: 'Avg Rating', value: '4.9★', change: '312 reviews', icon: Star, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
          ].map(k => (
            <div key={k.label} className={`glass rounded-2xl p-4 border ${k.bg}`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-400 text-xs">{k.label}</p>
                <div className={`w-7 h-7 rounded-lg ${k.bg} flex items-center justify-center`}>
                  <k.icon size={14} className={k.color} />
                </div>
              </div>
              <p className="text-white text-2xl font-black">{k.value}</p>
              <p className={`text-xs mt-1 ${k.color}`}>{k.change}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl border border-white/10 overflow-hidden">
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                <h2 className="font-bold text-white">Today's Schedule</h2>
                <Link href="/pro/calendar" className="text-pink-400 text-sm hover:text-pink-300 flex items-center gap-1">
                  Full calendar <ChevronRight size={14} />
                </Link>
              </div>
              <div className="divide-y divide-white/5">
                {UPCOMING.map((appt, i) => (
                  <div key={i} className="px-5 py-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                    <div className="w-16 text-center flex-shrink-0">
                      <p className="text-white font-bold text-sm">{appt.time}</p>
                      <p className="text-slate-500 text-xs">{appt.duration}</p>
                    </div>
                    <div className="w-1 h-12 rounded-full flex-shrink-0" style={{background: appt.status === 'confirmed' ? '#10b981' : '#f59e0b'}}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm">{appt.client}</p>
                      <p className="text-slate-400 text-xs">{appt.service}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-white font-bold text-sm">{appt.price}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${appt.status === 'confirmed' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'}`}>
                        {appt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* AI Receptionist Status */}
            <div className="glass rounded-2xl p-5 border border-pink-500/20 bg-pink-500/5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-white text-sm">AI Receptionist</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-emerald-400 text-xs font-medium">Active</span>
                </div>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: 'Calls handled today', value: '6' },
                  { label: 'Bookings via AI', value: '3' },
                  { label: 'No-shows prevented', value: '2' },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">{s.label}</span>
                    <span className="text-white font-bold">{s.value}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 glass border border-pink-500/30 rounded-xl py-2 text-pink-300 text-xs font-medium hover:bg-pink-500/10 transition-colors flex items-center justify-center gap-1.5">
                <Phone size={13} /> Configure AI
              </button>
            </div>

            {/* Messages */}
            <div className="glass rounded-2xl border border-white/10 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-bold text-white text-sm">Messages</h3>
                <span className="w-5 h-5 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center font-bold">3</span>
              </div>
              {[
                { name: 'Jessica M.', msg: 'Can we move to 9:30?', time: '2m', unread: true },
                { name: 'New Client', msg: 'Do you do keratin?', time: '15m', unread: true },
                { name: 'Aaliyah B.', msg: 'See you at 12:30!', time: '1h', unread: false },
              ].map((m, i) => (
                <div key={i} className="px-4 py-3 border-t border-white/5 flex items-center gap-3 hover:bg-white/5 cursor-pointer transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                    {m.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${m.unread ? 'text-white font-semibold' : 'text-slate-300'}`}>{m.name}</p>
                    <p className="text-slate-500 text-xs truncate">{m.msg}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-slate-600 text-xs">{m.time}</span>
                    {m.unread && <span className="w-2 h-2 rounded-full bg-pink-500"></span>}
                  </div>
                </div>
              ))}
              <div className="px-4 py-3 border-t border-white/10">
                <Link href="/pro/messages" className="text-pink-400 text-xs hover:text-pink-300 flex items-center gap-1">
                  <MessageSquare size={12} /> Open all messages
                </Link>
              </div>
            </div>

            {/* Quick actions */}
            <div className="glass rounded-2xl p-4 border border-white/10">
              <h3 className="font-bold text-white text-sm mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Add Service', icon: Plus },
                  { label: 'Send Campaign', icon: MessageSquare },
                  { label: 'View Reports', icon: TrendingUp },
                  { label: 'Set Hours', icon: Clock },
                ].map(a => (
                  <button key={a.label} className="glass border border-white/10 rounded-xl p-3 flex flex-col items-center gap-1.5 hover:border-pink-500/30 hover:bg-pink-500/5 transition-all group">
                    <a.icon size={16} className="text-slate-400 group-hover:text-pink-400 transition-colors" />
                    <span className="text-slate-400 group-hover:text-white text-xs transition-colors">{a.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
