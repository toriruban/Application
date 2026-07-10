export interface EventDetail {
  id: number
  title: string
  description: string
  date: string
  location: string
  capacity: number | null
  visibility: string
  organizerId: number
  organizer: { id: number; name: string }
  participants: { userId: number; user: { id: number; name: string } }[]
}

export interface EventSummary {
  id: number
  title: string
  description: string
  date: string
  location: string
  capacity: number | null
  visibility: string
  organizer: { id: number; name: string }
  participants: { userId: number }[]
}

export interface Event {
  id: number
  title: string
  date: string
  start?: Date
  end?: Date
}
export interface CalendarEvent {
  id: number
  title: string
  start: Date
  end: Date
}