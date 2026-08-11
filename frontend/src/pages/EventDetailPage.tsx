import { useEffect,  useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import api from '../services/api'
import Navbar from '../components/Navbar'
import DeleteModal from '../components/DeleteModal'
import { Toast } from '../components/Toast'
import ParticipantsList from '../components/ParticipantsList'
import type { EventDetail } from '../types/event'
import EventMetaInfo from '../components/EventMetaInfo'
import ActionButtons from '../components/ActionButtons'
import { useEventActions } from '../hooks/useEventActions'

export default function EventDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuthStore()

  const [event, setEvent] = useState<EventDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState<{ message: string;  type: 'success' | 'error'} | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)


  const {
    joinEvent,
    deleteEvent,
    leaveEvent,
    isPending,
  } = useEventActions(id)
  
  const refetchEvent = async () => {
    if (!id) return
    try {
      const response = await api.get(`/events/${id}`)
      setEvent(response.data)
    } catch {
      setError('Event not found')
    }
  }

  useEffect(() => {
    let isMounted = true

    const loadInitialData = async () => {
      if (!id) return
      try {
        const response = await api.get(`/events/${id}`)
        if (isMounted) setEvent(response.data)
      } catch {
        if (isMounted) setError('Event not found')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    loadInitialData()

    return () => {
      isMounted = false
    }
  }, [id])


  const handleJoin = async () => {
    const success = await joinEvent()
    if (success) {
      setToast({ message: 'Joined successfully', type: 'success' })
      refetchEvent()
    }
  }

  const handleLeave = async () => {
    const success = await leaveEvent()
    if (success) {
      setToast({ message: 'Successfully left an event', type: 'success' })
      refetchEvent()
    } 
  }

  const handleDelete = async () => {
    const success = await deleteEvent()
    if (success) {
      setToast({ message: 'Event deleted', type: 'success' })
      navigate('/events')
    }
  }
  

  const isParticipant = event?.participants.some((p) => p.userId === user?.id) || false
  const isOrganizer = event?.organizerId === user?.id
  const isFull = event?.capacity ? event.participants.length >= event.capacity : false
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className='text-gray-500'>Loading...</p>
      </div>
    )
  }

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

        {isOrganizer && (
          <div className="flex gap-2 mb-6">
            <Link to={`/events/${id}/edit`}>Edit</Link>
            <button onClick={() => setShowDeleteModal(true)}>Delete</button>
          </div>
        )}

        {showDeleteModal && (
          <DeleteModal
            message="Are you sure you want to delete this event?"
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
          />
        )}

        <EventMetaInfo event={event} />
        <p className="text-gray-700 mb-4">{event.description}</p>
        <hr className="border-gray-200 mb-4" />

        {isAuthenticated && !isOrganizer && (
          <ActionButtons
            isParticipant={isParticipant}
            isFull={isFull}
            joining={isPending}
            onJoin={handleJoin}
            onLeave={handleLeave}  
           />
        )}

        <ParticipantsList participants={event.participants} />
        </div>
  )
}