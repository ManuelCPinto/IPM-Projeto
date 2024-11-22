'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUsername(parsedUser.username); 
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-4xl font-bold">Welcome Home, {username || 'Guest'}!</p>
      <div className="flex flex-col gap-3">
        <p className="text-xl font-bold">Recommendation</p>
        <div className="flex flex-wrap gap-4"></div>
      </div>
    </div>
  );
}
