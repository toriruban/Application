import { useEffect } from 'react'

interface ToastProps {
    message: string,
    type: 'success' | 'error',
    onClose: () => void;
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000)
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgClass = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    return (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded shadow-lg text-white transition-all ${bgClass}`}>
            {message}
        </div>
    );
};