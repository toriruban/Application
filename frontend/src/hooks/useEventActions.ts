import { useState, useCallback } from 'react'
import api from '../services/api'
import axios from 'axios'

export type EventActionType = 'join' | 'leave' | 'delete' | null

export function useEventActions(eventId: string | undefined) {
    const [activeAction, setActiveAction] = useState<EventActionType>(null)
    const [error, setError] = useState<string | null>(null)
    const executeAction = useCallback(
        async (
            actionType: EventActionType,
            apiCall: () => Promise<void>
        ): Promise<boolean> => {
            if (!eventId) return false
            setActiveAction(actionType)
            setError(null)

            try {
                await apiCall()
                return true
            } catch (error) {
                const message = axios.isAxiosError(error)
                    ? error.response?.data?.message
                    : 'An unexpected error occurred'
                
                setError(message || 'Action failed')
                return false
            } finally {
                setActiveAction(null)
            }

        }, [eventId]
    )

    const joinEvent = useCallback(
        () => executeAction('join', () => api.post(`/events/${eventId}/join`)),
        [eventId, executeAction]
    )

    const leaveEvent = useCallback(
      () => executeAction('leave', () => api.post(`/events/${eventId}/leave`)),
        [ eventId, executeAction]
    )

    const deleteEvent = useCallback(
      () => executeAction('delete', () => api.delete(`/events/${eventId}`)),
        [eventId, executeAction]
    )

    return {
        joinEvent,
        leaveEvent,
        deleteEvent,
        activeAction,
        isPending: activeAction !== null,
        error,
        clearError: () => setError(null)
    }
}