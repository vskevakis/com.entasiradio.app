'use client';

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Sidemenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Toggle the menu open/close state
  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  // Close the menu when clicking outside of the menu buttons
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  // Attach and remove event listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      {/* Menu button */}
      {!isOpen && (
        <button
          onClick={handleMenuToggle}
          className="fixed top-4 right-4 bg-gradient-to-br from-green-500 to-blue-400 text-white p-2 rounded-full z-[9999] shadow-lg hover:scale-105 transition-transform"
        >
          Menu
        </button>
      )}

      {/* Simple menu with Player and Chat buttons */}
      {isOpen && (
        <div
          ref={menuRef} // Use ref to detect outside clicks
          className="fixed top-4 right-4 flex flex-col space-y-4 z-[9999]"
        >
          <motion.button
            onClick={handleMenuToggle}
            className="w-48 p-2 text-white rounded-full shadow-lg bg-gradient-to-br from-purple-600 to-purple-800 hover:scale-105 transition-transform"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            Close
          </motion.button>

          <Link href="/">
            <motion.button
              className="w-48 p-2 text-white rounded-full shadow-lg bg-gradient-to-br from-purple-600 to-purple-800 hover:scale-105 transition-transform"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Player
            </motion.button>
          </Link>

          <Link href="/chat">
            <motion.button
              className="w-48 p-2 text-white rounded-full shadow-lg bg-gradient-to-br from-purple-600 to-purple-800 hover:scale-105 transition-transform"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              Chat
            </motion.button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidemenu;