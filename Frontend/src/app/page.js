'use client';

import ThemeToggle from "@/app/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center transition-colors duration-300 relative">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
          Welcome to AuthApp
        </h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto">
          A modern authentication solution with sleek design and powerful features.
        </p>
      </div>
    </div>
  );
}
