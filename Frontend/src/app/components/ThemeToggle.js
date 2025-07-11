'use client';

import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSunnyOutline } from 'react-icons/io5';
import { BsMoonStars } from 'react-icons/bs';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-9 h-9" />;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="flex items-center justify-center w-9 h-9 rounded-md bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground border"
      aria-label="Toggle Theme"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={theme}
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          exit={{ rotate: 180, scale: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'light' ? <BsMoonStars className="text-md" /> : <IoSunnyOutline className="text-md" />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
