export interface CreateEventDto {
    title: string;
    description: string;
    date: string;
    location: string;
    capacity?: number;
    visibility: 'public' | 'private';
}

export interface UpdateEventDto {
    title?: string;
    description?: string;
    date?: string;
    location?: string;
    capacity?: number;
    visibility?: 'public' | 'private';
}