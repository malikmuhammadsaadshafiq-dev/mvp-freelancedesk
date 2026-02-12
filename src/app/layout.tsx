import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FreelanceDesk - Project Workspace',
  description: 'All-in-one project workspace combining time tracking, invoice generation, and client progress dashboards',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}