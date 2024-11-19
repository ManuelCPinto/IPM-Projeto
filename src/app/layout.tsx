import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.css'
import { CustomToaster } from '@/components/CustomToaster'
import { MaterialSetup } from '@/components/MaterialSetup'

export const metadata: Metadata = {
  title: 'MusicBox',
  description: 'A ratings-based music player',
  icons: 'logo.png'
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <MaterialSetup>{children}</MaterialSetup>
        <CustomToaster />
      </body>
    </html>
  )
}
