import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'

export default function EditEventPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [capacity, setCapacity] = useState('')
  const [visibility, setVisibility] = useState('public')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`)
        const ev = response.data
        const d = new Date(ev.date)

        setTitle(ev.title)
        setDescription(ev.description)
        setDate(d.toISOString().split('T')[0]) 
        setTime(d.toTimeString().slice(0, 5))
        setLocation(ev.location)
        setCapacity(ev.capacity ? String(ev.capacity) : '')
        setVisibility(ev.visibility)
      } catch {
        setError('Failed to load event')
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const eventDate = new Date(`${date}T${time}`)
    if (eventDate < new Date()) {
      setError('Cannot set event in the past')
      return
    }

    setSubmitting(true)
    try {
      await api.patch(`/events/${id}`, {
        title,
        description,
        date: eventDate.toISOString(),
        location,
        capacity: capacity ? Number(capacity) : null,
        visibility,
      })
      navigate(`/events/${id}`)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to update event')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-8 bg-slate-100 mt-8 rounded-lg">
        <Link
          to={`/events/${id}`}
          className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 mb-6"
        >
          <ArrowLeft size={16} /> Back
        </Link>

        <form onSubmit={handleSubmit}>
          <div className="max-w-2xl p-5 bg-neutral-50 rounded-lg border border-slate-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-1 ml-8">Edit event</h2>
            <p className="text-gray-500 mb-6">Update the details of your event</p>

            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>
            )}

            {/* Title */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm font-medium text-gray-700">
                Event Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Date <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 mt-2 border border-gray-300 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="flex-1 outline-none bg-transparent"
                    required
                  />
                  <Calendar size={18} className="text-gray-400 shrink-0" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Time <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 mt-2 border border-gray-300 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="flex-1 outline-none bg-transparent"
                    required
                  />
                  <Clock size={18} className="text-gray-400 shrink-0" />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm font-medium text-gray-700">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Capacity */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm font-medium text-gray-700">
                Capacity <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Visibility */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm font-medium text-gray-700">Visibility</label>
              <label className="flex items-center gap-3 cursor-pointer mt-2">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={visibility === 'public'}
                  onChange={(e) => setVisibility(e.target.value)}
                  className="w-4 h-4 accent-indigo-600"
                />
                <span className="text-sm text-gray-500">Public — Anyone can see and join</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer mt-2">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={visibility === 'private'}
                  onChange={(e) => setVisibility(e.target.value)}
                  className="w-4 h-4 accent-indigo-600"
                />
                <span className="text-sm text-gray-500">Private — Only invited people</span>
              </label>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => navigate(`/events/${id}`)}
                className="bg-gray-200 text-gray-500 hover:bg-red-500 hover:text-white cursor-pointer py-2 rounded-lg border border-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="cursor-pointer py-2 bg-indigo-600 text-white px-4 rounded-lg hover:bg-green-500 disabled:opacity-50"
              >
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
