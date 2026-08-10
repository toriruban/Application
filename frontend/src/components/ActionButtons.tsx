interface ActionButtonProps {
    isParticipant: boolean
    isFull: boolean
    joining: boolean
    onJoin: () => Promise<void>
    onLeave: () => Promise<void>
}

export default function ActionButtons({
    isParticipant,
    isFull,
    joining,
    onJoin,
    onLeave,
}: ActionButtonProps) {
    return (
      <div className="mb-8">
        {isParticipant ? (
          <button
            onClick={onLeave}
            disabled={joining}
            className="cursor-pointer border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 disabled:opacity-50 font-medium transition-colors"
          >
            {joining ? 'Loading...' : 'Leave Event'}
          </button>
        ) : isFull ? (
          <button
            disabled
            className="bg-gray-300 text-gray-500 px-6 py-2 rounded-lg cursor-not-allowed font-medium"
          >
            Full
          </button>
        ) : (
          <button
            onClick={onJoin}
            disabled={joining}
            className='cursor-pointer bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 font-medium transition-colors'
             >
              { joining ? 'Loading...' : 'Join Event'}                            
          </button>
        )}
      </div>
    )
}