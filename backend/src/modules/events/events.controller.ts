import { Request, Response} from 'express';
import prisma from '../../prisma/client';
import { CreateEventDto, UpdateEventDto } from './events.dto';
import { createEventSchema, updateEventSchema } from './events.validation';

export const getEvents = async(req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany({
            where: { visibility: 'public' },
            include: {
                organizer: { select: {id: true, name: true }},
                participants: { include: {user: {select: {id: true, name: true}}} }
            }
        });
        res.status(200)
        .json(events);
    } catch (error) {
        res.status(500)
        .json({message: 'Failed to fetch events'})
    }
};

export const getEventsById = async(req: Request, res: Response) => {
    try {
        const event = await prisma.event.findUnique({
            where: { id: Number(req.params.id)},
            include: {
                organizer: { select: {id: true, name: true}},
                participants: { include: {user: { select: { id: true, name: true }}}}
            }
        });

        if(!event) {
            res.status(404)
            .json({message: 'Event not found'})
        } else {
            res.status(200)
            .json(event)
        }

    } catch (error) {
        res.status(500)
        .json({message: 'Failed to fetch events'})
    }
};

export const createEvent = async (req: Request, res: Response) => {
    try {
        const dto = await createEventSchema.validate(req.body) as CreateEventDto;
        const event = await prisma.event.create({
            data: {
                ...dto,
                date: new Date(dto.date),
                organizerId: req.userId!,
            }
        });

        res.status(201)
        .json(event)

    } catch (error) {
        res.status(500)
        .json({message: 'Failed to create event'})
    }
};

export const updateEvent = async(req: Request, res:Response) => {
    try {
        const event = await prisma.event.findUnique({
            where: { id: Number(req.params.id)}
        });

        if(!event) {
            res.status(404)
            .json({message: 'Event not found'})
            return;
        }

        if(event.organizerId !== req.userId) {
            res.status(403)
            .json({message: 'Forbidden: You are not the organizer of this event'})
            return;
        };

        const dto = await updateEventSchema.validate(req.body) as UpdateEventDto;
        const updateEvent = await prisma.event.update({
            where: { id: Number(req.params.id) },
            data: {
                ...dto,
                date: dto.date ? new Date(dto.date) : undefined,
            }
        });
        res.status(200)
        .json(updateEvent)

    } catch (error) {
        res.status(500)
        .json({message: 'Failed to update event'})
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const event = await prisma.event.findUnique({
            where: { id: Number(req.params.id)}
        });

        if(!event) {
            res.status(404)
            .json({ message: 'Event not found'})
            return;
        };

        if(event.organizerId !== req.userId) {
            res.status(403)
            .json({ message: 'Forbidden: You are not the organizer of this event'})
            return;
        };

        await prisma.event.delete({
            where: { id: Number(req.params.id) }
        });

        res.status(200)
        .json({ message: 'Event deleted successfully'});
    } catch (error) {
        res.status(500)
        .json({message: 'Failed to delete event'})
    }
};

export const joinEvent = async(req: Request, res: Response) => {
    try {
        const eventId = Number(req.params.id);
        const event = await prisma.event.findUnique({
            where: { id: eventId },
            include: { participants: true}
        });

        if(!event) {
            res.status(404)
            .json({ message: 'Event not found'});
            return;
        }

        if(event.capacity && event.participants.length >= event.capacity) {
            res.status(400)
            .json({ message: 'Event is at full capacity'});;
            return;
        }

        const existing = await prisma.participant.findUnique({
            where: { userId_eventId: { userId: req.userId!, eventId}}
        });

        if(existing) {
            res.status(400)
            .json({ message: 'You have already joined this event'});
            return;
        }

        const participant = await prisma.participant.create({
            data: {
                userId: req.userId!,
                eventId: eventId
            }
        });

        res.status(200)
        .json(participant);
    } catch (error) {
        res.status(500)
        .json({message: 'Failed to join event'})
    }
};

export const leaveEvent = async(req: Request, res: Response) => {
    try {
        const eventId = Number(req.params.id);
        const existing = await prisma.participant.findUnique({
            where: { userId_eventId: { userId: req.userId!, eventId}}
        });

        if(!existing) {
            res.status(400)
            .json({ message: 'You have not joined this event'});
            return;
        }

        await prisma.participant.delete({
            where: { userId_eventId: { userId: req.userId!, eventId}}
        });

        res.status(200)
        .json({ message: 'You have left the event'});
   
    } catch (error) {
        res.status(500)
        .json({message: 'Failed to leave event'})
    }
};

export const getMyEvents = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany({
          where: {
            OR: [
                { organizerId: req.userId! },
                { participants: { some: { userId: req.userId! } } }
            ]
        },
        include: {
            organizer: { select: { id: true, name: true }},
            participants: { include: { user: { select: { id: true, name: true } } } }
        }
    });
        res.status(200)
        .json(events);

    } catch (error) {
        res.status(500)
        .json({message: 'Failed to fetch your events'})
    }
}
