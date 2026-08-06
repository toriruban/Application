import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import EventFormFields, { type EventFormData } from '../components/EventFormFields'

export default function CreateEventPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [formData, setFormData] = useState<EventFormData | null>(null)
  
  const handleCreateEvent = async (e: React.SubmitEvent<HTMLFormElement>) => {
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

    try {
      const response = await api.post('/events', {
        ...formData,
        date: eventDate.toISOString(),
      })
      navigate(`/events/${response.data.id}`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Failed to create event')
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 py-8 bg-slate-100 mt-8 rounded-lg">
          {/* back button */}
          <Link
            to="/events"
            className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 mb-6"
          >
            <ArrowLeft size={16} /> Back
          </Link>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm mb-6 text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleCreateEvent}>
            <div className="max-w-2xl p-5 bg-neutral-50 rounded-lg border border-slate-200 mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-1 ml-8">
                Create new Event
              </h2>
              <p className="text-gray-500 mb-6">
                Fill in the details to create an amazing event
              </p>

              <EventFormFields onChange={setFormData} />

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all font-medium disabled:opacity-50 cursor-pointer flex items-center justify-center"
              >
                {loading ? 'Creating...' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
