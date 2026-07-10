import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import EventFormFields from '../components/EventFormFields'

export default function CreateEventPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [capacity, setCapacity] = useState('')
  const [visibility, setVisibility] = useState('public')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const eventDate = new Date(`${date}T${time}`)
    if (eventDate < new Date()) {
      setError('Cannot create event in the past')
      return
    }

    setLoading(true)
    try {
      const response = await api.post('/events', {
        title,
        description,
        date: eventDate.toISOString(),
        location,
        capacity: capacity ? Number(capacity) : null,
        visibility,
      })
      navigate(`/events/${response.data.id}`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Failed to create event')
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

        <form onSubmit={handleSubmit}>
          <div className="max-w-2xl p-5 bg-neutral-50 rounded-lg border border-slate-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-1 ml-8">
              Create new event
            </h2>
            <p className="text-gray-500 mb-6">
              Fill in the details to create an amazing event
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all font-medium disabled:opacity-50 cursor-pointer flex items-center justify-center"
            >
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}