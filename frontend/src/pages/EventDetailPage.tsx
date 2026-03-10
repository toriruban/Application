import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../store/authStore'
import api from '../services/api'
import axios from 'axios'
import Navbar from '../components/Navbar'

interface Event {
  id: number
  title: string
  description: string
  date: string
  location: string
  capacity: number | null
  visibility: string
  organizerId: number
  organizer: { id: number; name: string }
  participants: { userId: number; user: { id: number, name: string } }[];
}

export default function EventDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuthStore();

    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [joining, setJoining] = useState(false);

    const isParticipant = event?.participants.some((p) => p.userId === user?.id)
    const isOrganizer = event?.organizerId === user?.id;
    const isFull = event?.capacity ? event.participants.length >= event.capacity : false;

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get(`/events/${id}`);
                setEvent(response.data);
            } catch {
                setError('Event not found');
            } finally {
                setLoading(false)
            }
        };
        fetchEvents();
    }, [id]);

    const handleJoin = async () => {
        setJoining(true);
        try {
            await api.post(`/events/${id}/join`);
            const response = await api.get(`/events/${id}`);
            setEvent(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data?.message || 'Failed to join')
            }
        } finally {
            setJoining(false)
        }
    };

    const handleLeave = async () => {
        setJoining(true);
        try {
            await api.post(`/events/${id}/leave`);
            const response = await api.get(`/events/${id}`);
            setEvent(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data?.message || 'Failed to leave')
            }
        } finally {
            setJoining(false)
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;

        try {
            await api.delete(`/events/${id}`);
            navigate('/events')
        } catch {
            alert('Failed to delete event')
        }
    }
    if (loading)
      return (
        <div className='min-h-screen bg-white flex items-center justify-center'>
          <p className='text-gray-500'>Loading...</p>
        </div>
      )

    if (error || !event)
        return (
            <div className='min-h-screen bg-white flex items-center justify-center'>
                <p className='text-red-500'>{error}</p>
            </div>
        );
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 py-8">
          {/* back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 mb-6 cursor-pointer"
          >
            <ArrowLeft size={16} /> Back
          </button>
                {isOrganizer && (
            <div className="flex gap-2">
              <Link
                to={`/events/${id}/edit`}
                className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
                )}
                
          <div className="flex flex-col gap-3 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>
                {new Date(event.date).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={18} />
              <span>
                {event.participants.length} / {event.capacity ?? '∞'}{' '}
                participants
              </span>
            </div>
          </div>

          {/* опис */}
          <p className="text-gray-700 mb-8">{event.description}</p>
          <hr className="border-gray-200 mb-6" />

          {/* join/leave кнопка */}
          {isAuthenticated && !isOrganizer && (
            <div className="mb-8">
              {isParticipant ? (
                <button
                  onClick={handleLeave}
                  disabled={joining}
                  className="cursor-pointer border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  {joining ? 'Loading...' : 'Leave Event'}
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
                  onClick={handleJoin}
                  disabled={joining}
                  className="cursor-pointer bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
                >
                  {joining ? 'Loading...' : 'Join Event'}
                </button>
              )}
            </div>
          )}

          {/* список учасників */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Participants ({event.participants.length})
            </h2>
            {event.participants.length === 0 ? (
              <p className="text-gray-400">No participants yet</p>
            ) : (
              <div className="flex flex-col gap-2">
                {event.participants.map((p) => (
                  <div key={p.userId} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-semibold text-sm">
                      {p.user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-700">{p.user.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
}