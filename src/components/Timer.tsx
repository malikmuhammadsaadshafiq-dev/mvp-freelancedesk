'use client'

import { useState, useEffect } from 'react'

interface TimerProps {
  onTimeSubmit: (minutes: number, notes: string) => void
}

export function Timer({ onTimeSubmit }: TimerProps) {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [notes, setNotes] = useState('')

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600)
    const mins = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleSubmit = () => {
    if (seconds > 0) {
      onTimeSubmit(Math.ceil(seconds / 60), notes)
      setSeconds(0)
      setNotes('')
      setIsRunning(false)
    }
  }

  return (
    <div className="glass p-6 border-b-2 border-black">
      <h3 className="text-xl font-bold mb-4">Time Tracker</h3>
      <div className="text-5xl font-bold mb-6 text-center tabular-nums">
        {formatTime(seconds)}
      </div>
      
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`btn flex-1 font-medium px-6 py-3 transition-colors ${
            isRunning ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          {isRunning ? 'Pause' : 'Start Timer'}
        </button>
        <button
          onClick={() => { setSeconds(0); setIsRunning(false) }}
          className="btn px-6 py-3 border border-black hover:bg-gray-100 transition-colors"
        >
          Reset
        </button>
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add notes about this time entry..."
        className="w-full p-3 border border-gray-300 mb-4 resize-none focus:outline-none focus:border-black"
        rows={3}
      />

      <button
        onClick={handleSubmit}
        disabled={seconds === 0}
        className="btn w-full bg-black text-white font-medium px-8 py-3 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Log Time Entry
      </button>
    </div>
  )
}