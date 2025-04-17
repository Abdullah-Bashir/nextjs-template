'use client';

import ThemeToggle from "@/app/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 to-blue-500 dark:from-gray-900 dark:to-gray-800 text-white transition-all duration-300 relative">
      {/* Toggle Button in top-right */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-md mb-4">
          Welcome to AuthApp
        </h1>
        <p className="text-lg md:text-xl text-gray-200 dark:text-gray-300 max-w-xl mx-auto">
          A modern authentication solution with sleek design and powerful features.
        </p>
      </div>
    </div>
  );
}
