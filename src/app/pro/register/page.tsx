import Navbar from '../../../components/Navbar'
import Link from 'next/link'
import { CheckCircle, Zap, DollarSign, Users, Phone, Star, TrendingUp } from 'lucide-react'

const PLANS = [
  {
    name: 'Starter', price: '$29', period: '/mo',
    desc: 'Perfect for solo professionals just getting started',
    features: ['Booking calendar', 'Online booking page', 'Marketplace listing', 'Basic client management', 'Email reminders', '50 SMS/month'],
    cta: 'Start Free Trial',
    popular: false,
    gradient: 'from-slate-600 to-slate-700',
  },
  {
    name: 'Professional', price: '$79', period: '/mo',
    desc: 'For growing professionals who want to maximize revenue',
    features: ['Everything in Starter', 'AI Voice Receptionist', 'Unlimited SMS marketing', 'AI content tools', 'Payment processing', 'Featured marketplace listing', 'Website builder', 'Advanced analytics'],
    cta: 'Start Free Trial',
    popular: true,
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    name: 'Enterprise', price: '$149', period: '/mo',
    desc: 'For multi-location businesses and franchise owners',
    features: ['Everything in Professional', 'Multi-location management', 'Staff scheduling', 'Commission tracking', 'API access', 'Dedicated account manager', 'Custom AI training', 'White-label option'],
    cta: 'Contact Sales',
    popular: false,
    gradient: 'from-blue-600 to-indigo-700',
  },
]

export default function ProRegisterPage() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border border-pink-500/30">
            <Zap size={14} className="text-pink-400" />
            <span className="text-pink-300 text-sm font-medium">Join 21,000+ Professionals</span>
          </div>
          <h1 className="text-5xl font-black text-white mb-4">
            Grow your beauty business<br />
            <span className="gradient-text">with AI-powered tools</span>
          </h1>
          <p className="text-slate-400 text-lg">Start free. No credit card required. Cancel anytime.</p>

          {/* Social proof */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {[
              { icon: DollarSign, stat: '+85%', label: 'Revenue increase' },
              { icon: Phone, stat: '0', label: 'Missed calls' },
              { icon: Users, stat: '300%', label: 'More new clients' },
              { icon: Star, stat: '4.9★', label: 'Average rating' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-black gradient-text">{s.stat}</p>
                <p className="text-slate-500 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5 mb-16">
          {PLANS.map(plan => (
            <div key={plan.name} className={`relative rounded-2xl overflow-hidden ${plan.popular ? 'ring-2 ring-pink-500 scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold text-center py-1.5">
                  MOST POPULAR
                </div>
              )}
              <div className="glass border border-white/10 p-6 h-full" style={{ paddingTop: plan.popular ? '32px' : '24px' }}>
                <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${plan.gradient} mb-4`}>
                  {plan.name}
                </div>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-slate-400 mb-1">{plan.period}</span>
                </div>
                <p className="text-slate-400 text-sm mb-5">{plan.desc}</p>
                <button className={`w-full py-3 rounded-xl font-bold text-sm mb-5 transition-all ${plan.popular ? 'btn-brand' : 'glass border border-white/20 text-white hover:bg-white/5'}`}>
                  {plan.cta}
                </button>
                <ul className="space-y-2.5">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Quick signup form */}
        <div className="max-w-lg mx-auto">
          <div className="glass rounded-2xl p-8 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 text-center">Start your free 30-day trial</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">First Name</label>
                  <input placeholder="Ariana" className="w-full glass border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500/50 bg-transparent placeholder-slate-600" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Last Name</label>
                  <input placeholder="Cole" className="w-full glass border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500/50 bg-transparent placeholder-slate-600" />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Email</label>
                <input type="email" placeholder="you@gmail.com" className="w-full glass border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500/50 bg-transparent placeholder-slate-600" />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Business Name</label>
                <input placeholder="Ariana Beauty Studio" className="w-full glass border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500/50 bg-transparent placeholder-slate-600" />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Specialty</label>
                <select className="w-full glass border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500/50 bg-transparent">
                  <option className="bg-dark" value="">Select your specialty</option>
                  {['Hair Stylist', 'Colorist', 'Barber', 'Esthetician', 'Nail Tech', 'Massage Therapist', 'Lash Artist', 'Makeup Artist', 'Other'].map(o => (
                    <option key={o} value={o} className="bg-dark">{o}</option>
                  ))}
                </select>
              </div>
              <button className="w-full btn-brand py-3.5 text-base font-bold mt-2">
                Create Free Account →
              </button>
              <p className="text-slate-600 text-xs text-center">
                By signing up you agree to our{' '}
                <Link href="/terms" className="text-slate-500 hover:text-white">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-slate-500 hover:text-white">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
