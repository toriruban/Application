import { Link } from 'react-router-dom'

export default function EmptyEventsState() {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-gray-500 text-lg">
          You are not part of any events yet.{' '}
          <Link to="/events" className="text-indigo-600 hover:underline">
            Explore public events and join.
          </Link>
        </p>
      </div>
    )
}
