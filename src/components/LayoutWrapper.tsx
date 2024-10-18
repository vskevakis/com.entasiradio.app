'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Check if the current page is the chat page
  const isChatPage = pathname === '/chat';

  return (
    <main
      className={`${
        isChatPage
          ? 'w-full h-full' // Full screen for chat page
          : 'flex-grow flex flex-col items-center justify-center mt-[80px]' // No padding, centered layout for other pages
      }`}
    >
      {children}
    </main>
  );
};

export default LayoutWrapper;