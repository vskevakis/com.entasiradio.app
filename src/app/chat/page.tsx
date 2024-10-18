import React from 'react';

const ChatPage = () => {
  return (
    <div className="relative flex justify-center items-center h-screen w-screen">
      <iframe
        src="https://minnit.chat/c/RadioEntasi?embed&&nickname="
        style={{
          border: 'none',
          width: '100%',
          height: 'calc(100% - 64px)', // Subtract the height of the Bottom App Bar (adjust this value based on your actual height)
          marginBottom: '89px', // Add margin at the bottom to create space for the Bottom App Bar
        }}
        allowTransparency={true}
      ></iframe>
    </div>
  );
};

export default ChatPage;