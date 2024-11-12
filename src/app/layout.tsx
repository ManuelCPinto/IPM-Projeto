// src/app/layout.tsx

import './globals.css'
import React, { ReactNode } from 'react'
import Navbar from './components/navbar'

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
    <body className="bg-gray-100">
      <Navbar/>
      <main className="container mx-auto p-4">{children}</main>
      <footer className="text-center p-4 bg-blue-600 text-white">
        <p> &copy; {new Date().getFullYear()} MusicBox</p>
      </footer>
    </body>
  </html>
)

export default Layout 
