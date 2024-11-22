import '../globals.css'
import React, { PropsWithChildren } from 'react'
import Navbar from './components/navbar'
import MusicPlayerBar from '@/app/player/components/MusicPlayerBar'
import Sidebar from './components/sidebar'

export default function Layout({ children }: PropsWithChildren<{ title?: string }>) {
  return (
    <div className="grid h-screen grid-rows-[max-content_1fr_max-content] grid-cols-[max-content_1fr] gap-0">
      {/* Navbar */}
      <div className="col-span-2">
        <Navbar />
      </div>
      <Sidebar />
      {/* Content Area */}
      <main className="grid p-8 overflow-y-auto bg-neutral-900 bg-[radial-gradient(ellipse_75%_75%_at_50%_50%,rgba(30,30,50,0.6),rgba(15,15,30,1),rgba(5,5,15,1))] shadow-lg">
        {children}
      </main>
      {/* Music Player */}
      <footer className="col-span-2">
        <MusicPlayerBar />
      </footer>
    </div>
  )
}
