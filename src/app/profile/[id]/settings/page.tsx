'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const settingsTabs = [
  {
    group: 'User Settings',
    tabs: [
      { id: 'edit-profile', name: 'Edit Profile' },
      { id: 'followers', name: 'Followers' },
      { id: 'blocked-accounts', name: 'Blocked/Muted Accounts' },
      { id: 'privacy-safety', name: 'Privacy & Safety' },
    ],
  },
  {
    group: 'App Settings',
    tabs: [
      { id: 'language', name: 'Language' },
      { id: 'video', name: 'Video' },
      { id: 'social', name: 'Social' },
      { id: 'streaming', name: 'Streaming' },
    ],
  },
];

const SettingsPage = ({ }: { params: { id: string } }) => {
  const [activeTab, setActiveTab] = useState('edit-profile');
  const [followersTab, setFollowersTab] = useState<'followers' | 'following'>('followers');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'edit-profile':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4 text-white">Edit Profile</h2>
            <div className="space-y-8">
              {/* Profile Picture */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500">
                  <Image
                    src="/Squidward.jpeg" // Replace with dynamic profile picture path
                    alt="Current Profile Picture"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Profile Picture</label>
                  <input
                    type="file"
                    className="block w-full text-white bg-gray-800 border border-gray-700 rounded"
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="block text-gray-300 mb-2">Username</label>
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    className="flex-1 text-white bg-gray-800 border border-gray-700 rounded px-3 py-2"
                    placeholder="New Username"
                  />
                  <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
                    Confirm
                  </button>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-300 mb-2">Password</label>
                <div className="flex items-center gap-4">
                  <input
                    type="password"
                    className="flex-1 text-white bg-gray-800 border border-gray-700 rounded px-3 py-2"
                    placeholder="New Password"
                  />
                  <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'followers':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4 text-white">
              {followersTab === 'followers' ? 'Followers' : 'Following'}
            </h2>
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setFollowersTab('followers')}
                className={`${
                  followersTab === 'followers' ? 'text-white' : 'text-gray-400'
                } font-bold border-b-2 pb-2 ${
                  followersTab === 'followers' ? 'border-white' : 'border-transparent'
                }`}
              >
                Followers
              </button>
              <button
                onClick={() => setFollowersTab('following')}
                className={`${
                  followersTab === 'following' ? 'text-white' : 'text-gray-400'
                } font-bold border-b-2 pb-2 ${
                  followersTab === 'following' ? 'border-white' : 'border-transparent'
                }`}
              >
                Following
              </button>
            </div>
            <div className="text-white">
              {followersTab === 'followers'
                ? 'List of people who follow this user.'
                : 'List of people this user follows.'}
            </div>
          </div>
        );
      default:
        return <div className="text-gray-400">Settings content here</div>;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-neutral-900 bg-[radial-gradient(ellipse_75%_75%_at_50%_50%,rgba(30,30,50,0.6),rgba(15,15,30,1),rgba(5,5,15,1))] shadow-lg text-white">
      {/* Centered Container */}
      <div className="w-[80%] max-w-5xl h-[90%] bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-gray-900 p-6 space-y-8 overflow-y-auto">
            {settingsTabs.map((group) => (
              <div key={group.group}>
                <h3 className="text-gray-400 text-sm uppercase font-bold mb-2">{group.group}</h3>
                <div className="space-y-2">
                  {group.tabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`block w-full text-left px-3 py-2 rounded ${
                        activeTab === tab.id
                          ? 'bg-gray-700 text-white'
                          : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">{renderTabContent()}</div>
        </div>
      </div>
      {/* Back Button */}
      <button
        className="absolute top-4 left-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        onClick={() => window.history.back()}
      >
        Back
      </button>
    </div>
  );
};

export default SettingsPage;
