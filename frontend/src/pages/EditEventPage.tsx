import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { ArrowLeft } from 'lucide-react'
import EventFormFields from '../components/EventFormFields'

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
            <h2 className="text-2xl font-bold text-gray-900 mb-1 ml-8">
              Edit event
            </h2>
            <p className="text-gray-500 mb-6">
              Update the details of your event
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm mb-6 text-center">
                {error}
              </div>
            )}

            <EventFormFields
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              date={date}
              setDate={setDate}
              time={time}
              setTime={setTime}
              location={location}
              setLocation={setLocation}
              capacity={capacity}
              setCapacity={setCapacity}
              visibility={visibility}
              setVisibility={setVisibility}
            />

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
