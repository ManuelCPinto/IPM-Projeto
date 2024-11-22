// src/app/homepage/page.tsx

'use client'

import React, { useEffect, useState } from 'react'

interface HomepageData {
  message: string
  timestamp: string
}

const Homepage: React.FC = () => {
  const [data, setData] = useState<HomepageData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const response = await fetch('/api/mainController', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Something went wrong!')
        }

        const data = await response.json()
        setData(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load homepage data.')
        console.error('Error fetching homepage data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchHomepageData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading homepage...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center bg-white">
      <h1 className="text-3xl font-bold">{data?.message}</h1>
    </div>
  )
}

export default Homepage
