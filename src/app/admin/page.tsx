'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  Users, Briefcase, Calendar, Wrench, Trash2, Edit2, Plus,
  X, Check, RefreshCw, ShieldAlert, ChevronDown, ChevronUp, Search,
  Upload, Download, AlertCircle, CheckCircle2
} from 'lucide-react'

type Tab = 'users' | 'profiles' | 'bookings' | 'services' | 'bulk'

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: 'users', label: 'Users', icon: Users },
  { id: 'profiles', label: 'Pro Profiles', icon: Briefcase },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
  { id: 'services', label: 'Services', icon: Wrench },
  { id: 'bulk', label: 'Bulk Import', icon: Upload },
]

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
      <div className="w-full max-w-lg rounded-2xl border border-white/10 p-6" style={{ background: '#1a1a2e' }}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-bold text-lg">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', options }: {
  label: string; value: any; onChange: (v: any) => void; type?: string; options?: string[]
}) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      {options ? (
        <select value={value ?? ''} onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-purple-500">
          <option value="">— select —</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === 'boolean' ? (
        <div className="flex items-center gap-3 mt-1">
          <button type="button"
            onClick={() => onChange(true)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${value === true ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'border-white/10 text-gray-500'}`}>
            True
          </button>
          <button type="button"
            onClick={() => onChange(false)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${value === false ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'border-white/10 text-gray-500'}`}>
            False
          </button>
        </div>
      ) : (
        <input type={type} value={value ?? ''} onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500" />
      )}
    </div>
  )
}

