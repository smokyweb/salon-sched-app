'use client'
import { useState, useEffect } from 'react'
import { Mic, MicOff, Phone, X, ChevronRight } from 'lucide-react'

const AI_MESSAGES = [
  "Hi! I'm your AI booking assistant. How can I help you today?",
  "I can help you book with any of our professionals. What service are you looking for?",
  "Great! I found 3 available stylists near you for a haircut today. Want me to show you options?",
  "Perfect! I've booked you with Ariana Cole for a haircut at 3:00 PM today. You'll receive a confirmation text shortly!",
]

export default function AIVoiceWidget() {
  const [open, setOpen] = useState(false)
  const [listening, setListening] = useState(false)
  const [step, setStep] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  // Typing animation
  useEffect(() => {
    if (!open) return
    const msg = AI_MESSAGES[step]
    setDisplayText('')
    let i = 0
    const timer = setInterval(() => {
      if (i < msg.length) {
        setDisplayText(msg.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 25)
    return () => clearInterval(timer)
  }, [open, step])

  // Cursor blink
  useEffect(() => {
    const t = setInterval(() => setShowCursor(c => !c), 500)
    return () => clearInterval(t)
  }, [])

  function handleMic() {
    setListening(!listening)
    if (!listening) {
      setTimeout(() => {
        setListening(false)
        if (step < AI_MESSAGES.length - 1) setStep(s => s + 1)
      }, 2500)
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full btn-brand shadow-glow ai-pulse flex items-center justify-center transition-all ${open ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Phone size={24} />
      </button>

      {/* Widget */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 glass rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-sm">🤖</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">AI Booking Assistant</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <p className="text-white/70 text-xs">Always available</p>
                </div>
              </div>
            </div>
            <button onClick={() => { setOpen(false); setStep(0) }} className="text-white/60 hover:text-white p-1">
              <X size={16} />
            </button>
          </div>

          {/* Message */}
          <div className="px-4 py-4 min-h-24">
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-slate-200 text-sm leading-relaxed">
                {displayText}{showCursor ? '|' : ''}
              </p>
            </div>

            {/* Quick actions */}
            {step === 0 && (
              <div className="flex flex-col gap-2 mt-3">
                {['Book an appointment', 'Find nearby professionals', 'Check my bookings'].map(action => (
                  <button key={action} onClick={() => setStep(1)}
                    className="flex items-center justify-between text-left px-3 py-2 glass rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-all">
                    {action}
                    <ChevronRight size={14} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Voice input */}
          <div className="px-4 pb-4 flex items-center gap-3">
            <button
              onClick={handleMic}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                listening
                  ? 'bg-red-500 animate-pulse shadow-lg shadow-red-500/50'
                  : 'btn-brand'
              }`}
            >
              {listening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
            <div className="flex-1">
              {listening ? (
                <div className="flex items-center gap-1 h-8">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-pink-400 rounded-full animate-bounce"
                      style={{
                        height: `${Math.random() * 24 + 8}px`,
                        animationDelay: `${i * 0.05}s`
                      }}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">Tap mic to speak...</p>
              )}
            </div>
          </div>

          <div className="px-4 pb-3 text-center">
            <p className="text-slate-600 text-xs">Powered by Glowly AI · Always available</p>
          </div>
        </div>
      )}
    </>
  )
}
