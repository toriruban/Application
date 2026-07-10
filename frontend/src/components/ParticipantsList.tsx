import type { EventDetail } from '../types/event'

export default function ParticipantsList({
  participants,
}: {
  participants: EventDetail['participants'] | undefined
}) {
  const safeParticipants = participants || []
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Participants ({safeParticipants.length})
      </h2>
      {safeParticipants.length === 0 ? (
        <p className="text-gray-400">No participants yet</p>
      ) : (
        <div className="flex flex-col gap-2">
          {safeParticipants.map((p) => (
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
  )
}
