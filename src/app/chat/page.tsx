'use client';
import React, { useState } from 'react';

const ChatPage = () => {
  // State to track whether the chat iframe is loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // Function to handle the iframe load event
  const handleIframeLoad = () => {
    setIsLoaded(true); // Set the state to true once iframe is loaded
  };

  return (
    <div className="relative flex justify-center items-center h-screen w-screen">
      {!isLoaded && (
        // Show loading spinner while iframe is not loaded
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}
      
      {/* Chat iframe */}
      <iframe
        src="https://minnit.chat/c/RadioEntasi?embed&&nickname="
        style={{
          border: 'none',
          width: '100%',
          height: 'calc(100% - 64px)', // Adjust height for Bottom App Bar
          marginBottom: '89px',
        }}
        allowTransparency={true}
        onLoad={handleIframeLoad} // Call the load handler
      ></iframe>
    </div>
  );
};

export default ChatPage;