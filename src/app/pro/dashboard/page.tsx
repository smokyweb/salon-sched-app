'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Navbar from '../../../components/Navbar'
import {
  Calendar, DollarSign, Users, TrendingUp, Bell, Phone,
  Star, MessageSquare, Plus, ChevronRight, Clock, LogOut, Settings
} from 'lucide-react'
import Link from 'next/link'

interface ProProfile {
  id: string
  businessName: string
  specialty: string | null
  location: string | null
  bio: string | null
  rating: number
  reviewCount: number
  planTier: string
  isVerified: boolean
}

interface Booking {
  id: string
  date: string
  status: string
  totalAmount: number
  duration: number
  service: { name: string; price: number }
  customer: { name: string | null; email: string; image: string | null }
}

export default function ProDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<ProProfile | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?redirect=/pro/dashboard')
      return
    }
    if (status === 'authenticated') {
      if ((session?.user as any)?.role !== 'PRO') {
        router.push('/marketplace')
        return
      }
      fetchData()
    }
  }, [status, session])

  const fetchData = async () => {
    try {
      const [profileRes, bookingsRes] = await Promise.all([
        fetch('/api/pro/profile'),
        fetch('/api/bookings'),
      ])
      if (profileRes.ok) setProfile(await profileRes.json().then(d => d.profile))
      if (bookingsRes.ok) setBookings(await bookingsRes.json().then(d => d.bookings))
    } catch (e) {
      console.error('Failed to load dashboard data', e)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Today's bookings
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1)

  const todayBookings = bookings.filter(b => {
    const d = new Date(b.date)
    return d >= today && d < tomorrow
  })

  const upcomingBookings = bookings
    .filter(b => new Date(b.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6)

  // Revenue calcs
  const todayRevenue = todayBookings
    .filter(b => b.status !== 'CANCELLED')
    .reduce((sum, b) => sum + b.totalAmount, 0)

  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
  const monthRevenue = bookings
    .filter(b => new Date(b.date) >= monthStart && b.status !== 'CANCELLED')
    .reduce((sum, b) => sum + b.totalAmount, 0)

  const uniqueClients = new Set(bookings.map(b => b.customer?.email)).size

  const firstName = (profile?.businessName || session?.user?.name || 'Pro').split(' ')[0]

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit', hour12: true
    })
  }
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric'
    })
  }

  const statusColor = (s: string) => ({
    CONFIRMED: 'bg-emerald-500/15 text-emerald-400',
    PENDING: 'bg-amber-500/15 text-amber-400',
    COMPLETED: 'bg-blue-500/15 text-blue-400',
    CANCELLED: 'bg-red-500/15 text-red-400',
  }[s] ?? 'bg-slate-500/15 text-slate-400')

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <div className="pt-20 pb-16 max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black text-white">
              Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {firstName} ✨
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              {todayBookings.length > 0
                ? ` · ${todayBookings.length} appointment${todayBookings.length !== 1 ? 's' : ''} today`
                : ' · No appointments today'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {profile?.planTier && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/20 font-medium capitalize">
                {profile.planTier} plan
              </span>
            )}
            <Link href="/pro/settings" className="glass border border-white/10 rounded-xl p-2.5 text-slate-400 hover:text-white transition-colors">
              <Settings size={18} />
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="glass border border-white/10 rounded-xl p-2.5 text-slate-400 hover:text-red-400 transition-colors"
              title="Sign out">
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Today's Revenue",
              value: `$${todayRevenue.toFixed(0)}`,
              sub: `${todayBookings.length} bookings`,
              icon: DollarSign,
              color: 'text-emerald-400',
              bg: 'bg-emerald-500/10 border-emerald-500/20'
            },
            {
              label: 'This Month',
              value: `$${monthRevenue.toFixed(0)}`,
              sub: 'total revenue',
              icon: TrendingUp,
              color: 'text-blue-400',
              bg: 'bg-blue-500/10 border-blue-500/20'
            },
            {
              label: 'Total Clients',
              value: uniqueClients.toString(),
              sub: 'unique clients',
              icon: Users,
              color: 'text-purple-400',
              bg: 'bg-purple-500/10 border-purple-500/20'
            },
            {
              label: 'Avg Rating',
              value: profile?.reviewCount ? `${profile.rating.toFixed(1)}★` : 'No ratings',
              sub: profile?.reviewCount ? `${profile.reviewCount} reviews` : 'yet',
              icon: Star,
              color: 'text-amber-400',
              bg: 'bg-amber-500/10 border-amber-500/20'
            },
          ].map(k => (
            <div key={k.label} className={`glass rounded-2xl p-4 border ${k.bg}`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-400 text-xs">{k.label}</p>
                <div className={`w-7 h-7 rounded-lg ${k.bg} flex items-center justify-center`}>
                  <k.icon size={14} className={k.color} />
                </div>
              </div>
              <p className="text-white text-2xl font-black">{k.value}</p>
              <p className={`text-xs mt-1 ${k.color}`}>{k.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl border border-white/10 overflow-hidden">
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                <h2 className="font-bold text-white">Upcoming Appointments</h2>
                <Link href="/pro/calendar" className="text-pink-400 text-sm hover:text-pink-300 flex items-center gap-1">
                  Full calendar <ChevronRight size={14} />
                </Link>
              </div>

              {upcomingBookings.length === 0 ? (
                <div className="px-5 py-12 text-center">
                  <Calendar size={32} className="text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 font-medium">No upcoming appointments</p>
                  <p className="text-slate-600 text-sm mt-1">Share your profile to start getting booked</p>
                  <Link
                    href={profile ? `/pro/${profile.id}` : '#'}
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl text-sm font-medium text-pink-400 border border-pink-500/30 hover:bg-pink-500/10 transition-colors">
                    View my profile
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {upcomingBookings.map((appt) => (
                    <div key={appt.id} className="px-5 py-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                      <div className="w-20 text-center flex-shrink-0">
                        <p className="text-white font-bold text-sm">{formatTime(appt.date)}</p>
                        <p className="text-slate-500 text-xs">{formatDate(appt.date)}</p>
                      </div>
                      <div className={`w-1 h-12 rounded-full flex-shrink-0 ${appt.status === 'CONFIRMED' ? 'bg-emerald-400' : appt.status === 'PENDING' ? 'bg-amber-400' : 'bg-slate-500'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm">{appt.customer?.name || appt.customer?.email || 'Client'}</p>
                        <p className="text-slate-400 text-xs">{appt.service?.name} · {appt.duration} min</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-white font-bold text-sm">${appt.totalAmount}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(appt.status)}`}>
                          {appt.status.toLowerCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Profile Summary */}
            <div className="glass rounded-2xl p-5 border border-purple-500/20 bg-purple-500/5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-white text-sm">My Profile</h3>
                {profile?.isVerified && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20">✓ Verified</span>
                )}
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-white font-semibold">{profile?.businessName || session?.user?.name}</p>
                  {profile?.specialty && <p className="text-slate-400 text-xs">{profile.specialty}</p>}
                  {profile?.location && <p className="text-slate-500 text-xs mt-0.5">📍 {profile.location}</p>}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Link
                  href="/pro/settings"
                  className="flex-1 glass border border-purple-500/30 rounded-xl py-2 text-purple-300 text-xs font-medium hover:bg-purple-500/10 transition-colors text-center flex items-center justify-center gap-1">
                  <Settings size={12} /> Edit Profile
                </Link>
                {profile && (
                  <Link
                    href={`/pro/${profile.id}`}
                    className="flex-1 glass border border-white/10 rounded-xl py-2 text-slate-300 text-xs font-medium hover:bg-white/5 transition-colors text-center">
                    View Public
                  </Link>
                )}
              </div>
            </div>

            {/* AI Receptionist Status */}
            <div className="glass rounded-2xl p-5 border border-pink-500/20 bg-pink-500/5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-white text-sm">AI Receptionist</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                  <span className="text-slate-400 text-xs font-medium">Setup needed</span>
                </div>
              </div>
              <p className="text-slate-400 text-xs mb-3">Enable AI to handle calls and bookings 24/7 while you focus on clients.</p>
              <Link href="/ai-voice" className="w-full glass border border-pink-500/30 rounded-xl py-2 text-pink-300 text-xs font-medium hover:bg-pink-500/10 transition-colors flex items-center justify-center gap-1.5">
                <Phone size={13} /> Set up AI Receptionist
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="glass rounded-2xl p-4 border border-white/10">
              <h3 className="font-bold text-white text-sm mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Add Service', icon: Plus, href: '/pro/settings' },
                  { label: 'Messages', icon: MessageSquare, href: '/pro/messages' },
                  { label: 'Analytics', icon: TrendingUp, href: '/pro/analytics' },
                  { label: 'Set Hours', icon: Clock, href: '/pro/settings' },
                ].map(a => (
                  <Link key={a.label} href={a.href}
                    className="glass border border-white/10 rounded-xl p-3 flex flex-col items-center gap-1.5 hover:border-pink-500/30 hover:bg-pink-500/5 transition-all group">
                    <a.icon size={16} className="text-slate-400 group-hover:text-pink-400 transition-colors" />
                    <span className="text-slate-400 group-hover:text-white text-xs transition-colors">{a.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
