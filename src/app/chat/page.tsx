'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ChatPage = () => {
  const [iframeElement, setIframeElement] = useState<HTMLIFrameElement | null>(null);
  const pathname = usePathname(); // Detects the current path

  useEffect(() => {
    // Get the preloaded iframe and cast it to HTMLIFrameElement
    const iframe = document.querySelector('iframe[src*="https://minnit.chat/c/RadioEntasi"]') as HTMLIFrameElement;
    
    if (iframe) {
      if (pathname === '/chat') {
        // Show the iframe only when the user navigates to /chat
        iframe.style.display = 'block';
        iframe.style.position = 'absolute'; // Fullscreen positioning
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = 'calc(100% - 64px)';
        iframe.style.border = 'none'; // No border
        setIframeElement(iframe);
      } else {
        // Hide the iframe when not on the chat page
        iframe.style.display = 'none';
      }
    }

    return () => {
      // Optionally hide the iframe when leaving the chat page
      if (iframe) iframe.style.display = 'none';
    };
  }, [pathname]); // Depend on the current path to control iframe visibility

  return (
    <div className="relative flex justify-center items-center h-screen w-screen">
      {!iframeElement && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;