// ── USERS TAB ──────────────────────────────────────────────────
function UsersTab() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [editUser, setEditUser] = useState<any>(null)
  const [newUser, setNewUser] = useState(false)
  const [form, setForm] = useState<any>({})
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const r = await fetch('/api/admin/users')
    if (r.ok) setUsers((await r.json()).users)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const save = async () => {
    setSaving(true)
    if (editUser) {
      await fetch(`/api/admin/users/${editUser.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    } else {
      await fetch('/api/admin/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    setSaving(false); setEditUser(null); setNewUser(false); setForm({}); load()
  }

  const del = async (id: string) => {
    await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
    setConfirmDelete(null); load()
  }

  const filtered = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.name || '').toLowerCase().includes(search.toLowerCase())
  )

  const roleColor = (r: string) => ({
    ADMIN: 'bg-red-500/15 text-red-400 border-red-500/20',
    PRO: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
    CUSTOMER: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  }[r] ?? 'bg-gray-500/15 text-gray-400')

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500" />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={load} className="p-2 rounded-xl border border-white/10 text-gray-400 hover:text-white transition"><RefreshCw size={15} /></button>
          <button onClick={() => { setForm({ role: 'CUSTOMER' }); setNewUser(true) }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-white border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 transition">
            <Plus size={14} /> Add User
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="text-left px-4 py-3 font-medium">Email</th>
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Role</th>
                <th className="text-left px-4 py-3 font-medium">Pro Profile</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3 text-white font-mono text-xs">{u.email}</td>
                  <td className="px-4 py-3 text-gray-300">{u.name || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${roleColor(u.role)}`}>{u.role}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{u.proProfile?.businessName || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => { setEditUser(u); setForm({ name: u.name, email: u.email, role: u.role }) }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"><Edit2 size={13} /></button>
                      <button onClick={() => setConfirmDelete(u.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-gray-600">No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {(editUser || newUser) && (
        <Modal title={editUser ? `Edit: ${editUser.email}` : 'New User'} onClose={() => { setEditUser(null); setNewUser(false); setForm({}) }}>
          <div className="space-y-4">
            <Field label="Email" value={form.email} onChange={v => setForm({ ...form, email: v })} type="email" />
            <Field label="Name" value={form.name} onChange={v => setForm({ ...form, name: v })} />
            <Field label="Role" value={form.role} onChange={v => setForm({ ...form, role: v })} options={['CUSTOMER', 'PRO', 'ADMIN']} />
            <Field label="Password (leave blank to keep)" value={form.password} onChange={v => setForm({ ...form, password: v })} type="password" />
            <div className="flex gap-3 pt-2">
              <button onClick={() => { setEditUser(null); setNewUser(false); setForm({}) }}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white text-sm transition">Cancel</button>
              <button onClick={save} disabled={saving}
                className="flex-1 py-2.5 rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition"
                style={{ background: 'linear-gradient(135deg,#667eea,#ec4899)' }}>
                {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Check size={14} /> Save</>}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {confirmDelete && (
        <Modal title="Delete User?" onClose={() => setConfirmDelete(null)}>
          <p className="text-gray-400 text-sm mb-5">This will permanently delete the user and all associated data. This cannot be undone.</p>
          <div className="flex gap-3">
            <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm">Cancel</button>
            <button onClick={() => del(confirmDelete)} className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/30 transition">Delete</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ── PRO PROFILES TAB ──────────────────────────────────────────
function ProfilesTab() {
  const [profiles, setProfiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editItem, setEditItem] = useState<any>(null)
  const [form, setForm] = useState<any>({})
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const r = await fetch('/api/admin/profiles')
    if (r.ok) setProfiles((await r.json()).profiles)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const save = async () => {
    setSaving(true)
    await fetch(`/api/admin/profiles/${editItem.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setSaving(false); setEditItem(null); setForm({}); load()
  }

  const del = async (id: string) => {
    await fetch(`/api/admin/profiles/${id}`, { method: 'DELETE' })
    setConfirmDelete(null); load()
  }

  const filtered = profiles.filter(p =>
    p.businessName.toLowerCase().includes(search.toLowerCase()) ||
    p.user.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search profiles..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500" />
        </div>
        <button onClick={load} className="p-2 rounded-xl border border-white/10 text-gray-400 hover:text-white transition"><RefreshCw size={15} /></button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="text-left px-4 py-3 font-medium">Business</th>
                <th className="text-left px-4 py-3 font-medium">Owner</th>
                <th className="text-left px-4 py-3 font-medium">Specialty</th>
                <th className="text-left px-4 py-3 font-medium">Plan</th>
                <th className="text-left px-4 py-3 font-medium">Bookings</th>
                <th className="text-left px-4 py-3 font-medium">Active</th>
                <th className="text-left px-4 py-3 font-medium">Verified</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{p.businessName}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{p.user.email}</td>
                  <td className="px-4 py-3 text-gray-300">{p.specialty || '—'}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/20">{p.planTier}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{p._count.bookings}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${p.isActive ? 'text-emerald-400' : 'text-red-400'}`}>{p.isActive ? '✓' : '✗'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${p.isVerified ? 'text-blue-400' : 'text-gray-600'}`}>{p.isVerified ? '✓' : '✗'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => { setEditItem(p); setForm({ businessName: p.businessName, specialty: p.specialty, location: p.location, bio: p.bio, phone: p.phone, planTier: p.planTier, isActive: p.isActive, isVerified: p.isVerified }) }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"><Edit2 size={13} /></button>
                      <button onClick={() => setConfirmDelete(p.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-10 text-center text-gray-600">No profiles found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editItem && (
        <Modal title={`Edit: ${editItem.businessName}`} onClose={() => { setEditItem(null); setForm({}) }}>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            <Field label="Business Name" value={form.businessName} onChange={v => setForm({ ...form, businessName: v })} />
            <Field label="Specialty" value={form.specialty} onChange={v => setForm({ ...form, specialty: v })} />
            <Field label="Location" value={form.location} onChange={v => setForm({ ...form, location: v })} />
            <Field label="Bio" value={form.bio} onChange={v => setForm({ ...form, bio: v })} />
            <Field label="Phone" value={form.phone} onChange={v => setForm({ ...form, phone: v })} />
            <Field label="Plan Tier" value={form.planTier} onChange={v => setForm({ ...form, planTier: v })} options={['starter', 'pro', 'elite']} />
            <Field label="Active" value={form.isActive} onChange={v => setForm({ ...form, isActive: v })} type="boolean" />
            <Field label="Verified" value={form.isVerified} onChange={v => setForm({ ...form, isVerified: v })} type="boolean" />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={() => { setEditItem(null); setForm({}) }} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm">Cancel</button>
            <button onClick={save} disabled={saving}
              className="flex-1 py-2.5 rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg,#667eea,#ec4899)' }}>
              {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Check size={14} /> Save</>}
            </button>
          </div>
        </Modal>
      )}

      {confirmDelete && (
        <Modal title="Delete Profile?" onClose={() => setConfirmDelete(null)}>
          <p className="text-gray-400 text-sm mb-5">This will delete the pro profile and all their services. Bookings will be blocked.</p>
          <div className="flex gap-3">
            <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm">Cancel</button>
            <button onClick={() => del(confirmDelete)} className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-medium">Delete</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ── BOOKINGS TAB ──────────────────────────────────────────────
function BookingsTab() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [editItem, setEditItem] = useState<any>(null)
  const [form, setForm] = useState<any>({})
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const r = await fetch('/api/admin/bookings')
    if (r.ok) setBookings((await r.json()).bookings)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const save = async () => {
    setSaving(true)
    await fetch(`/api/admin/bookings/${editItem.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setSaving(false); setEditItem(null); setForm({}); load()
  }

  const del = async (id: string) => {
    await fetch(`/api/admin/bookings/${id}`, { method: 'DELETE' })
    setConfirmDelete(null); load()
  }

  const statusColor = (s: string) => ({
    CONFIRMED: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    PENDING: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    COMPLETED: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    CANCELLED: 'bg-red-500/15 text-red-400 border-red-500/20',
  }[s] ?? 'bg-gray-500/15 text-gray-400')

  const filtered = bookings.filter(b =>
    (b.customer?.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (b.pro?.businessName || '').toLowerCase().includes(search.toLowerCase()) ||
    (b.service?.name || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bookings..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500" />
        </div>
        <button onClick={load} className="p-2 rounded-xl border border-white/10 text-gray-400 hover:text-white transition"><RefreshCw size={15} /></button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="text-left px-4 py-3 font-medium">Customer</th>
                <th className="text-left px-4 py-3 font-medium">Pro</th>
                <th className="text-left px-4 py-3 font-medium">Service</th>
                <th className="text-left px-4 py-3 font-medium">Date</th>
                <th className="text-left px-4 py-3 font-medium">Amount</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-600">No bookings yet</td></tr>
              ) : filtered.map(b => (
                <tr key={b.id} className="hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3 text-white text-xs">{b.customer?.name || b.customer?.email}</td>
                  <td className="px-4 py-3 text-gray-300">{b.pro?.businessName}</td>
                  <td className="px-4 py-3 text-gray-400">{b.service?.name}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{new Date(b.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-white font-medium">${b.totalAmount}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColor(b.status)}`}>{b.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => { setEditItem(b); setForm({ status: b.status, notes: b.notes }) }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"><Edit2 size={13} /></button>
                      <button onClick={() => setConfirmDelete(b.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editItem && (
        <Modal title="Edit Booking" onClose={() => { setEditItem(null); setForm({}) }}>
          <div className="space-y-4">
            <Field label="Status" value={form.status} onChange={v => setForm({ ...form, status: v })} options={['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']} />
            <Field label="Notes" value={form.notes} onChange={v => setForm({ ...form, notes: v })} />
            <Field label="Cancel Reason" value={form.cancelReason} onChange={v => setForm({ ...form, cancelReason: v })} />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={() => { setEditItem(null); setForm({}) }} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm">Cancel</button>
            <button onClick={save} disabled={saving}
              className="flex-1 py-2.5 rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg,#667eea,#ec4899)' }}>
              {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Check size={14} /> Save</>}
            </button>
          </div>
        </Modal>
      )}

      {confirmDelete && (
        <Modal title="Delete Booking?" onClose={() => setConfirmDelete(null)}>
          <p className="text-gray-400 text-sm mb-5">Permanently delete this booking record.</p>
          <div className="flex gap-3">
            <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm">Cancel</button>
            <button onClick={() => del(confirmDelete)} className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-medium">Delete</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ── SERVICES TAB ──────────────────────────────────────────────
function ServicesTab() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [editItem, setEditItem] = useState<any>(null)
  const [newItem, setNewItem] = useState(false)
  const [form, setForm] = useState<any>({})
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [pros, setPros] = useState<any[]>([])

  const load = useCallback(async () => {
    setLoading(true)
    const [sr, pr] = await Promise.all([fetch('/api/admin/services'), fetch('/api/admin/profiles')])
    if (sr.ok) setServices((await sr.json()).services)
    if (pr.ok) setPros((await pr.json()).profiles)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const save = async () => {
    setSaving(true)
    if (editItem) {
      await fetch(`/api/admin/services/${editItem.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, price: parseFloat(form.price), duration: parseInt(form.duration) }) })
    } else {
      await fetch('/api/admin/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, price: parseFloat(form.price), duration: parseInt(form.duration), isActive: true }) })
    }
    setSaving(false); setEditItem(null); setNewItem(false); setForm({}); load()
  }

  const del = async (id: string) => {
    await fetch(`/api/admin/services/${id}`, { method: 'DELETE' })
    setConfirmDelete(null); load()
  }

  const filtered = services.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    (s.pro?.businessName || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search services..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500" />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={load} className="p-2 rounded-xl border border-white/10 text-gray-400 hover:text-white transition"><RefreshCw size={15} /></button>
          <button onClick={() => { setForm({ isActive: true }); setNewItem(true) }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-white border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 transition">
            <Plus size={14} /> Add Service
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="text-left px-4 py-3 font-medium">Service</th>
                <th className="text-left px-4 py-3 font-medium">Pro</th>
                <th className="text-left px-4 py-3 font-medium">Category</th>
                <th className="text-left px-4 py-3 font-medium">Price</th>
                <th className="text-left px-4 py-3 font-medium">Duration</th>
                <th className="text-left px-4 py-3 font-medium">Active</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-600">No services yet — add one above</td></tr>
              ) : filtered.map(s => (
                <tr key={s.id} className="hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{s.name}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{s.pro?.businessName}</td>
                  <td className="px-4 py-3 text-gray-400">{s.category || '—'}</td>
                  <td className="px-4 py-3 text-white">${s.price}</td>
                  <td className="px-4 py-3 text-gray-400">{s.duration} min</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${s.isActive ? 'text-emerald-400' : 'text-red-400'}`}>{s.isActive ? '✓' : '✗'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => { setEditItem(s); setForm({ name: s.name, description: s.description, category: s.category, price: s.price, duration: s.duration, isActive: s.isActive }) }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"><Edit2 size={13} /></button>
                      <button onClick={() => setConfirmDelete(s.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(editItem || newItem) && (
        <Modal title={editItem ? `Edit: ${editItem.name}` : 'New Service'} onClose={() => { setEditItem(null); setNewItem(false); setForm({}) }}>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {newItem && (
              <div>
                <label className="block text-sm text-gray-400 mb-1">Pro Profile</label>
                <select value={form.proId ?? ''} onChange={e => setForm({ ...form, proId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-purple-500">
                  <option value="">— select pro —</option>
                  {pros.map(p => <option key={p.id} value={p.id}>{p.businessName}</option>)}
                </select>
              </div>
            )}
            <Field label="Service Name" value={form.name} onChange={v => setForm({ ...form, name: v })} />
            <Field label="Description" value={form.description} onChange={v => setForm({ ...form, description: v })} />
            <Field label="Category" value={form.category} onChange={v => setForm({ ...form, category: v })} options={['Hair', 'Nails', 'Skin', 'Massage', 'Makeup', 'Brows', 'Lashes', 'Other']} />
            <Field label="Price ($)" value={form.price} onChange={v => setForm({ ...form, price: v })} type="number" />
            <Field label="Duration (minutes)" value={form.duration} onChange={v => setForm({ ...form, duration: v })} type="number" />
            <Field label="Active" value={form.isActive} onChange={v => setForm({ ...form, isActive: v })} type="boolean" />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={() => { setEditItem(null); setNewItem(false); setForm({}) }} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm">Cancel</button>
            <button onClick={save} disabled={saving}
              className="flex-1 py-2.5 rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg,#667eea,#ec4899)' }}>
              {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Check size={14} /> Save</>}
            </button>
          </div>
        </Modal>
      )}

      {confirmDelete && (
        <Modal title="Delete Service?" onClose={() => setConfirmDelete(null)}>
          <p className="text-gray-400 text-sm mb-5">This will permanently delete this service.</p>
          <div className="flex gap-3">
            <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm">Cancel</button>
            <button onClick={() => del(confirmDelete)} className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-medium">Delete</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ── BULK IMPORT TAB ──────────────────────────────────────────
const CSV_TEMPLATE = `email,name,role,password,businessName,specialty,location
jane@example.com,Jane Smith,CUSTOMER,MyPass123,,, 
studio@example.com,Glow Studio,PRO,MyPass123,Glow Studio,Hair,New York
`

type ParsedUser = { email: string; name: string; role: string; password: string; businessName: string; specialty: string; location: string; _error?: string }

function BulkImportTab() {
  const [csvText, setCsvText] = useState('')
  const [parsed, setParsed] = useState<ParsedUser[]>([])
  const [parseError, setParseError] = useState('')
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<{ created: number; skipped: number; errors: string[] } | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const parseCSV = (text: string) => {
    setParseError('')
    setResult(null)
    const lines = text.trim().split('\n').filter(l => l.trim())
    if (lines.length < 2) { setParseError('CSV must have a header row and at least one data row'); setParsed([]); return }

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
    const emailIdx = headers.indexOf('email')
    if (emailIdx === -1) { setParseError('CSV must have an "email" column'); setParsed([]); return }

    const nameIdx = headers.indexOf('name')
    const roleIdx = headers.indexOf('role')
    const passIdx = headers.indexOf('password')
    const bizIdx = headers.indexOf('businessname')
    const specIdx = headers.indexOf('specialty')
    const locIdx = headers.indexOf('location')

    const rows: ParsedUser[] = []
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map(c => c.trim())
      const email = cols[emailIdx] || ''
      const role = cols[roleIdx]?.toUpperCase() || 'CUSTOMER'
      const _error = !email.includes('@') ? 'Invalid email' :
        !['CUSTOMER', 'PRO', 'ADMIN'].includes(role) ? `Invalid role "${role}"` : ''
      rows.push({
        email,
        name: nameIdx >= 0 ? cols[nameIdx] || '' : '',
        role: ['CUSTOMER', 'PRO', 'ADMIN'].includes(role) ? role : 'CUSTOMER',
        password: passIdx >= 0 ? cols[passIdx] || '' : '',
        businessName: bizIdx >= 0 ? cols[bizIdx] || '' : '',
        specialty: specIdx >= 0 ? cols[specIdx] || '' : '',
        location: locIdx >= 0 ? cols[locIdx] || '' : '',
        _error,
      })
    }
    setParsed(rows)
  }

  const handleFile = (file: File) => {
    if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
      setParseError('Please upload a .csv file'); return
    }
    const reader = new FileReader()
    reader.onload = e => {
      const text = e.target?.result as string
      setCsvText(text)
      parseCSV(text)
    }
    reader.readAsText(file)
  }

  const importUsers = async () => {
    const valid = parsed.filter(r => !r._error)
    if (!valid.length) return
    setImporting(true)
    setResult(null)
    try {
      const res = await fetch('/api/admin/users/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users: valid }),
      })
      const data = await res.json()
      setResult(data)
      if (data.created > 0) { setCsvText(''); setParsed([]) }
    } catch (e) {
      setResult({ created: 0, skipped: 0, errors: ['Network error — please try again'] })
    } finally {
      setImporting(false)
    }
  }

  const downloadTemplate = () => {
    const blob = new Blob([CSV_TEMPLATE], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'glowly-users-template.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const validCount = parsed.filter(r => !r._error).length
  const errorCount = parsed.filter(r => r._error).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-white font-bold text-lg">Bulk User Import</h2>
          <p className="text-gray-500 text-sm mt-0.5">Upload a CSV to create hundreds of users at once. Max 500 per batch.</p>
        </div>
        <button onClick={downloadTemplate}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-300 text-sm hover:text-white hover:border-white/20 transition">
          <Download size={14} /> Download Template
        </button>
      </div>

      {/* Format guide */}
      <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
        <p className="text-blue-300 text-sm font-medium mb-2">📋 CSV Format</p>
        <div className="font-mono text-xs text-blue-200/70 space-y-0.5">
          <p>Required: <span className="text-white">email</span></p>
          <p>Optional: <span className="text-white">name, role (CUSTOMER/PRO/ADMIN), password, businessName, specialty, location</span></p>
          <p className="text-blue-300/50 mt-1">• Existing emails are skipped (no overwrite)</p>
          <p className="text-blue-300/50">• Default role: CUSTOMER · Default password: Glowly2026!</p>
          <p className="text-blue-300/50">• PRO users get a ProProfile auto-created</p>
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${dragOver ? 'border-purple-500 bg-purple-500/10' : 'border-white/15 hover:border-white/25'}`}>
        <Upload size={28} className="mx-auto mb-3 text-gray-500" />
        <p className="text-white font-medium mb-1">Drop your CSV file here</p>
        <p className="text-gray-500 text-sm mb-4">or click to browse</p>
        <input type="file" accept=".csv,text/csv" className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
        <button className="px-4 py-2 rounded-xl border border-white/10 text-gray-300 text-sm hover:text-white transition pointer-events-none">
          Choose File
        </button>
      </div>

      {/* Or paste CSV */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">Or paste CSV text directly</label>
        <textarea
          value={csvText}
          onChange={e => { setCsvText(e.target.value); if (e.target.value) parseCSV(e.target.value) }}
          placeholder="email,name,role\njane@example.com,Jane,CUSTOMER"
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-mono text-xs placeholder-gray-600 focus:outline-none focus:border-purple-500 resize-none"
        />
        {csvText && (
          <button onClick={() => parseCSV(csvText)}
            className="mt-2 px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 text-sm hover:text-white transition flex items-center gap-1.5">
            <RefreshCw size={13} /> Parse
          </button>
        )}
      </div>

      {parseError && (
        <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm">{parseError}</p>
        </div>
      )}

      {/* Preview table */}
      {parsed.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="text-white font-medium">{parsed.length} rows parsed</span>
              {validCount > 0 && <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">{validCount} valid</span>}
              {errorCount > 0 && <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/20">{errorCount} errors</span>}
            </div>
            <button
              onClick={importUsers}
              disabled={importing || validCount === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium text-sm disabled:opacity-40 transition"
              style={{ background: 'linear-gradient(135deg,#667eea,#ec4899)' }}>
              {importing
                ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Importing...</>
                : <><Upload size={14} /> Import {validCount} Users</>}
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10 max-h-80 overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="sticky top-0" style={{ background: '#1a1a2e' }}>
                <tr className="border-b border-white/10 text-gray-400">
                  <th className="text-left px-3 py-2.5 font-medium w-8">#</th>
                  <th className="text-left px-3 py-2.5 font-medium">Email</th>
                  <th className="text-left px-3 py-2.5 font-medium">Name</th>
                  <th className="text-left px-3 py-2.5 font-medium">Role</th>
                  <th className="text-left px-3 py-2.5 font-medium">Business</th>
                  <th className="text-left px-3 py-2.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {parsed.map((row, i) => (
                  <tr key={i} className={`${row._error ? 'bg-red-500/5' : 'hover:bg-white/3'} transition-colors`}>
                    <td className="px-3 py-2 text-gray-600">{i + 1}</td>
                    <td className="px-3 py-2 text-white font-mono">{row.email}</td>
                    <td className="px-3 py-2 text-gray-300">{row.name || '—'}</td>
                    <td className="px-3 py-2">
                      <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                        row.role === 'ADMIN' ? 'bg-red-500/15 text-red-400' :
                        row.role === 'PRO' ? 'bg-purple-500/15 text-purple-400' :
                        'bg-blue-500/15 text-blue-400'
                      }`}>{row.role}</span>
                    </td>
                    <td className="px-3 py-2 text-gray-400">{row.businessName || '—'}</td>
                    <td className="px-3 py-2">
                      {row._error
                        ? <span className="flex items-center gap-1 text-red-400"><AlertCircle size={11} /> {row._error}</span>
                        : <span className="flex items-center gap-1 text-emerald-400"><CheckCircle2 size={11} /> Ready</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className={`rounded-xl border p-5 ${
          result.errors.length === 0
            ? 'border-emerald-500/20 bg-emerald-500/5'
            : 'border-amber-500/20 bg-amber-500/5'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={16} className={result.errors.length === 0 ? 'text-emerald-400' : 'text-amber-400'} />
            <span className={`font-medium text-sm ${result.errors.length === 0 ? 'text-emerald-300' : 'text-amber-300'}`}>
              Import complete
            </span>
          </div>
          <div className="flex gap-5 text-sm mb-3">
            <span className="text-emerald-400">✓ {result.created} created</span>
            {result.skipped > 0 && <span className="text-gray-400">⤹ {result.skipped} skipped (already exist)</span>}
          </div>
          {result.errors.length > 0 && (
            <div className="space-y-1 mt-2">
              <p className="text-amber-400 text-xs font-medium">Row errors:</p>
              {result.errors.map((e, i) => (
                <p key={i} className="text-amber-300/70 text-xs font-mono">{e}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── MAIN ADMIN PAGE ────────────────────────────────────────────
export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('users')

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login?redirect=/admin')
    if (status === 'authenticated' && (session?.user as any)?.role !== 'ADMIN') router.push('/')
  }, [status, session])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f0f1a' }}>
        <div className="w-10 h-10 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (status === 'authenticated' && (session?.user as any)?.role !== 'ADMIN') return null

  return (
    <div className="min-h-screen" style={{ background: '#0f0f1a' }}>
      {/* Top bar */}
      <div className="border-b border-white/10 sticky top-0 z-40" style={{ background: 'rgba(15,15,26,0.95)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-red-500/20 border border-red-500/30">
              <ShieldAlert size={14} className="text-red-400" />
            </div>
            <span className="text-white font-bold text-sm">Admin Panel</span>
            <span className="text-gray-600 text-xs hidden sm:block">· {session?.user?.email}</span>
          </div>
          <a href="/" className="text-gray-400 hover:text-white text-sm transition">← Back to app</a>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 flex gap-1 pb-0 overflow-x-auto">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                tab === t.id
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}>
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {tab === 'users' && <UsersTab />}
        {tab === 'profiles' && <ProfilesTab />}
        {tab === 'bookings' && <BookingsTab />}
        {tab === 'services' && <ServicesTab />}
        {tab === 'bulk' && <BulkImportTab />}
      </div>
    </div>
  )
}
