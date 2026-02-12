'use client'

import { useEffect } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  onClose: () => void
  duration?: number
}

export function Toast({ message, type = 'success', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const bgColor = type === 'success' ? 'bg-black' : type === 'error' ? 'bg-red-600' : 'bg-gray-800'

  return (
    <div className={`toast ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg mb-3 flex items-center gap-3`}>
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">
        ×
      </button>
    </div>
  )
}