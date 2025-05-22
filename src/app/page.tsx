'use client';
import { useEffect } from 'react';
import Counter from './components/Counter';

export default function Home() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => console.log('SW registered'))
        .catch(err => console.error('SW registration failed:', err));
    }
  }, []);
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
      <Counter />
    </main>
  );
}
