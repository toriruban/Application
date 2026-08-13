import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import type { EventSummary } from '../types/event'
import EventMetaInfo from './EventMetaInfo'

interface EventCardProps {
    event: EventSummary
    isPending: boolean
    onJoin: (eventId: number, e: React.MouseEvent) => void
    onLeave: (eventId: number, e: React.MouseEvent) => void
}

export default function EventCard({
    event,
    isPending,
    onJoin,
    onLeave,
}: EventCardProps) {
    const { user } = useAuthStore()
    const isParticipant = user && event.participants.some((p) => p.userId === user.id)
    const isFull = event.capacity ? event.participants.length >= event.capacity : false

    return (
      <Link
        to={`/events/{event.id}`}
        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-3 group cursor-pointer"
      >
        <h3 className="text-lg font-semibold text-neutral-900group-hover:text-indigo-600">
          {event.title}
        </h3>
        <p className="text-neutral-500 text-sm">{event.description}</p>
        <div className="flex flex-col gap-2 text-sm text-neutral-500">
          <EventMetaInfo event={event} />
        </div>

        <hr className="border-gray-200" />

        <div className="mt-auto">
          {isParticipant ? (
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => onLeave(event.id, e)}
                disabled={isPending}
                className="w-full bg-red-400 text-white py-2 rounded-lg cursor-pointer hover:bg-red-300 disabled:opacity-50"
              >
                Leave
              </button>
              <button
                disabled
                className="w-full bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed"
              >
                Already joined
              </button>
            </div>
          ) : isFull ? (
            <button
              disabled
              className="w-full bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed"
            >
              Event Full
            </button>
          ) : (
            <button
              onClick={(e) => onJoin(event.id, e)}
              disabled={isPending}
              className='cursor-pointer w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:opacity-50'
            >Join Event</button>
          )}
        </div>
      </Link>
    )
}
