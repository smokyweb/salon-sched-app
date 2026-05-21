import Navbar from '../../components/Navbar'
import AIVoiceWidget from '../../components/AIVoiceWidget'
import Link from 'next/link'
import { Phone, Mic, Calendar, MessageSquare, Clock, Shield, Zap, BarChart3, CheckCircle, ChevronRight } from 'lucide-react'

export default function AIVoicePage() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border border-pink-500/30">
            <Zap size={14} className="text-pink-400" />
            <span className="text-pink-300 text-sm font-medium">AI Voice Technology</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            The AI receptionist that<br />
            <span className="gradient-text">never misses a call</span>
          </h1>
          <p className="text-slate-400 text-xl mb-8 max-w-2xl mx-auto">
            62% of salon calls go unanswered. Our AI answers every call instantly, books appointments, and handles client questions — 24 hours a day, 7 days a week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pro/register" className="btn-brand px-8 py-4 text-base">Try It Free →</Link>
            <button className="glass border border-white/20 text-white px-8 py-4 rounded-xl hover:bg-white/5 transition-colors font-semibold">
              Hear a Demo Call
            </button>
          </div>

          {/* Impact stat */}
          <div className="mt-12 inline-flex items-center gap-3 glass rounded-2xl px-6 py-4 border border-white/10">
            <div className="text-4xl">📞</div>
            <div className="text-left">
              <p className="text-white font-black text-2xl">$126,000</p>
              <p className="text-slate-400 text-sm">average annual revenue lost from missed calls per salon</p>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-10">How the AI works</h2>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { step: '01', icon: Phone, title: 'Call Comes In', desc: 'Client calls your business number. AI answers instantly in your business name.', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
              { step: '02', icon: Mic, title: 'AI Understands', desc: 'Deepgram speech recognition converts voice to text in real time with 98%+ accuracy.', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
              { step: '03', icon: Calendar, title: 'Checks Availability', desc: 'AI queries your live calendar and offers real available slots to the caller.', color: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/20' },
              { step: '04', icon: CheckCircle, title: 'Books & Confirms', desc: 'Appointment created, confirmation SMS sent to client, and you get notified.', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
            ].map(s => (
              <div key={s.step} className={`glass rounded-2xl p-5 border ${s.bg} relative`}>
                <span className="absolute top-3 right-3 text-xs font-bold text-slate-600">{s.step}</span>
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-4`}>
                  <s.icon size={20} className={s.color} />
                </div>
                <h3 className="font-bold text-white text-sm mb-2">{s.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: Phone, title: 'Inbound Call Handling', desc: 'Books, reschedules, cancels appointments. Answers pricing questions, directions, and hours.', badge: 'Core' },
              { icon: MessageSquare, title: 'Outbound Reminders', desc: 'Calls or texts clients before appointments. Reduces no-shows by up to 67%.', badge: 'Pro' },
              { icon: Clock, title: '24/7 Availability', desc: 'Books appointments at 2 AM on a Sunday. Never lose a client to after-hours timing.', badge: 'Core' },
              { icon: Shield, title: 'Business Phone Masking', desc: 'AI uses your business number. Your personal number stays private forever.', badge: 'Core' },
              { icon: Zap, title: 'Instant Response', desc: 'Answers in under 2 seconds. No hold music, no voicemail, no frustration.', badge: 'Core' },
              { icon: BarChart3, title: 'Call Analytics', desc: 'See every call, transcript, intent, and booking. Full AI performance dashboard.', badge: 'Pro' },
            ].map(f => (
              <div key={f.title} className="glass rounded-2xl p-5 border border-white/10 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center flex-shrink-0">
                  <f.icon size={18} className="text-pink-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white text-sm">{f.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${f.badge === 'Pro' ? 'bg-purple-500/20 text-purple-300' : 'bg-slate-700 text-slate-400'}`}>{f.badge}</span>
                  </div>
                  <p className="text-slate-400 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-2xl mx-auto text-center glass rounded-3xl p-10 border border-white/10">
          <h2 className="text-3xl font-black text-white mb-3">Stop losing $126K a year</h2>
          <p className="text-slate-400 mb-6">Set up your AI receptionist in 5 minutes. Works with your existing Glowly calendar instantly.</p>
          <Link href="/pro/register" className="btn-brand px-8 py-4 text-base inline-flex items-center gap-2">
            Activate AI Receptionist <ChevronRight size={18} />
          </Link>
          <p className="text-slate-600 text-xs mt-3">Included in Professional plan · $79/month</p>
        </div>
      </div>
      <AIVoiceWidget />
    </div>
  )
}
