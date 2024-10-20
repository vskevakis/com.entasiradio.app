'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ChatPage = () => {
  const [iframeElement, setIframeElement] = useState<HTMLIFrameElement | null>(null);
  const pathname = usePathname(); // Detects the current path

  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://minnit.chat/c/RadioEntasi?embed&&nickname=';
    iframe.style.position = 'absolute'; // Fullscreen positioning
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = 'calc(100% - 64px)';
    iframe.style.border = 'none'; // No border

    if (pathname === '/chat') {
      document.body.appendChild(iframe); // Add iframe to the body if on /chat
      setIframeElement(iframe);
    }

    return () => {
      // Cleanup iframe on unmount or when pathname changes
      if (iframe) document.body.removeChild(iframe);
    };
  }, [pathname]);

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