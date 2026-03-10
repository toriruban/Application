import { type ToolbarProps, Navigate } from 'react-big-calendar'
import { ChevronRight, ChevronLeft } from 'lucide-react'

export default function CustomToolbar({
  onNavigate,
  onView,
  label,
  view,
}: ToolbarProps) {
  const goBack = () => {
    onNavigate(Navigate.PREVIOUS)
  }

  const goNext = () => {
    onNavigate(Navigate.NEXT)
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      {/* LEFT SIDE: navigation + title */}
      <div className="flex items-center gap-4 ">
        <button
          onClick={goBack}
          className="p-2 border border-gray-200 hover:bg-gray-50  rounded-lg overflow-hidden cursor-pointer"
          type="button"
        >
          <ChevronLeft size={16} className="text-gray-400" />
        </button>
        <span className="text-lg font-semibold text-gray-900">{label}</span>
        <button
          onClick={goNext}
          className="p-2 border border-gray-200 hover:bg-gray-50  rounded-lg overflow-hidden cursor-pointer"
          type="button"
        >
          <ChevronRight size={16} className="text-gray-400" />
        </button>
      </div>
      {/* RIGHT SIDE: navigation + title */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onView('month')}
          className={`transition-all duration-200 p-2 rounded-lg cursor-pointer text-slate-50 ${view === 'month' ? 'bg-indigo-700 ring-2 ring-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          type="button"
        >
          month
        </button>
        <button
          onClick={() => onView('week')}
          className={`transition-all duration-200 p-2 rounded-lg cursor-pointer text-slate-50 ${view === 'week' ? 'bg-indigo-700 ring-2 ring-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          type="button"
        >
          week
        </button>
      </div>
    </div>
  )
}