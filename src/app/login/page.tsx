import Navbar from '../../components/Navbar'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image src="/logo.png" alt="Glowly" width={40} height={40} className="rounded-xl" />
            <span className="font-bold text-2xl gradient-text">Glowly</span>
          </div>
          <h1 className="text-2xl font-black text-white">Welcome back</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to your account</p>
        </div>
        <div className="glass rounded-2xl p-8 border border-white/10">
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Email</label>
              <input type="email" placeholder="you@gmail.com" className="w-full glass border border-white/10 rounded-xl px-3 py-3 text-white text-sm focus:outline-none focus:border-pink-500/50 bg-transparent placeholder-slate-600" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Password</label>
              <input type="password" placeholder="••••••••" className="w-full glass border border-white/10 rounded-xl px-3 py-3 text-white text-sm focus:outline-none focus:border-pink-500/50 bg-transparent placeholder-slate-600" />
            </div>
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-pink-400 text-xs hover:text-pink-300">Forgot password?</Link>
            </div>
            <Link href="/pro/dashboard" className="btn-brand w-full py-3.5 text-sm font-bold block text-center">Sign In</Link>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
              <div className="relative flex justify-center"><span className="glass px-3 text-slate-500 text-xs">or continue with</span></div>
            </div>
            <button className="w-full glass border border-white/10 rounded-xl py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
              <svg viewBox="0 0 24 24" width="16" height="16"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
          </div>
          <p className="text-center text-slate-500 text-sm mt-5">
            Don't have an account?{' '}
            <Link href="/signup" className="text-pink-400 hover:text-pink-300 font-medium">Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
