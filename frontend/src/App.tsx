import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import CreateEventPage from './pages/CreateEventPage';
import MyEventsPage from './pages/MyEventsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/events/:id' element={<EventDetailPage />} />
        <Route path='/events/create' element={<CreateEventPage />} />
        <Route path='/my-events' element={<MyEventsPage />} />
        <Route path='/' element={<Navigate to='/events' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
