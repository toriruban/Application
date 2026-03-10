import { Link } from 'react-router-dom';
import { List, Plus, Calendar, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
    const { isAuthenticated, logout, user } = useAuthStore();

    return (
      <nav className="sticky top-0 z-50 80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex justify-end items-center gap-4">
        <Link
          to="/events"
          className="flex items-center gap-1 text-neutral-600 hover:text-neutral-900"
        >
          <List size={16} />
          Events
        </Link>
        {isAuthenticated && (
          <>
            <Link
              to="/my-events"
              className="flex items-center gap-1 text-neutral-600 hover:text-neutral-900"
            >
              <Calendar size={16} />
              My events
            </Link>
            <Link
              to="/events/create"
              className="flex items-center gap-2 bg-indigo-600 text-slate-50 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200"
            >
              <Plus size={16} />
              Create Event
            </Link>
            <div className="w-0.5 h-8 bg-gray-200 " />
            <span className="flex items-center gap-1 text-neutral-600">
              <User
                size={30}
                className="bg-indigo-200 text-indigo-400 rounded-full p-1.5"
              />
              {user?.name}
            </span>
            <button
              onClick={logout}
              className="cursor-pointer text-neutral-600 hover:text-neutral-900"
            >
              <LogOut size={16} />
            </button>
          </>
        )}

        {!isAuthenticated && (
          <>
            <Link
              to="/login"
              className="text-neutral-600 hover:text-neutral-900"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    )
}