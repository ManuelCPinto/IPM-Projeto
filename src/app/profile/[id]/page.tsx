'use client'

import React, { useState, useEffect } from 'react'
import ProfileHeader from '../components/profileHeader'
import PlaylistCarousel from '../components/playlistCarousel'
import Link from 'next/link'
import FollowersSection from '../components/followersSection'
import FollowingSection from '../components/followingSection'
import { toast } from 'react-hot-toast'
import { User } from '@/database/schema'

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null) // Logged-in user
  const [profile, setProfile] = useState<User | null>(null) // Profile being viewed
  const [playlists, setPlaylists] = useState<any[]>([])
  const [followers, setFollowers] = useState<User[]>([])
  const [following, setFollowing] = useState<User[]>([])
  const [isFollowing, setIsFollowing] = useState(false) // Follow state
  const [activeTab, setActiveTab] = useState('Public Playlists')

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  // Fetch playlists
  const fetchPlaylists = async (username: string) => {
    try {
      const res = await fetch(`/api/user/${username}/playlists`)
      if (!res.ok) {
        throw new Error('Failed to fetch playlists')
      }
      const data = await res.json()

      setPlaylists(data.playlists || [])
    } catch (error) {
      console.error('Error fetching playlists:', error)
      toast.error('Failed to fetch playlists')
    }
  }

  // Fetch followers
  const fetchFollowers = async (username: string) => {
    try {
      const res = await fetch(`/api/user/${username}/followers`)
      if (!res.ok) {
        throw new Error('Failed to fetch followers')
      }
      const data = await res.json()

      setFollowers(data.followers || [])
    } catch (error) {
      console.error('Error fetching followers:', error)
      toast.error('Failed to fetch followers')
    }
  }

  // Fetch following
  const fetchFollowing = async (username: string) => {
    try {
      const res = await fetch(`/api/user/${username}/following`)
      if (!res.ok) {
        throw new Error('Failed to fetch following')
      }
      const data = await res.json()

      setFollowing(data.following || [])
    } catch (error) {
      console.error('Error fetching following:', error)
      toast.error('Failed to fetch following')
    }
  }

  // Fetch the profile being viewed
  const fetchProfile = async (username: string) => {
    try {
      const res = await fetch(`/api/user/${username}`)
      if (!res.ok) {
        throw new Error('Failed to fetch profile')
      }
      const data = await res.json()
      setProfile(data.user)
    } catch (error) {
      console.error('Error fetching profile:', error)
      toast.error('Failed to fetch profile')
    }
  }

  // Check if the logged-in user is following the profile user
  const checkIfFollowing = async (follower: string, following: string) => {
    try {
      const res = await fetch(`/api/user/${follower}/following`)
      if (!res.ok) {
        throw new Error('Failed to fetch following list')
      }
      const data = await res.json()
      const isFollowed = data.following.some((follow: User) => follow.username === following)
      setIsFollowing(isFollowed)
    } catch (error) {
      console.error('Error checking follow status:', error)
      toast.error('Failed to check follow status')
    }
  }

  // Follow or unfollow action
  const toggleFollowUser = async () => {
    if (!user || !profile) return

    if (isFollowing) {
      // Unfollow confirmation
      const confirmUnfollow = window.confirm(`Are you sure you want to unfollow ${profile.name}?`)
      if (!confirmUnfollow) return

      try {
        const res = await fetch(`/api/user/${profile.username}/follow`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-username': user.username
          }
        })

        if (!res.ok) {
          throw new Error('Failed to unfollow user')
        }

        toast.success(`You have unfollowed ${profile.name}`)
        setIsFollowing(false) // Update follow state
        fetchFollowers(profile.username) // Optionally refetch followers
      } catch (error) {
        console.error('Error unfollowing user:', error)
        toast.error('Failed to unfollow user')
      }
    } else {
      // Follow action
      try {
        const res = await fetch(`/api/user/${profile.username}/follow`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-username': user.username
          }
        })

        if (!res.ok) {
          throw new Error('Failed to follow user')
        }

        toast.success(`You are now following ${profile.name}`)
        setIsFollowing(true) // Update follow state
        fetchFollowers(profile.username) // Optionally refetch followers
      } catch (error) {
        console.error('Error following user:', error)
        toast.error('Failed to follow user')
      }
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser)
      setUser(parsedUser)

      const currentProfileUsername = window.location.pathname.split('/').pop() // Get the username from the URL
      if (currentProfileUsername) {
        fetchProfile(currentProfileUsername)
        fetchPlaylists(currentProfileUsername)
        fetchFollowers(currentProfileUsername)
        fetchFollowing(currentProfileUsername)
        checkIfFollowing(parsedUser.username, currentProfileUsername)
      }
    } else {
      toast.error('User not logged in')
    }
  }, [])

  if (!profile) {
    return <p>Loading...</p>
  }

  return (
    <div className="min-h-screen bg-neutral-900 bg-[radial-gradient(ellipse_75%_75%_at_50%_50%,rgba(30,30,50,0.6),rgba(15,15,30,1),rgba(5,5,15,1))] shadow-lg text-white p-8">
      {/* Profile Header */}
      <div className="relative">
        <ProfileHeader user={profile} />
        {/* Buttons inside Header */}
        <div className="absolute top-6 right-6 flex gap-4">
          {user?.username !== profile.username && (
            <button
              onClick={toggleFollowUser}
              className={`px-4 py-2 rounded-md font-semibold transition ${
                isFollowing ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          )}
          {profile.type === 'artist' && user?.username === profile.username && (
            <Link href={`/profile/${profile.username}/stats`}>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition font-semibold">
                View Statistics
              </button>
            </Link>
          )}

          {user?.username === profile.username && (
            <Link href={`/profile/${profile.username}/settings`}>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition font-semibold">
                Profile Settings
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center space-x-8 border-b border-gray-700 pb-2 mt-8">
        {['Public Playlists', 'Following', 'Followers'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`text-lg font-semibold transition-all ${
              activeTab === tab ? 'text-white border-b-2 border-blue-700' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content */}
      {activeTab === 'Public Playlists' && (
        <div className="space-y-8 mt-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">Playlists</h3>
              <Link href={`/profile/${profile.username}/stats`}>
                <button className="px-4 py-2 bg-blue-600 rounded-md hover:bg-purple-700 transition">See All</button>
              </Link>
            </div>
            <PlaylistCarousel playlists={playlists} />
          </div>
        </div>
      )}

      {activeTab === 'Following' && <FollowingSection following={following} />}
      {activeTab === 'Followers' && <FollowersSection followers={followers} />}
    </div>
  )
}

export default ProfilePage
