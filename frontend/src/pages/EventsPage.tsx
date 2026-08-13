import { useEffect, useState } from 'react'
import api from '../services/api'
import Navbar from '../components/Navbar'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import axios from 'axios'
import type { EventSummary } from '../types/event'
import { Toast } from '../components/Toast'
import EventCard from '../components/EventCard'

export default function EventsPage() {
  const [events, setEvents] = useState<EventSummary[]>([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [actionTargetId, setActionTargetId] = useState<number | null>(null)
  const [toast, setToast] = useState<{
      message: string
      type: 'success' | 'error'
    } | null>(null)
  const { user, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()


  useEffect(() => {
    let isMounted = true
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events')
        if (isMounted) {
           setEvents(response.data)
        }
        
      } catch {
        if (isMounted) {
           setError('Failed to fetch events')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
        
      }
    }
    fetchEvents()
    return () => {
      isMounted = false
    } 
  }, [])

  const handleEvents = async (eventId: number, e: React.MouseEvent) => {
    e.preventDefault()
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    try {
      await api.post(`/events/${eventId}/join`)
      setEvents(prev => prev.map(ev =>
        ev.id === eventId
          ? { ...ev, participants: [...ev.participants, { userId: user!.id }] }
          : ev
      ))
    } catch (error) {
      if (axios.isAxiosError(error)) {
       setToast({ message: error.response?.data?.message || 'Failed to join', type: 'error'})
      }
    }
  }

  const handleLeave = async (eventId: number, e: React.MouseEvent) => {
    e.preventDefault()
    setActionTargetId(eventId)
    try {
      await api.post(`/events/${eventId}/leave`)
      setEvents(prev => prev.map(ev =>
        ev.id === eventId
          ? { ...ev, participants: ev.participants.filter(p => p.userId !== user!.id) }
          : ev
      ))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setToast({
          message: error.response?.data?.message || 'Failed to leave',
          type: 'error',
        })
      }
    } finally {
      setActionTargetId(null)
    }
  }

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    )
  if (error)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    )

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* заголовок + search */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-mist-950">
            {' '}
            Discover Events
          </h1>
          <p className="text-mist-500 mt-2">
            Find and join exciting events happening around you
          </p>
          <div className="relative w-full max-w-md mt-7">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2"
            />
          </div>
        </div>

        {/* картки */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isPending={actionTargetId === event.id}
              onJoin={handleEvents}
              onLeave={handleLeave}
            />
          ))}
        </div>
      </div>
    </div>
  )
}