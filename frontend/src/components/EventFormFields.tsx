import { Calendar, Clock } from 'lucide-react'

interface EventFormFieldsProps {
  title: string
  setTitle: (v: string) => void
  description: string
  setDescription: (v: string) => void
  date: string
  setDate: (v: string) => void
  time: string
  setTime: (v: string) => void
  location: string
  setLocation: (v: string) => void
  capacity: string
  setCapacity: (v: string) => void
  visibility: string
  setVisibility: (v: string) => void
}

export default function EventFormFields({
  title,
  setTitle,
  description,
  setDescription,
  date,
  setDate,
  time,
  setTime,
  location,
  setLocation,
  capacity,
  setCapacity,
  visibility,
  setVisibility,
}: EventFormFieldsProps) {
  return (
    <>
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
        <label className="text-sm font-medium text-gray-700">Visibility</label>
        <div className="flex flex-col gap-3 mt-1">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="visibility"
              value="public"
              checked={visibility === 'public'}
              onChange={(e) => setVisibility(e.target.value)}
              className="w-4 h-4 accent-indigo-600 cursor-pointer"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">Public</span>
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
              onChange={(e) => setVisibility(e.target.value)}
              className="w-4 h-4 accent-indigo-600 cursor-pointer"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">Private</span>
              <span className="text-xs text-gray-400">
                Only people with the link can view
              </span>
            </div>
          </label>
        </div>
      </div>
    </>
  )
}
