import '../globals.css'
import React, { ReactNode } from 'react'
import Navbar from './components/navbar'
import MusicPlayerBar from '@/app/player/components/MusicPlayerBar'

interface LayoutProps {
  children: ReactNode
  title?: string
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <html lang="en">
    <body>
      <div className="h-screen grid grid-rows-[max-content_1fr_max-content]">
        <Navbar />
        <main className="container mx-auto p-4">{children}</main>
        <MusicPlayerBar />
      </div>
    </body>
  </html>
)

export default Layout
