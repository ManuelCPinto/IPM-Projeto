'use client'

import Image from 'next/image'
import Link from 'next/link'
import Center from '@/components/Center'
import logo from '@/public/logo.png'

export default function Home() {
  return (
    <Center className="h-screen gap-5">
      <Image src={logo} height={250} alt="App logo" />
      <p className="text-4xl font-bold">MusicBox</p>
      <div className="flex gap-4">
        <Link href="/login" className="px-4 py-1 rounded bg-white/50 hover:bg-white/35 transition">
          Login
        </Link>
        <Link href="/register" className="px-4 py-1 rounded bg-white/50 hover:bg-white/35 transition">
          Register
        </Link>
      </div>
    </Center>
  )
}
