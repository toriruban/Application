import { Calendar, Clock } from 'lucide-react'
import React, { useState } from 'react'

export interface EventFormData {
  title: string,
  description: string,
  date: string,
  time: string,
  location: string,
  capacity: number | null,
  visibility: 'public' | 'private'
}
interface EventFormFieldsProps {
  onSubmit: (formData: EventFormData) => void
}

export default function EventFormFields({
  onSubmit
}: EventFormFieldsProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [capacity, setCapacity] = useState('')
  const [visibility, setVisibility] = useState<'public' | 'private'>('public')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const eventDate = new Date(`${date}T${time}`)
    if (eventDate < new Date()) {
      setError('Cannot create event in the past')
      setLoading(false)
      return
    }
    onSubmit({
      title,
      description,
      date,
      time,
      location,
      capacity: capacity ? parseInt(capacity, 10) : null,
      visibility,
    })
  }
    return (
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl p-5 bg-neutral-50 rounded-lg border border-slate-200"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-1 ml-8">
          {' '}
          Create new event{' '}
        </h2>
        <p className="text-gray-500 mb-6">
          {' '}
          Fill in the details to create an amazing event{' '}
        </p>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm mb-6 text-center">
            {error}
          </div>
        )}

        {/* Event Title */}
        <div className="flex flex-col gap-1 mb-6">
          <label className="text-sm font-medium text-gray-700">
            Event Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            placeholder="e.g., Tech Conference 2026"
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 placeholder-gray-400 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1 mb-6">
          <label className="text-sm font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Describe what makes your event special..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-2 placeholder-gray-400 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-colors"
            required
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Date <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 mt-2 border border-gray-300 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition-colors">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`flex-1 outline-none bg-transparent ${date ? 'text-gray-900' : 'text-gray-400'}`}
                required
              />
              <Calendar size={18} className="text-gray-400 shrink-0" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Time <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 mt-2 border border-gray-300 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition-colors">
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={`flex-1 outline-none bg-transparent ${time ? 'text-gray-900' : 'text-gray-400'}`}
                required
              />
              <Clock size={18} className="text-gray-400 shrink-0" />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col gap-1 mb-6">
          <label className="text-sm font-medium text-gray-700">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={location}
            placeholder="e.g., Convention Center, San Francisco"
            onChange={(e) => setLocation(e.target.value)}
            className="mt-2 placeholder-gray-400 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            required
          />
        </div>

        {/* Capacity */}
        <div className="flex flex-col gap-1 mb-6">
          <label className="text-sm font-medium text-gray-700">
            Capacity <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="number"
            value={capacity}
            placeholder="e.g., 100"
            onChange={(e) => setCapacity(e.target.value)}
            className="mt-2 placeholder-gray-400 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          />
          <p className="mt-2 text-xs text-gray-400">
            Maximum number of participants. Leave empty for unlimited capacity.
          </p>
        </div>

        {/* Visibility */}
        <div className="flex flex-col gap-2 mb-6">
          <label className="text-sm font-medium text-gray-700">
            Visibility
          </label>
          <div className="flex flex-col gap-3 mt-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={visibility === 'public'}
                onChange={(e) =>
                  setVisibility(e.target.value as 'public' | 'private')
                }
                className="w-4 h-4 accent-indigo-600 cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  Public
                </span>
                <span className="text-xs text-gray-400">
                  Anyone can see and join this event
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={visibility === 'private'}
                onChange={(e) => setVisibility(e.target.value as 'public' | 'private')}
                className="w-4 h-4 accent-indigo-600 cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  Private
                </span>
                <span className="text-xs text-gray-400">
                  Only people with the link can view
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all font-medium disabled:opacity-50 cursor-pointer flex items-center justify-center"
        >
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    )
}
