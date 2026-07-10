import { X } from 'lucide-react';

interface DeleteModalProps {
    message: string
    onCancel: () => void
    onConfirm: () => void
}

export default function DeleteModal({ message, onCancel, onConfirm }: DeleteModalProps) {
   return (
     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
       <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4">
         <div className="flex justify-end mb-2">
           <button
             onClick={onCancel}
             className="bg-indigo-200 text-gray-800 hover:text-gray-900 rounded-full p-1.5 cursor-pointer"
           >
             <X size={16} />
           </button>
         </div>
         <p className="text-gray-600 mb-6">{message}</p>
         <div className="flex gap-3 justify-end">
           <button
             onClick={onCancel}
             className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 bg-green-200 hover:bg-green-400 hover:text-white cursor-pointer"
           >
             Cancel
           </button>
           <button
             onClick={onConfirm}
             className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 bg-red-400 hover:bg-red-500 hover:text-white cursor-pointer"
           >
             Delete
           </button>
         </div>
       </div>
     </div>
   )
}