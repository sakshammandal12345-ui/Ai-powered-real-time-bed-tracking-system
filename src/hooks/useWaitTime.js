import { useState, useEffect } from 'react';

function calculateTime(timestamp) {
  if (!timestamp) return '';
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hr ago`;
  return `${Math.floor(diffInHours / 24)} d ago`;
}

export default function useWaitTime(timestamp) {
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!timestamp) return;
    const interval = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(interval);
  }, [timestamp]);

  return calculateTime(timestamp);
}
