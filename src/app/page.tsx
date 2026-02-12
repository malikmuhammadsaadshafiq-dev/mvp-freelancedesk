'use client'

import { useState, useEffect } from 'react'
import { ProjectCard } from '@/components/ProjectCard'
import { Timer } from '@/components/Timer'
import { Toast } from '@/components/Toast'
import { SkeletonCard, SkeletonStats } from '@/components/Skeleton'
import { formatCurrency } from '@/lib/utils'

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

interface TimeEntry {
  id: string
  projectId: string
  minutes: number
  notes: string
  date: string
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      clientName: 'Sarah Chen',
      projectName: 'E-commerce Platform Redesign',
      budget: 12500,
      currency: 'USD',
      deadline: '2024-04-15',
      completedTasks: 12,
      totalTasks: 20,
      status: 'active'
    },
    {
      id: '2',
      clientName: 'Marcus Johnson',
      projectName: 'Mobile Banking App UI',
      budget: 8900,
      currency: 'USD',
      deadline: '2024-03-28',
      completedTasks: 8,
      totalTasks: 15,
      status: 'active'
    },
    {
      id: '3',
      clientName: 'Elena Rodriguez',
      projectName: 'Brand Identity System',
      budget: 5400,
      currency: 'EUR',
      deadline: '2024-03-10',
      completedTasks: 5,
      totalTasks: 5,
      status: 'completed'
    },
    {
      id: '4',
      clientName: 'David Kim',
      projectName: 'Analytics Dashboard',
      budget: 15200,
      currency: 'USD',
      deadline: '2024-05-01',
      completedTasks: 3,
      totalTasks: 12,
      status: 'active'
    },
    {
      id: '5',
      clientName: 'Priya Patel',
      projectName: 'Marketing Website',
      budget: 6800,
      currency: 'GBP',
      deadline: '2024-04-22',
      completedTasks: 6,
      totalTasks: 10,
      status: 'active'
    },
    {
      id: '6',
      clientName: 'James Wilson',
      projectName: 'SaaS Platform Development',
      budget: 22000,
      currency: 'USD',
      deadline: '2024-06-15',
      completedTasks: 2,
      totalTasks: 25,
      status: 'paused'
    },
    {
      id: '7',
      clientName: 'Anna Schmidt',
      projectName: 'Portfolio Photography Site',
      budget: 3200,
      currency: 'EUR',
      deadline: '2024-03-20',
      completedTasks: 4,
      totalTasks: 8,
      status: 'active'
    },
    {
      id: '8',
      clientName: 'Michael Brown',
      projectName: 'API Integration Module',
      budget: 9500,
      currency: 'USD',
      deadline: '2024-04-05',
      completedTasks: 7,
      totalTasks: 9,
      status: 'active'
    }
  ])

  const [loading, setLoading] = useState(true)
  const [toasts, setToasts] = useState<{id: string, message: string, type: 'success' | 'error' | 'info'}[]>([])
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  
  const [formData, setFormData] = useState({
    clientName: '',
    projectName: '',
    budget: '',
    currency: 'USD',
    deadline: '',
    totalTasks: ''
  })

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { id, message, type }])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  const handleDelete = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id))
    addToast('Project deleted successfully')
  }

  const handleEdit = (project: Project) => {
    setSelectedProject(project)
    setFormData({
      clientName: project.clientName,
      projectName: project.projectName,
      budget: project.budget.toString(),
      currency: project.currency,
      deadline: project.deadline,
      totalTasks: project.totalTasks.toString()
    })
    setShowAddForm(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedProject) {
      setProjects(prev => prev.map(p => 
        p.id === selectedProject.id 
          ? {
              ...p,
              clientName: formData.clientName,
              projectName: formData.projectName,
              budget: parseFloat(formData.budget),
              currency: formData.currency,
              deadline: formData.deadline,
              totalTasks: parseInt(formData.totalTasks)
            }
          : p
      ))
      addToast('Project updated successfully')
    } else {
      const newProject: Project = {
        id: Math.random().toString(36).substr(2, 9),
        clientName: formData.clientName,
        projectName: formData.projectName,
        budget: parseFloat(formData.budget),
        currency: formData.currency,
        deadline: formData.deadline,
        completedTasks: 0,
        totalTasks: parseInt(formData.totalTasks),
        status: 'active'
      }
      setProjects(prev => [...prev, newProject])
      addToast('New project created successfully')
    }

    setFormData({ clientName: '', projectName: '', budget: '', currency: 'USD', deadline: '', totalTasks: '' })
    setShowAddForm(false)
    setSelectedProject(null)
  }

  const handleTimeSubmit = (minutes: number, notes: string) => {
    const entry: TimeEntry = {
      id: Math.random().toString(36).substr(2, 9),
      projectId: projects[0]?.id || '1',
      minutes,
      notes,
      date: new Date().toISOString()
    }
    setTimeEntries(prev => [...prev, entry])
    addToast(`Logged ${minutes} minutes`, 'success')
  }

  const toggleDarkMode = () => {
    const html = document.documentElement
    const current = html.getAttribute('data-theme')
    const next = current === 'dark' ? 'light' : 'dark'
    html.setAttribute('data-theme', next)
    addToast(`${next === 'dark' ? 'Dark' : 'Light'} mode enabled`, 'info')
  }

  const totalRevenue = projects.reduce((sum, p) => sum + p.budget, 0)
  const activeProjects = projects.filter(p => p.status === 'active').length
  const completedProjects = projects.filter(p => p.status === 'completed').length

  return (
    <div className="min-h-screen bg-white noise">
      <div className="dot-grid fixed inset-0 pointer-events-none" />
      
      <header className="relative z-10 border-b border-black bg-white/80 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="editorial">
            <h1 className="gradient-text">FreelanceDesk</h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={toggleDarkMode}
              className="btn px-4 py-2 border border-black hover:bg-gray-100 transition-colors"
            >
              Toggle Theme
            </button>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn bg-black text-white font-medium px-6 py-2 hover:bg-gray-800 transition-colors"
            >
              {showAddForm ? 'Close Form' : 'New Project'}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {loading ? (
            <>
              <SkeletonStats />
              <SkeletonStats />
              <SkeletonStats />
            </>
          ) : (
            <>
              <div className="fade-in-up bg-white border-b-2 border-black pb-6 p-6 hover-lift" style={{'--delay': '0ms'} as React.CSSProperties}>
                <p className="text-gray-600 mb-2">Total Revenue</p>
                <p className="text-3xl font-bold">{formatCurrency(totalRevenue)}</p>
              </div>
              <div className="fade-in-up bg-white border-b-2 border-black pb-6 p-6 hover-lift" style={{'--delay': '100ms'} as React.CSSProperties}>
                <p className="text-gray-600 mb-2">Active Projects</p>
                <p className="text-3xl font-bold">{activeProjects}</p>
              </div>
              <div className="fade-in-up bg-white border-b-2 border-black pb-6 p-6 hover-lift" style={{'--delay': '200ms'} as React.CSSProperties}>
                <p className="text-gray-600 mb-2">Completed</p>
                <p className="text-3xl font-bold">{completedProjects}</p>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Projects</h2>
            
            {showAddForm && (
              <form onSubmit={handleSubmit} className="fade-in-up bg-white border-2 border-black p-6 mb-8 shadow-accent">
                <h3 className="text-xl font-bold mb-4">{selectedProject ? 'Edit Project' : 'Add New Project'}</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Client Name"
                    value={formData.clientName}
                    onChange={e => setFormData({...formData, clientName: e.target.value})}
                    className="w-full p-3 border border-gray-300 focus:outline-none focus:border-black"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={formData.projectName}
                    onChange={e => setFormData({...formData, projectName: e.target.value})}
                    className="w-full p-3 border border-gray-300 focus:outline-none focus:border-black"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Budget"
                    value={formData.budget}
                    onChange={e => setFormData({...formData, budget: e.target.value})}
                    className="w-full p-3 border border-gray-300 focus:outline-none focus:border-black"
                    required
                  />
                  <select
                    value={formData.currency}
                    onChange={e => setFormData({...formData, currency: e.target.value})}
                    className="w-full p-3 border border-gray-300 focus:outline-none focus:border-black"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={e => setFormData({...formData, deadline: e.target.value})}
                    className="w-full p-3 border border-gray-300 focus:outline-none focus:border-black"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Total Tasks"
                    value={formData.totalTasks}
                    onChange={e => setFormData({...formData, totalTasks: e.target.value})}
                    className="w-full p-3 border border-gray-300 focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="btn flex-1 bg-black text-white font-medium px-8 py-3 hover:bg-gray-800 transition-colors">
                    {selectedProject ? 'Update Project' : 'Create Project'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {setShowAddForm(false); setSelectedProject(null)}}
                    className="btn px-8 py-3 border border-black hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-6">
              {loading ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : (
                projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    delay={index * 100}
                  />
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Timer onTimeSubmit={handleTimeSubmit} />
              
              <div className="bg-white border-b-2 border-black pb-6 p-6">
                <h3 className="text-xl font-bold mb-4">Recent Time Entries</h3>
                {timeEntries.length === 0 ? (
                  <p className="text-gray-500 italic">No time entries yet</p>
                ) : (
                  <div className="space-y-3">
                    {timeEntries.slice(-5).map(entry => (
                      <div key={entry.id} className="border-b border-gray-200 pb-2 last:border-0">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{entry.minutes} min</span>
                          <span className="text-gray-500">{new Date(entry.date).toLocaleDateString()}</span>
                        </div>
                        {entry.notes && <p className="text-sm text-gray-600 mt-1">{entry.notes}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-black text-white p-6">
                <h3 className="text-xl font-bold mb-2">Invoice Generator</h3>
                <p className="text-gray-300 mb-4">Generate professional invoices with tax calculations</p>
                <button 
                  onClick={() => addToast('Invoice generated and downloaded', 'success')}
                  className="btn w-full bg-white text-black font-medium px-8 py-3 hover:bg-gray-200 transition-colors"
                >
                  Generate Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="toast-container">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  )
}