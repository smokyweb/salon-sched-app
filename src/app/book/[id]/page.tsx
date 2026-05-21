'use client'
import { useState } from 'react'
import Navbar from '../../../components/Navbar'
import { PROFESSIONALS, TIME_SLOTS } from '../../../lib/data'
import { ChevronLeft, ChevronRight, CheckCircle, Calendar, Clock, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { addDays, format, startOfWeek } from 'date-fns'

const STEPS = ['Service', 'Date & Time', 'Details', 'Confirm']

export default function BookingPage({ params }: { params: { id: string } }) {
  const pro = PROFESSIONALS.find(p => p.id === params.id) || PROFESSIONALS[0]
  const [step, setStep] = useState(0)
  const [selectedService, setSelectedService] = useState(pro.services[0])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
  const weekDays = [...Array(7)].map((_, i) => addDays(weekStart, i))

  if (confirmed) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-400" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3">Booking Confirmed! 🎉</h1>
          <p className="text-slate-400 mb-6">
            Your appointment with <span className="text-white font-semibold">{pro.name}</span> has been confirmed.
          </p>
          <div className="glass rounded-2xl p-5 border border-white/10 text-left mb-6">
            <div className="space-y-3">
              {[
                { label: 'Professional', value: pro.name },
                { label: 'Service', value: selectedService },
                { label: 'Date', value: format(selectedDate, 'EEEE, MMMM d') },
                { label: 'Time', value: selectedTime || '3:00 PM' },
                { label: 'Location', value: `Suite ${pro.suite} · ${pro.location}` },
              ].map(d => (
                <div key={d.label} className="flex justify-between text-sm">
                  <span className="text-slate-400">{d.label}</span>
                  <span className="text-white font-medium">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-slate-500 text-sm mb-6">A confirmation has been sent to your phone and email.</p>
          <div className="flex gap-3">
            <Link href="/" className="flex-1 glass border border-white/20 text-white py-3 rounded-xl text-sm font-semibold text-center hover:bg-white/5 transition-colors">
              Back to Home
            </Link>
            <button className="flex-1 btn-brand py-3 text-sm">Add to Calendar</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <div className="pt-20 pb-16 max-w-2xl mx-auto px-4">
        {/* Progress */}
        <div className="py-6">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'glass border border-white/20 text-slate-500'}`}>
                  {i < step ? <CheckCircle size={14} /> : i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${i === step ? 'text-white font-semibold' : 'text-slate-500'}`}>{s}</span>
                {i < STEPS.length - 1 && <div className="w-8 sm:w-16 h-px bg-white/10 ml-1"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Pro mini header */}
        <div className="glass rounded-xl p-3 border border-white/10 mb-6 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pro.avatar} alt={pro.name} className="w-10 h-10 rounded-xl object-cover bg-slate-700" />
          <div>
            <p className="text-white font-semibold text-sm">{pro.name}</p>
            <p className="text-slate-400 text-xs">{pro.specialty}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-white font-bold text-sm">{pro.price}</p>
          </div>
        </div>

        {/* Step content */}
        <div className="glass rounded-2xl border border-white/10 p-6">
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-5">Choose a Service</h2>
              <div className="space-y-2">
                {pro.services.map(s => (
                  <button key={s} onClick={() => setSelectedService(s)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${selectedService === s ? 'border-pink-500/50 bg-pink-500/10' : 'glass border-white/10 hover:border-white/20'}`}>
                    <div>
                      <p className="text-white font-semibold text-sm">{s}</p>
                      <p className="text-slate-400 text-xs mt-0.5">60-90 min · {pro.price}</p>
                    </div>
                    {selectedService === s && <CheckCircle size={18} className="text-pink-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-5">Pick Date & Time</h2>
              {/* Week calendar */}
              <div className="grid grid-cols-7 gap-1 mb-5">
                {weekDays.map(day => (
                  <button key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={`flex flex-col items-center py-2.5 rounded-xl transition-all ${format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') ? 'bg-gradient-to-b from-purple-600 to-pink-600 text-white' : 'glass border border-white/10 text-slate-400 hover:text-white'}`}>
                    <span className="text-xs uppercase">{format(day, 'EEE')}</span>
                    <span className="font-bold mt-0.5">{format(day, 'd')}</span>
                  </button>
                ))}
              </div>
              {/* Time slots */}
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map(slot => (
                  <button key={slot} onClick={() => setSelectedTime(slot)}
                    className={`py-2 rounded-xl text-xs font-medium transition-all ${selectedTime === slot ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'glass border border-white/10 text-slate-400 hover:text-white hover:border-white/20'}`}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-5">Your Details</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">First Name</label>
                    <input placeholder="Your name" className="w-full glass border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500/50 bg-transparent placeholder-slate-600" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Last Name</label>
                    <input placeholder="Last name" className="w-full glass border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500/50 bg-transparent placeholder-slate-600" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Phone (for reminders)</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" className="w-full glass border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500/50 bg-transparent placeholder-slate-600" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Email (for confirmation)</label>
                  <input type="email" placeholder="you@email.com" className="w-full glass border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500/50 bg-transparent placeholder-slate-600" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Notes (optional)</label>
                  <textarea placeholder="Any special requests or notes for the stylist..." rows={3}
                    className="w-full glass border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-pink-500/50 bg-transparent placeholder-slate-600 resize-none" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-5">Confirm Booking</h2>
              <div className="space-y-3 mb-6">
                {[
                  { icon: Calendar, label: 'Service', value: selectedService },
                  { icon: Calendar, label: 'Date', value: format(selectedDate, 'EEEE, MMMM d, yyyy') },
                  { icon: Clock, label: 'Time', value: selectedTime || '3:00 PM' },
                  { icon: CreditCard, label: 'Price', value: `${pro.price} (pay at appointment)` },
                ].map(d => (
                  <div key={d.label} className="glass rounded-xl p-3 border border-white/10 flex items-center gap-3">
                    <d.icon size={16} className="text-pink-400" />
                    <div className="flex-1 flex justify-between text-sm">
                      <span className="text-slate-400">{d.label}</span>
                      <span className="text-white font-medium">{d.value}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="glass rounded-xl p-3 border border-amber-500/20 bg-amber-500/5 text-xs text-amber-300 mb-4">
                ⏰ Free cancellation up to 24 hours before your appointment
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-1.5 glass border border-white/20 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-white/5 transition-colors">
                <ChevronLeft size={16} /> Back
              </button>
            )}
            <button
              onClick={() => step < 3 ? setStep(s => s + 1) : setConfirmed(true)}
              className="flex-1 btn-brand py-3 text-sm font-bold flex items-center justify-center gap-2">
              {step < 3 ? <>Continue <ChevronRight size={16} /></> : '✓ Confirm Booking'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


