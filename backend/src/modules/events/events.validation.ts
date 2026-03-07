import * as yup from 'yup';

export const createEventSchema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    date: yup.string().required('Date is required').test('future-date', 'Cannot create events in the past', (value) => {
        if(!value)
            return false;
        const eventDate = new Date(value);
        const now = new Date();
        return eventDate > now;
    }),
    location: yup.string().required('Location is required'),
    capacity: yup.number().positive('Capacity must be a positive number').integer('Capacity must be an integer').optional(),
    visibility: yup.mixed<'public' | 'private'>().oneOf(['public', 'private'], 'Visibility must be either public or private').required('Visibility is required'),
});

export const updateEventSchema = yup.object({
    title: yup.string().optional(),
    description: yup.string().optional(),
    date: yup.string().optional().test('future-date', 'Cannot set event date in the past', (value) => {
        if(!value)
            return true;
        const eventDate = new Date(value);
        const now = new Date();
        return eventDate > now;
    }),
    location: yup.string().optional(),
    capacity: yup.number().positive('Capacity must be a positive number').integer('Capacity must be an integer').optional(),
    visibility: yup.mixed<'public' | 'private'>().oneOf(['public', 'private'], 'Visibility must be either public or private').optional(),
});