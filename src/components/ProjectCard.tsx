'use client'

import { formatCurrency, formatDate, calculateProgress } from '@/lib/utils'

interface Project {
  id: string
  clientName: string
  projectName: string
  budget: number
  currency: string
  deadline: string
  completedTasks: number
  totalTasks: number
  status: 'active' | 'completed' | 'paused'
}

interface ProjectCardProps {
  project: Project
  onDelete: (id: string) => void
  onEdit: (project: Project) => void
  delay?: number
}

export function ProjectCard({ project, onDelete, onEdit, delay = 0 }: ProjectCardProps) {
  const progress = calculateProgress(project.completedTasks, project.totalTasks)
  const daysLeft = Math.ceil((new Date(project.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div 
      className="fade-in-up bg-white border-b-2 border-black pb-6 hover-lift cursor-pointer group"
      style={{ '--delay': `${delay}ms` } as React.CSSProperties}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold mb-1 group-hover:translate-x-1 transition-transform">
            {project.projectName}
          </h3>
          <p className="text-gray-600">{project.clientName}</p>
        </div>
        <span className={`px-3 py-1 text-sm font-medium border ${
          project.status === 'active' ? 'border-black bg-black text-white' : 
          project.status === 'completed' ? 'border-green-600 text-green-600' : 
          'border-gray-400 text-gray-400'
        }`}>
          {project.status}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 h-2">
          <div 
            className="bg-black h-2 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p className="text-gray-500">Budget</p>
          <p className="font-bold text-lg">{formatCurrency(project.budget, project.currency)}</p>
        </div>
        <div>
          <p className="text-gray-500">Deadline</p>
          <p className={`font-medium ${daysLeft < 7 ? 'text-red-600' : 'text-black'}`}>
            {formatDate(project.deadline)} ({daysLeft} days)
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button 
          onClick={() => onEdit(project)}
          className="btn flex-1 bg-black text-white font-medium px-4 py-2 hover:bg-gray-800 transition-colors"
        >
          Edit Project
        </button>
        <button 
          onClick={() => onDelete(project.id)}
          className="btn px-4 py-2 border border-black hover:bg-gray-100 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  )
}