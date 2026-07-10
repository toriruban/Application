import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import api from '../services/api'
import axios from 'axios'
import Navbar from '../components/Navbar'
import DeleteModal from '../components/DeleteModal'
import { Toast } from '../components/Toast'
import ParticipantsList from '../components/ParticipantsList'
import type { EventDetail } from '../types/event'
import EventMetaInfo from '../components/EventMetaInfo'

export default function EventDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuthStore()

  const [event, setEvent] = useState<EventDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [joining, setJoining] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'} | null>(null)


  const isParticipant = event?.participants.some((p) => p.userId === user?.id)
  const isOrganizer = event?.organizerId === user?.id
  const isFull = event?.capacity
    ? event.participants.length >= event.capacity
    : false

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get(`/events/${id}`)
        setEvent(response.data)
      } catch {
        setError('Event not found')
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [id])

  const handleJoin = async () => {
    setJoining(true)
    try {
      await api.post(`/events/${id}/join`)
      const response = await api.get(`/events/${id}`)
      setEvent(response.data)
      setToast({ message: 'Successfully joined the event', type: 'success' })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setToast({
          message: error.response?.data?.message || 'Failed to join',
          type: 'error',
        })
      }
    } finally {
      setJoining(false)
    }
  }

  const handleLeave = async () => {
    setJoining(true)
    try {
      await api.post(`/events/${id}/leave`)
      const response = await api.get(`/events/${id}`)
      setEvent(response.data)
      setToast({ message: 'Successfully left the event', type: 'success' })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setToast({
          message: error.response?.data?.message || 'Failed to leave',
          type: 'error',
        })
      }
    } finally {
      setJoining(false)
    }
  }

  const handleDeleteConfirm = async () => {
     setShowDeleteModal(false)
    try {
      await api.delete(`/events/${id}`)
      setToast({ message: 'Event deleted successfully', type: 'success' })
      setTimeout(() => navigate('/events'), 1500)
    } catch {
      setToast({ message: 'Failed to delete event' , type: 'error'})
    }
  }
  if (loading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )

  if (error || !event)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
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

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 mb-6 cursor-pointer"
        >
          <ArrowLeft size={16} /> Back
        </button>
        {isOrganizer && (
          <div className="flex gap-2 mb-6">
            <Link
              to={`/events/${id}/edit`}
              className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              Edit
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
            >
              Delete
            </button>
          </div>
        )}

        {showDeleteModal && (
          <DeleteModal
            message="Are you sure you want to delete this event?"
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteConfirm}
          />
        )}

        <EventMetaInfo event={event} />

        <p className="text-gray-700 mb-4">{event.description}</p>
        <hr className="border-gray-200 mb-4" />

        {isAuthenticated && !isOrganizer && (
          <ActionButtons
            isParticipant={isParticipant}
            isFull={isFull}
            joining={joining}
            onJoin={handleJoin}
            onLeave={handleLeave}  
           />
        )}

        <ParticipantsList participants={event.participants} />
        </div>
      </div>
  )
}

interface ActionButtonsProps {
  isParticipant: boolean | undefined
  isFull: boolean
  joining: boolean
  onJoin: () => void
  onLeave: () => void
}

const ActionButtons = ({
  isParticipant,
  isFull,
  joining,
  onJoin,
  onLeave,
}: ActionButtonsProps) => {
  return (
    <div className="mb-8">
      {isParticipant ? (
        <button
          onClick={onLeave}
          disabled={joining}
          className="cursor-pointer border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          {joining ? 'Loading' : 'Leave Event'}
        </button>
      ) : isFull ? (
        <button
          disabled
          className="bg-gray-300 text-gray-500 px-6 py-2 rounded-lg cursor-not-allowed"
        >
          Full
        </button>
      ) : (
        <button
          onClick={onJoin}
          disabled={joining}
          className="cursor-pointer bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          {joining ? 'Loading' : 'Join Event'}
        </button>
      )}
    </div>
  )
}
