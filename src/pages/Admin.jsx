import { useCallback, useEffect, useState } from 'react'
import { ChevronDown, LogOut, Mail, MessageSquare, RefreshCw, User } from 'lucide-react'
import {
  adminLogin,
  adminLogout,
  getAdminSession,
  getContactRequests,
} from '../api/admin'

function formatDate(iso) {
  return new Intl.DateTimeFormat('it-IT', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso))
}

function ContactRequestItem({ contact, expanded, onToggle }) {
  const preview =
    contact.messaggio.length > 140 ? `${contact.messaggio.slice(0, 140).trim()}…` : contact.messaggio

  return (
    <article
      className={[
        'rounded-2xl border bg-white overflow-hidden transition-[border-color,box-shadow] duration-300',
        expanded ? 'border-primary/30 ring-2 ring-primary/10' : 'border-border',
      ].join(' ')}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="w-full cursor-pointer text-left p-5 hover:bg-surface-muted/50 transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1 space-y-3">
            <p className="text-xs text-muted">{formatDate(contact.createdAt)}</p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-start gap-2 min-w-0">
                <User size={16} className="text-primary shrink-0 mt-0.5" />
                <p className="font-medium text-primary-dark truncate">{contact.nome}</p>
              </div>
              <div className="flex items-start gap-2 min-w-0 sm:col-span-1 lg:col-span-1">
                <Mail size={16} className="text-primary shrink-0 mt-0.5" />
                <a
                  href={`mailto:${contact.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-primary hover:text-effe-dark break-all"
                >
                  {contact.email}
                </a>
              </div>
            </div>
          </div>

          <ChevronDown
            size={18}
            className={[
              'text-muted shrink-0 mt-1 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
              expanded ? 'rotate-180' : 'rotate-0',
            ].join(' ')}
          />
        </div>
      </button>

      <div
        className={[
          'grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] px-5',
          expanded ? 'grid-rows-[0fr] opacity-0 pb-0' : 'grid-rows-[1fr] opacity-100 pb-4',
        ].join(' ')}
      >
        <div className="overflow-hidden min-h-0">
          <div className="flex items-start gap-2">
            <MessageSquare size={16} className="text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted leading-relaxed line-clamp-2">{preview}</p>
          </div>
        </div>
      </div>

      <div
        className={[
          'grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        ].join(' ')}
      >
        <div className="overflow-hidden min-h-0">
          <div
            className={[
              'border-t border-border bg-surface-muted/30 px-5 py-4 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
              expanded ? 'opacity-100 translate-y-0 delay-75' : 'opacity-0 -translate-y-1',
            ].join(' ')}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Messaggio</p>
            <p className="text-sm text-primary-dark leading-relaxed whitespace-pre-wrap">{contact.messaggio}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await adminLogin(email, password)
      onSuccess()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-border bg-white p-8 shadow-sm">
        <div className="mb-8 space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">EFFE2 Admin</p>
          <h1 className="text-2xl font-bold text-primary-dark">Accedi alla dashboard</h1>
          <p className="text-sm text-muted">Visualizza le richieste inviate dal form contatti.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-email" className="block text-sm font-medium text-primary-dark mb-1.5">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              className="w-full px-4 py-3 rounded-xl border border-border text-sm text-primary-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-logo-light"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-primary-dark mb-1.5">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-xl border border-border text-sm text-primary-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-logo-light"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex cursor-pointer items-center justify-center px-6 py-3.5 bg-primary text-white rounded-xl font-medium hover:bg-effe-dark transition-colors disabled:opacity-60"
          >
            {loading ? 'Accesso in corso…' : 'Accedi'}
          </button>
        </form>
      </div>
    </div>
  )
}

function Dashboard({ adminEmail, onLogout }) {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const [expandedId, setExpandedId] = useState(null)

  const loadContacts = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    else setRefreshing(true)
    setError('')
    try {
      const data = await getContactRequests()
      setContacts(data.contacts)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    loadContacts()
  }, [loadContacts])

  const handleLogout = async () => {
    await adminLogout()
    onLogout()
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-white">
        <div className="site-container flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">EFFE2 Admin</p>
            <h1 className="text-2xl font-bold text-primary-dark">Richieste di contatto</h1>
            <p className="text-sm text-muted mt-1">Accesso come {adminEmail}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => loadContacts(true)}
              disabled={refreshing}
              className="inline-flex cursor-pointer items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-white text-sm font-medium text-primary-dark hover:border-primary/30 transition-colors disabled:opacity-60"
            >
              <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
              Aggiorna
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex cursor-pointer items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-effe-dark transition-colors"
            >
              <LogOut size={16} />
              Esci
            </button>
          </div>
        </div>
      </header>

      <main className="site-container py-8">
        {loading ? (
          <p className="text-sm text-muted">Caricamento richieste…</p>
        ) : error ? (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>
        ) : contacts.length === 0 ? (
          <div className="rounded-3xl border border-border bg-white p-10 text-center">
            <MessageSquare size={28} className="mx-auto text-muted mb-3" />
            <p className="font-medium text-primary-dark">Nessuna richiesta per ora</p>
            <p className="text-sm text-muted mt-1">Le richieste inviate da /contattaci compariranno qui.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted mb-4">
              {contacts.length} richieste totali · clicca su una riga per aprire il messaggio
            </p>

            <div className="space-y-3">
              {contacts.map((contact) => (
                <ContactRequestItem
                  key={contact.id}
                  contact={contact}
                  expanded={expandedId === contact.id}
                  onToggle={() =>
                    setExpandedId((current) => (current === contact.id ? null : contact.id))
                  }
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default function Admin() {
  const [session, setSession] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    getAdminSession()
      .then((data) => setSession(data))
      .catch(() => setSession(null))
      .finally(() => setChecking(false))
  }, [])

  if (checking) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <p className="text-sm text-muted">Verifica sessione…</p>
      </div>
    )
  }

  if (!session) {
    return <LoginForm onSuccess={() => getAdminSession().then(setSession)} />
  }

  return <Dashboard adminEmail={session.email} onLogout={() => setSession(null)} />
}
