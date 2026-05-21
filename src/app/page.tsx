import Navbar from '../components/Navbar'
import AIVoiceWidget from '../components/AIVoiceWidget'
import ProfessionalCard from '../components/ProfessionalCard'
import Link from 'next/link'
import Image from 'next/image'
import { Search, MapPin, Star, Phone, Calendar, CreditCard, Zap, Shield, Users, TrendingUp, ChevronRight, Play, CheckCircle } from 'lucide-react'
import { PROFESSIONALS, SERVICES, STATS, TESTIMONIALS } from '../lib/data'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark overflow-x-hidden">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center pt-16">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-purple-600/15 blur-[100px]"></div>
          <div className="absolute top-40 right-1/4 w-96 h-96 rounded-full bg-pink-600/15 blur-[100px]"></div>
          <div className="absolute bottom-0 left-1/2 w-64 h-64 rounded-full bg-blue-600/10 blur-[80px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border border-pink-500/30">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-sm text-slate-300">AI-Powered Booking — Available 24/7</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
              <span className="text-white">Book beauty</span>
              <br />
              <span className="gradient-text">instantly,</span>
              <br />
              <span className="text-white">anywhere.</span>
            </h1>

            <p className="mt-6 text-lg text-slate-400 max-w-xl leading-relaxed">
              Discover top-rated beauty & wellness professionals near you. 
              AI-powered scheduling means you can book at midnight — no waiting, no phone tag.
            </p>

            {/* Search bar */}
            <div className="mt-8 glass rounded-2xl p-2 border border-white/10 flex flex-col sm:flex-row gap-2">
              <div className="flex items-center gap-2 flex-1 px-3">
                <Search size={18} className="text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Haircut, color, massage..."
                  className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm py-2"
                />
              </div>
              <div className="flex items-center gap-2 px-3 sm:border-l border-white/10">
                <MapPin size={18} className="text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Arlington, TX"
                  className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm py-2 w-28"
                />
              </div>
              <Link href="/explore" className="btn-brand px-6 py-3 text-sm text-center whitespace-nowrap rounded-xl">
                Find Now
              </Link>
            </div>

            {/* Popular searches */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-slate-500 text-sm">Popular:</span>
              {['Balayage', 'Fade', 'Lashes', 'Massage', 'Natural Hair'].map(s => (
                <Link key={s} href={`/explore?q=${s}`}
                  className="text-sm text-slate-400 hover:text-pink-400 transition-colors">
                  {s}
                </Link>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap gap-8">
              {STATS.map(stat => (
                <div key={stat.label}>
                  <p className="text-2xl font-black gradient-text">{stat.value}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — App preview cards */}
          <div className="relative hidden lg:block">
            <div className="relative ml-8">
              {/* Main card */}
              <div className="glass rounded-3xl p-6 border border-white/10 shadow-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden">
                    <Image src="/logo.png" alt="Glowly" width={48} height={48} className="object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Your AI Receptionist</p>
                    <p className="text-emerald-400 text-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                      Active now
                    </p>
                  </div>
                </div>

                {/* Chat bubbles */}
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl rounded-tr-none px-4 py-2.5 max-w-xs">
                      <p className="text-white text-sm">I need a balayage appointment for Saturday</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="glass rounded-2xl rounded-tl-none px-4 py-2.5 max-w-xs border border-white/10">
                      <p className="text-slate-200 text-sm">I found 3 balayage specialists available Saturday! Ariana Cole has openings at 10 AM and 2 PM ✨</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl rounded-tr-none px-4 py-2.5 max-w-xs">
                      <p className="text-white text-sm">Book 10 AM please!</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="glass rounded-2xl rounded-tl-none px-4 py-2.5 max-w-xs border border-white/10">
                      <p className="text-slate-200 text-sm">✅ Booked! Ariana Cole — Saturday 10:00 AM. Confirmation sent to your phone!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -top-6 -right-6 glass rounded-2xl p-3 border border-white/10 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-xs font-bold">A</div>
                  <div>
                    <p className="text-white text-xs font-semibold">Booking confirmed!</p>
                    <p className="text-slate-400 text-xs">Ariana Cole · 10:00 AM</p>
                  </div>
                  <CheckCircle size={16} className="text-emerald-400 ml-1" />
                </div>
              </div>

              <div className="absolute -bottom-4 -left-6 glass rounded-2xl p-3 border border-white/10 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">⭐</div>
                  <div>
                    <p className="text-white text-xs font-semibold">162M+ bookings</p>
                    <p className="text-slate-400 text-xs">in 2025 alone</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICE CATEGORIES ===== */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Browse by Service</h2>
            <p className="text-slate-400 text-sm mt-1">Find exactly what you need</p>
          </div>
          <Link href="/explore" className="text-pink-400 hover:text-pink-300 text-sm flex items-center gap-1">
            See all <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-3">
          {SERVICES.map(service => (
            <Link key={service.id} href={`/explore?service=${service.name}`}
              className="glass rounded-2xl p-3 border border-white/10 hover:border-pink-500/40 hover:bg-pink-500/5 transition-all text-center group">
              <div className="text-2xl mb-1.5">{service.icon}</div>
              <p className="text-slate-300 text-xs font-medium group-hover:text-white transition-colors leading-tight">{service.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PROFESSIONALS ===== */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Top Professionals Near You</h2>
            <p className="text-slate-400 text-sm mt-1">Arlington, TX · Available today</p>
          </div>
          <Link href="/marketplace" className="text-pink-400 hover:text-pink-300 text-sm flex items-center gap-1">
            View all <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROFESSIONALS.map(pro => (
            <ProfessionalCard key={pro.id} pro={pro} />
          ))}
        </div>
      </section>

      {/* ===== AI VOICE FEATURE ===== */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-3xl border border-white/10 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left */}
              <div className="p-10 lg:p-14">
                <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/30 rounded-full px-3 py-1.5 mb-6">
                  <Zap size={14} className="text-pink-400" />
                  <span className="text-pink-400 text-xs font-semibold">AI-First Technology</span>
                </div>
                <h2 className="text-4xl font-black text-white mb-4">
                  Your AI receptionist<br />
                  <span className="gradient-text">never sleeps.</span>
                </h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  62% of salon calls go unanswered. Our AI voice agent answers every call instantly, books appointments in real time, and sends confirmations — all without you lifting a finger.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    { icon: Phone, text: 'Answers calls 24/7 in your business name' },
                    { icon: Calendar, text: 'Books, reschedules, and cancels appointments' },
                    { icon: CreditCard, text: 'Collects deposits and sends payment links' },
                    { icon: Star, text: 'Sends review requests after each appointment' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-pink-500/15 flex items-center justify-center flex-shrink-0">
                        <Icon size={15} className="text-pink-400" />
                      </div>
                      <span className="text-slate-300 text-sm">{text}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Link href="/ai-voice" className="btn-brand px-6 py-3 text-sm">Try AI Booking</Link>
                  <button className="flex items-center gap-2 text-slate-300 hover:text-white text-sm px-4 py-3 transition-colors">
                    <Play size={16} className="text-pink-400" /> Watch Demo
                  </button>
                </div>
              </div>

              {/* Right — Voice visualization */}
              <div className="relative bg-gradient-to-br from-purple-900/40 to-pink-900/40 p-10 flex items-center justify-center">
                <div className="text-center">
                  {/* Animated rings */}
                  <div className="relative w-40 h-40 mx-auto mb-8">
                    <div className="absolute inset-0 rounded-full border-2 border-pink-500/20 animate-ping"></div>
                    <div className="absolute inset-4 rounded-full border-2 border-pink-500/30 animate-ping" style={{animationDelay:'0.3s'}}></div>
                    <div className="absolute inset-8 rounded-full border-2 border-pink-500/40 animate-ping" style={{animationDelay:'0.6s'}}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full btn-brand flex items-center justify-center shadow-glow ai-pulse">
                        <Phone size={32} />
                      </div>
                    </div>
                  </div>

                  {/* Conversation preview */}
                  <div className="space-y-3 max-w-xs mx-auto">
                    <div className="glass rounded-xl p-3 border border-white/10 text-left">
                      <p className="text-xs text-slate-400 mb-1">Client</p>
                      <p className="text-white text-sm">"Hi, I need a haircut for this Saturday"</p>
                    </div>
                    <div className="glass rounded-xl p-3 border border-pink-500/20 bg-pink-500/5 text-left">
                      <p className="text-xs text-pink-400 mb-1">AI Assistant</p>
                      <p className="text-white text-sm">"I have 2 PM or 4 PM available on Saturday. Which works better for you?"</p>
                    </div>
                    <div className="glass rounded-xl p-3 border border-emerald-500/20 bg-emerald-500/5 text-left">
                      <p className="text-xs text-emerald-400 mb-1">Booking confirmed ✓</p>
                      <p className="text-white text-sm">Saturday 2:00 PM — Confirmation sent!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOR PROFESSIONALS ===== */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-5 border border-white/10">
            <Users size={14} className="text-blue-400" />
            <span className="text-slate-300 text-sm">For Beauty Professionals</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-4">
            Everything you need to<br />
            <span className="gradient-text">run and grow your business</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Join 21,000+ independent beauty professionals who use Glowly to fill their calendars, manage clients, and grow their income.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Calendar, title: 'Smart Booking Calendar', desc: 'Drag-and-drop schedule management with conflict detection, recurring appointments, and real-time sync.', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
            { icon: Phone, title: 'AI Voice Receptionist', desc: '24/7 AI answers calls, books appointments, and handles client questions in your business name.', color: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/20' },
            { icon: CreditCard, title: 'Integrated Payments', desc: 'Accept cards, contactless, tips, gift cards, and packages all in one seamless checkout flow.', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
            { icon: TrendingUp, title: 'Marketing Automation', desc: 'Email, SMS campaigns, rebooking reminders, birthday offers, and Google review requests — automated.', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
            { icon: Star, title: 'Marketplace Visibility', desc: "Get discovered by new clients on Glowly's marketplace. 300%+ client growth for active pros.", color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
            { icon: Shield, title: 'Professional Website', desc: 'Auto-generated, mobile-optimized pro page with booking, gallery, reviews, and custom domain.', color: 'text-teal-400', bg: 'bg-teal-500/10 border-teal-500/20' },
          ].map(f => (
            <div key={f.title} className={`glass rounded-2xl p-6 border ${f.bg} hover:border-opacity-60 transition-all group`}>
              <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                <f.icon size={20} className={f.color} />
              </div>
              <h3 className="font-bold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/pro/register" className="btn-brand px-8 py-4 text-base inline-block">
            Start Free — No Credit Card Required
          </Link>
          <p className="text-slate-500 text-sm mt-3">Free 30-day trial · Then from $29/month</p>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">Pros love Glowly</h2>
          <p className="text-slate-400">Real results from real professionals</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map(t => (
            <div key={t.author} className="glass rounded-2xl p-6 border border-white/10">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-slate-200 text-sm leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.author}</p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 text-sm font-bold">{t.metric}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center glass rounded-3xl p-12 border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10"></div>
          <div className="relative">
            <h2 className="text-4xl font-black text-white mb-4">
              Ready to transform<br />
              <span className="gradient-text">your beauty business?</span>
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Join thousands of beauty professionals who've eliminated missed calls, automated their scheduling, and grown their income with Glowly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pro/register" className="btn-brand px-8 py-4 text-base">
                Start Free Trial →
              </Link>
              <Link href="/explore" className="glass border border-white/20 text-white px-8 py-4 text-base rounded-xl hover:bg-white/5 transition-colors font-semibold">
                Find a Professional
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.png" alt="Glowly" width={28} height={28} className="rounded-lg" />
                <span className="font-bold text-lg gradient-text">Glowly</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                The AI-powered booking platform for beauty & wellness professionals. 21,000+ pros trust Glowly to grow their business.
              </p>
            </div>
            {[
              { title: 'Platform', links: ['How It Works', 'Marketplace', 'Pricing', 'Enterprise'] },
              { title: 'For Pros', links: ['Join as a Pro', 'AI Receptionist', 'Marketing Tools', 'Payments'] },
              { title: 'Company', links: ['About Us', 'Blog', 'Careers', 'Press'] },
              { title: 'Support', links: ['Help Center', 'Contact', 'Privacy Policy', 'Terms'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-white font-semibold text-sm mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link}>
                      <Link href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-600 text-sm">© 2026 Glowly Inc. All rights reserved.</p>
            <p className="text-slate-600 text-sm">Built for beauty professionals everywhere 💜</p>
          </div>
        </div>
      </footer>

      {/* AI Voice floating widget */}
      <AIVoiceWidget />
    </div>
  )
}
