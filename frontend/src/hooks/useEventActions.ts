import { useState } from 'react'
import api from '../services/api'
import axios from 'axios'

export function useEventActions(id: string | undefined, onRefresh: () => Promise<void>) {
    const [loadingAction, setLoadingAction] = useState(false)
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
    
    const handleJoin = async () => {
        if (!id) return
        setLoadingAction(true)
        try {
            await api.post(`/events/${id}/join`)
            await onRefresh()
            setToast({ message: 'Successfully joined the event', type: 'success' })
        } catch (error) {
            const msg = axios.isAxiosError(error) ? error.response?.data?.message : 'Failed to join'
            setToast({ message: msg || 'Failed to join', type: 'error' })
        } finally {
            setLoadingAction(false)
        }
    }

    const handleLeave = async () => {
        if (!id) return
        setLoadingAction(true)
        try {
            await api.post(`/events/${id}/leave`)
            await onRefresh()
            setToast({ message: 'Successfully left', type: 'success' })
        } catch (error) {
            const msg = axios.isAxiosError(error) ? error.response?.data?.message : 'Failed to leave'
            setToast({ message: msg || 'Failed to leave', type: 'error' })
        } finally {
            setLoadingAction(false)
        }
    }

    const handleDelete = async () => {
        if (!id) return
        setLoadingAction(true)
        try {
            await api.delete(`/events/${id}`)
            await onRefresh()
            setToast({ message: 'Successfully deleted', type: 'success' })
        } catch (error) {
            const msg = axios.isAxiosError(error) ? error.response?.data?.message : 'Failed to delete'
            setToast({ message: msg || 'Failed to delete an event', type: 'error'})
        } finally {
            setLoadingAction(false)
        }
    }
    return {
        loadingAction,
        toast,
        setToast,
        handleDelete,
        handleJoin,
        handleLeave,
    }
}