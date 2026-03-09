import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import axios from 'axios';
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'

export default function CreateEventPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState('');
    const [visibility, setVisibility] = useState('public');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const eventDate = new Date(`${date}T${time}`);
        if (eventDate < new Date()) {
            setError('Cannot create event in the past');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/events', {
                title,
                description,
                date: eventDate.toISOString(),
                location,
                capacity: capacity ? Number(capacity) : null,
                visibility,
            });
            navigate(`/events/${response.data.id}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Failed to create event')
            }
        } finally {
            setLoading(false);
        }
    };
    
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
          <div className="max-w-2xl p-5 bg-neutral-50 rounded-lg rounded-lg border border-slate-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-1 ml-8">
              Create new event
            </h2>
            <p className="text-gray-500 mb-6">
              Fill in the details to create an amazing event
            </p>

            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded">{error}</div>
            )}

            {/* Event Title */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm font-medium text-gray-700">
                Event Title
                <span className="text-red-500 pl-2">*</span>
              </label>
              <input
                type="text"
                value={title}
                placeholder="e.g., Tech Conference 2026"
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 placeholder-gray-400 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/*Description */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm font-medium text-gray-700">
                Description
                <span className="text-red-500 pl-2">*</span>
              </label>
              <textarea
                placeholder="Describe what makes your event special..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="mt-2 placeholder-gray-400 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                required
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {/* Date field */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Date
                  <span className="text-red-500 pl-2">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="dd.mm.yyyy"
                    className="w-full mt-2 placeholder-gray-400 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pt-1 pointer-events-none text-gray-400">
                    <Calendar size={18} />
                  </div>
                </div>
              </div>

              {/* Time field */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Time
                  <span className="text-red-500 pl-2">*</span>
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="--.--"
                    className="w-full mt-2 placeholder-gray-400 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pt-1 pointer-events-none text-gray-400">
                    <Clock size={18} />
                  </div>
                </div>
              </div>
            </div>

            {/* Location  */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm font-medium text-gray-700">
                Location
                <span className="text-red-500 pl-2">*</span>
              </label>
              <input
                type="text"
                value={location}
                placeholder="e.g., Convention Center, San Francisco"
                onChange={(e) => setLocation(e.target.value)}
                className="mt-2 placeholder-gray-400 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Capacity  */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm font-medium text-gray-700">
                Capacity
                <span className="text-gray-700 pl-2">(optional)</span>
              </label>
              <input
                type="number"
                value={capacity}
                placeholder="e.g., 100"
                onChange={(e) => setCapacity(e.target.value)}
                className="mt-2 placeholder-gray-400 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="mt-2 text-gray-400">
                Maximum number of participants. Leave empty for unlimited
                capacity.
              </p>
            </div>

            {/* Visibility  */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm font-medium text-gray-700">
                Visibility
              </label>

              <div className="flex flex-col gap-4"></div>
              {/* Public  */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center ">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={visibility === 'public'}
                    onChange={(e) => setVisibility(e.target.value)}
                    className="w-4 h-4 accent-indigo-600 border-gray-300 focus:ring-indigo-500 cursor-pointer"
                  />
                </div>
                <div className="flex flex-row">
                  <span className="text-sm font-medium text-gray-500 mr-1">
                    Public -
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    Anyone can see and join this event
                  </span>
                </div>
              </label>

              {/* Private  */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center ">
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={visibility === 'private'}
                    onChange={(e) => setVisibility(e.target.value)}
                    className="w-4 h-4 accent-indigo-600 border-gray-300 focus:ring-indigo-500 cursor-pointer"
                  />
                </div>
                <div className="flex flex-row">
                  <span className="text-sm font-medium text-gray-500 mr-1">
                    Private -
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    Only invited people can see this event
                  </span>
                </div>
              </label>
            </div>

            {/* Buttons  */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => navigate('/events')}
                className="bg-gray-200 text-gray-500 hover:text-white hover:bg-red-500 cursor-pointer py-2 rounded-lg rounded-lg border border-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer py-2 bg-indigo-600 text-slate-50 px-4 rounded-lg hover:text-indigo-900 hover:bg-green-500"
              >
                {loading ? 'Creating...' : 'Create Event'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
