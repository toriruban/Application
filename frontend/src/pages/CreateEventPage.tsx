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
  const navigate = useNavigate()

  const handleCreateEvent = async (formData: EventFormData) => {
    setError('')

    try {
      const response = await api.post('/events', formData)
      navigate(`/events/${response.data.id}`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Failed to create event')
      } else {
        setError('An unexpected error occurred')
      }
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
        
          <div className='flex justify-center'>
            <EventFormFields onSubmit={handleCreateEvent} />
          </div>
        </div>
      </div>
    )
  }
