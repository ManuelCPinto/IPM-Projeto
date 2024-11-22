import { User } from '@/database/entities/user';

export function UserCard({ user }: { user: User }) {
  return (
    <div className="flex flex-col items-center w-40 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer">
      <div className="relative w-full h-36">
        <img
          src="/profile-placeholder.png" // Use a placeholder or a user-specific image
          alt={`${user.name}'s Profile`}
          className="rounded-t-lg w-full h-full object-cover"
        />
      </div>
      <div className="px-2 py-3 text-center">
        <p className="text-sm font-bold text-white">{user.name}</p>
        <p className="text-xs text-gray-400">{user.type === 'artist' ? 'Artist' : 'User'}</p>
        <p className="text-xs text-gray-400">{user.email}</p>
      </div>
    </div>
  );
}
