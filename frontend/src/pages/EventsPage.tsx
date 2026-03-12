import { useEffect, useState } from 'react'
import api from '../services/api'
import Navbar from '../components/Navbar'
import { Search, Calendar, Clock, MapPin, Users } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import axios from 'axios'

interface Event {
  id: number
  title: string
  description: string
  date: string
  location: string
  capacity: number | null
  visibility: string
  organizer: { id: number; name: string }
  participants: { userId: number }[]
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
    const [joining, setJoining] = useState(false)


  const { user, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events')
        setEvents(response.data)
      } catch {
        setError('Failed to fetch events')
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const handleEvents = async (eventId: number, e: React.MouseEvent) => {
    e.preventDefault()

    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    await api.post(`/events/${eventId}/join`)
    const response = await api.get('/events')
    setEvents(response.data)
  }

  const handleLeave = async (eventId: number, e: React.MouseEvent) => {
    e.preventDefault()
    setJoining(true)
    try {
      await api.post(`/events/${eventId}/leave`)
      const response = await api.get(`/events`)
      setEvents(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || 'Failed to leave')
      }
    } finally {
      setJoining(false)
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
        {/* </div>   */}

        {/* картки */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-3 group cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-indigo-600">
                {event.title}
              </h3>
              <p className="text-neutral-500 text-sm">{event.description}</p>

              <div className="flex flex-col gap-2 text-sm text-neutral-500">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>
                    {new Date(event.date).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span>
                    {event.participants.length} / {event.capacity ?? '∞'}{' '}
                    participants
                  </span>
                </div>
              </div>
              <hr className="border-gray-200" />
              {(() => {
                const isParticipant =
                  user && event.participants.some((p) => p.userId === user.id)
                const isFull = event.capacity
                  ? event.participants.length >= event.capacity
                  : false

                if (isParticipant) {
                  return (
                    <div className="flex items-center gap-3 mt-auto ">
                      <button
                        onClick={(e) => handleLeave(event.id, e)}
                        disabled={joining}
                        className="w-full bg-red-400 text-white py-2 rounded-lg cursor-pointer hover:bg-red-300"
                      >
                        Leave
                      </button>
                      <button className="w-full bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed">
                        Already joined
                      </button>
                    </div>
                  )
                }

                if (isFull) {
                  return (
                    <button
                      disabled
                      className="w-full bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed"
                    >
                      Event Full
                    </button>
                  )
                }
                return (
                  <button
                    onClick={(e) => handleEvents(event.id, e)}
                    className="cursor-pointer mt-auto w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                  >
                    Join Event
                  </button>
                )
              })()}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
