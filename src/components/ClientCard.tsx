'use client'

import { Project } from '@/app/page'

interface ClientCardProps {
  project: Project
  onDelete: (id: string) => void
  onInvoice: (id: string) => void
  onStatusToggle: (id: string) => void
}

export function ClientCard({ project, onDelete, onInvoice, onStatusToggle }: ClientCardProps) {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-500/20 text-green-400'
      case 'completed': return 'bg-blue-500/20 text-blue-400'
      case 'pending': return 'bg-yellow-500/20 text-yellow-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="glass-card p-5 hover-lift transition-all duration-300 border border-white/[.08] hover:border-[#a78bfa]/30">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-white truncate">{project.clientName}</h3>
          <p className="text-sm text-white/60 truncate">{project.projectTitle}</p>
        </div>
        <button 
          onClick={() => onDelete(project.id)}
          className="text-white/40 hover:text-red-400 transition-colors active:scale-95"
          aria-label="Delete project"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Budget</span>
          <span className="text-white font-mono">{project.budget}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Deadline</span>
          <span className="text-white/80">{project.deadline}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Hours</span>
          <span className="text-white/80">{project.hoursLogged}h</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-white/60">Progress</span>
          <span className="text-[#a78bfa]">{project.progress}%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#a78bfa] to-[#c4b5fd] transition-all duration-500"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => onStatusToggle(project.id)}
          className={`flex-1 py-1.5 px-3 rounded-full text-xs font-medium transition-colors active:scale-95 ${getStatusColor(project.status)}`}
        >
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </button>
        <button 
          onClick={() => onInvoice(project.id)}
          className="py-1.5 px-3 bg-white text-black rounded-full text-xs font-medium hover:bg-gray-200 transition-colors active:scale-95"
        >
          Invoice
        </button>
      </div>
    </div>
  )
}