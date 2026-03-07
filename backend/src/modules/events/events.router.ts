import { Router } from 'express';
import { getEvents,
         getEventsById,
         createEvent,
         updateEvent,
         deleteEvent,
         joinEvent,
         leaveEvent } from './events.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

router.get('/', getEvents);
router.get('/:id', getEventsById);

router.post('/', authMiddleware, createEvent)
router.patch('/:id', authMiddleware, updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);
router.post('/:id/join', authMiddleware, joinEvent);
router.post('/:id/leave', authMiddleware, leaveEvent);

export default router;