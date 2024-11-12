import '../globals.css'
import React, { ReactNode } from 'react'
import Navbar from './components/navbar'

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
        <footer className="text-center p-4 bg-[#142087] text-white">
          <p> &copy; {new Date().getFullYear()} MusicBox</p>
        </footer>
      </div>
    </body>
  </html>
)

export default Layout
