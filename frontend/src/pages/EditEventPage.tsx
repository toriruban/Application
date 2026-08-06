import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { ArrowLeft } from 'lucide-react'
import EventFormFields, { type EventFormData } from '../components/EventFormFields'

export default function EditEventPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<EventFormData>()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get<EventFormData>(`/events/${id}`)
        const event = response.data
        const d = new Date(event.date)

        setFormData({
          title: event.title || '',
          description: event.description || '',
          date: d.toISOString().split('T')[0],
          time: d.toTimeString().slice(0, 5),
          location: event.location || '',
          capacity: event.capacity ? Number(event.capacity) : null,
          visibility: event.visibility === 'public' ? 'private' : 'public'
        })
      } catch {
        setError('Failed to load event data')
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [id])

  const handleEditEvent = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData) return
    setError('')
    setLoading(true)

    const eventDate = new Date(`${formData.date}T${formData.time}`)
    if (eventDate < new Date()) {
      setError('Cannot create event in the past')
      setLoading(false)
      return
    }

    setSubmitting(true)
    try {
      await api.patch(`/events/${id}`, {
        ...formData,
        date: eventDate.toISOString(),
      })      
      navigate(`/events/${id}`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Failed to update event')
      } else {
        setError('An unexpected error occurred')
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

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleEditEvent}>
          <div className="max-w-2xl p-5 bg-neutral-50 rounded-lg border border-slate-200 mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-1 ml-8">
              Edit Event
            </h2>
            <p className="text-gray-500 mb-6">Edit the details of event</p>

            <EventFormFields initialData={formData} onChange={setFormData}/>

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
