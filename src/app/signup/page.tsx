import Link from 'next/link'
import Image from 'next/image'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image src="/logo.png" alt="Glowly" width={40} height={40} className="rounded-xl" />
            <span className="font-bold text-2xl gradient-text">Glowly</span>
          </div>
          <h1 className="text-2xl font-black text-white">Join Glowly</h1>
          <p className="text-slate-400 text-sm mt-1">Create your free account</p>
        </div>
        <div className="glass rounded-2xl p-8 border border-white/10">
          {/* Role selector */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <button className="glass border border-pink-500/50 bg-pink-500/10 rounded-xl py-3 text-white text-sm font-semibold">
              👤 I'm a Customer
            </button>
            <button className="glass border border-white/10 rounded-xl py-3 text-slate-400 text-sm font-medium hover:text-white transition-colors">
              💅 I'm a Pro
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">First Name</label>
                <input placeholder="Jessica" className="w-full glass border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500/50 bg-transparent placeholder-slate-600" />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Last Name</label>
                <input placeholder="Martinez" className="w-full glass border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500/50 bg-transparent placeholder-slate-600" />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Email</label>
              <input type="email" placeholder="you@gmail.com" className="w-full glass border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500/50 bg-transparent placeholder-slate-600" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Password</label>
              <input type="password" placeholder="••••••••" className="w-full glass border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500/50 bg-transparent placeholder-slate-600" />
            </div>
            <Link href="/marketplace" className="btn-brand w-full py-3.5 text-sm font-bold block text-center">Create Free Account</Link>
          </div>
          <p className="text-center text-slate-500 text-xs mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-pink-400 hover:text-pink-300">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
