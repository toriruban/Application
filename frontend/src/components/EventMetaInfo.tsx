import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import type { EventDetail, EventSummary } from '../types/event'

type EventMetaInfoProps = {
  event: EventDetail | EventSummary
}

export default function EventMetaInfo({ event }: EventMetaInfoProps) {
  return (
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
          {event.participants.length} / {event.capacity ?? '∞'} participants
        </span>
      </div>
    </div>
  )
}
