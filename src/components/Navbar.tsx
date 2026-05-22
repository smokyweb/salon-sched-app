'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, ShieldAlert } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { data: session } = useSession()
  const isAdmin = (session?.user as any)?.role === 'ADMIN'
  const isPro = (session?.user as any)?.role === 'PRO'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 relative">
            <Image src="/logo.png" alt="Glowly" width={32} height={32} className="rounded-lg object-cover" />
          </div>
          <span className="font-bold text-xl gradient-text">Glowly</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/explore" className="text-slate-300 hover:text-white transition-colors">Explore</Link>
          <Link href="/marketplace" className="text-slate-300 hover:text-white transition-colors">Marketplace</Link>
          <div className="relative group">
            <button className="text-slate-300 hover:text-white transition-colors flex items-center gap-1">
              For Professionals <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 glass rounded-xl border border-white/10 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <Link href="/pro/register" className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg text-sm">Join as a Pro</Link>
              <Link href="/pro/dashboard" className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg text-sm">Pro Dashboard</Link>
              <Link href="/pricing" className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg text-sm">Pricing</Link>
            </div>
          </div>
          <Link href="/ai-voice" className="text-slate-300 hover:text-white transition-colors">AI Voice</Link>

          {/* Admin link — only visible to ADMIN users */}
          {isAdmin && (
            <Link href="/admin"
              className="flex items-center gap-1.5 text-red-400 hover:text-red-300 transition-colors font-medium">
              <ShieldAlert size={14} />
              Admin
            </Link>
          )}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            isPro || isAdmin ? (
              <Link href={isAdmin ? '/admin' : '/pro/dashboard'}
                className="text-slate-300 hover:text-white text-sm transition-colors px-4 py-2">
                Dashboard
              </Link>
            ) : (
              <Link href="/marketplace" className="text-slate-300 hover:text-white text-sm transition-colors px-4 py-2">
                Browse
              </Link>
            )
          ) : (
            <Link href="/login" className="text-slate-300 hover:text-white text-sm transition-colors px-4 py-2">Sign In</Link>
          )}
          {!session && (
            <Link href="/signup" className="btn-brand text-sm px-5 py-2">Get Started Free</Link>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-1">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/10 px-4 py-4 space-y-3">
          <Link href="/explore" className="block text-slate-300 hover:text-white py-2 text-sm" onClick={() => setMenuOpen(false)}>Explore</Link>
          <Link href="/marketplace" className="block text-slate-300 hover:text-white py-2 text-sm" onClick={() => setMenuOpen(false)}>Marketplace</Link>
          <Link href="/ai-voice" className="block text-slate-300 hover:text-white py-2 text-sm" onClick={() => setMenuOpen(false)}>AI Voice</Link>
          <Link href="/pricing" className="block text-slate-300 hover:text-white py-2 text-sm" onClick={() => setMenuOpen(false)}>Pricing</Link>
          {isAdmin && (
            <Link href="/admin" className="block text-red-400 hover:text-red-300 py-2 text-sm flex items-center gap-1.5" onClick={() => setMenuOpen(false)}>
              <ShieldAlert size={14} /> Admin Panel
            </Link>
          )}
          <div className="pt-2 flex flex-col gap-2">
            {session ? (
              <Link href={isAdmin ? '/admin' : isPro ? '/pro/dashboard' : '/marketplace'}
                className="text-center py-2.5 border border-white/20 rounded-xl text-white text-sm" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-center py-2.5 border border-white/20 rounded-xl text-white text-sm" onClick={() => setMenuOpen(false)}>Sign In</Link>
                <Link href="/signup" className="btn-brand text-center text-sm" onClick={() => setMenuOpen(false)}>Get Started Free</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
