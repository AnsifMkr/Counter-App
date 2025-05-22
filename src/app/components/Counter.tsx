'use client';

import { useEffect, useState } from 'react';
import { getInitialTheme, applyTheme } from '../utils/theme';

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getInitialTheme());
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>('0');

  // Load saved count on mount
  useEffect(() => {
    const stored = localStorage.getItem('counter');
    if (stored) {
      setCount(parseInt(stored, 10));
      setEditValue(stored);
    }
  }, []);

  // Persist count whenever it changes
  useEffect(() => {
    localStorage.setItem('counter', count.toString());
  }, [count]);

  // Apply theme on mount and whenever `theme` changes
  useEffect(() => {
    // guard for SSR
    if (typeof window !== 'undefined') {
      applyTheme(theme);
    }
  }, [theme]);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as 'light' | 'dark');
  };

  const handleEditSubmit = () => {
    const num = parseInt(editValue, 10);
    if (!isNaN(num)) {
      setCount(num);
      setIsEditing(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-md relative">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-4">
        {/* Edit */}
        {isEditing ? (
          <button
            onClick={handleEditSubmit}
            className="text-sm text-blue-500 underline hover:text-blue-700"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => {
              setEditValue(count.toString());
              setIsEditing(true);
            }}
            className="text-sm text-blue-500 underline hover:text-blue-700"
          >
            Edit
          </button>
        )}

        {/* Theme selector */}
        <select
          value={theme}
          onChange={handleThemeChange}
          className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-sm"
        >
          <option value="light">☀️ Light</option>
          <option value="dark">🌙 Dark</option>
        </select>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-3 text-center">Counter</h1>

      {/* Display / Edit */}
      <div className="text-center text-5xl font-mono mb-4">
        {isEditing ? (
          <input
            type="number"
            className="w-28 px-2 py-1 text-4xl text-center border rounded bg-gray-100 dark:bg-gray-700"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleEditSubmit()}
          />
        ) : (
          <span>{count}</span>
        )}
      </div>

      {/* – and + */}
      <div className="flex justify-between gap-4 mb-4">
        <button
          onClick={() => setCount(c => c - 1)}
          className="px-10 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-lg"
        >
          −
        </button>
        <button
          onClick={() => setCount(c => c + 1)}
          className="px-10 py-2 bg-green-500 hover:bg-green-600 text-white rounded text-lg"
        >
          +
        </button>
      </div>

      {/* Reset */}
      <div className="text-center">
        <button
          onClick={() => setCount(0)}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
