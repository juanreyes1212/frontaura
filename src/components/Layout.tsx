import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function Layout() {
  return (
    <div className="relative flex min-h-screen bg-base crt-scan overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-green/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan/3 blur-[120px]" />
      </div>

      <Sidebar />

      <main className="relative flex-1 overflow-y-auto min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
