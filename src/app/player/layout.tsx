// src/app/layout.tsx

import '../globals.css'
import React, { ReactNode } from 'react'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'

interface LayoutProps {
  children: ReactNode
  title?: string
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'MusicBox' }) => (
  <html lang="en">
    <head>
      <title>{title}</title>
      <meta name="description" content="test" />
      <link rel="icon" href="/public/icons/favicon.ico" />
    </head>
    <body>
      <div className="h-screen grid grid-rows-[max-content_1fr_max-content]">
        <Navbar />
        <Sidebar />
        <main className="container mx-auto p-4">{children}</main>
        <footer className="text-center p-4 bg-[#142087] text-white">
          <p> &copy; {new Date().getFullYear()} MusicBox</p>
        </footer>
      </div>
    </body>
  </html>
)

export default Layout
