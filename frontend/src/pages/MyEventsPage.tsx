import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api'
import Navbar from '../components/Navbar';
import { Plus } from 'lucide-react';
import { Calendar, momentLocalizer, Views, type View } from 'react-big-calendar';
import { type ToolbarProps } from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomToolbar from '../components/CustomToolbar';
import { useNavigate } from 'react-router-dom';

interface Event {
  id: number
  title: string
  date: string
  start?: Date
  end?: Date
}
interface CalendarEvent {
  id: number
  title: string
  start: Date
  end: Date
}

export default function MyEventsPage() {

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const localizer = momentLocalizer(moment);
  const [currentView, setCurrentView] = useState<View>(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const response = await api.get('/users/me/events')
        setEvents(response.data)
      } catch {
        console.error('Failed to fetch events')
      } finally {
        setLoading(false)
      }
    }
    fetchMyEvents()
  }, [])

  const calendarEvents: CalendarEvent[] = events.map((event) => ({
    id: event.id,
    title: event.title,
    start: new Date(event.date),
    end: new Date(event.date),
  }))

  if (loading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* title + description + Link */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-mist-950 mb-2">My events</h2>
            <p className="text-mist-500">
              View and manage your events calendar
            </p>
          </div>
          <Link
            to="/events/create"
            className="flex items-center gap-2 bg-indigo-600 text-slate-50 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200"
          >
            <Plus size={16} />
            Create Event
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-gray-500 text-lg">You are not part of any events yet.{' '}
              <Link
                to="/events"
                className="text-indigo-600 hover:underline">
                Explore public events and join.
              </Link>
            </p>
          </div>
        ) : (
          <div className="h-500px lg:h-[calc(100vh-200px)] p-4 mt-5 bg-gray-50 rounded-lg">
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              view={currentView}
              onView={setCurrentView}
              date={currentDate}
              onNavigate={setCurrentDate}
              selectable={true}
              onSelectSlot={(slot) => {
                setCurrentDate(slot.start)
                setCurrentView(Views.WEEK)
              }}
              onSelectEvent={(event) =>
                navigate(`/events/${(event as CalendarEvent).id}`)
              }
              components={{
                toolbar: CustomToolbar as React.ComponentType<ToolbarProps>,
              }}
              defaultView="month"
            />
          </div>
        )}
      </div>
    </div>
  )
}