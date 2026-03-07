import {  Router } from 'express';
import { getMyEvents } from '../events/events.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

router.get('/me/events', authMiddleware, getMyEvents);

export default router;