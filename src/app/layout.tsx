'use client';

import './globals.css';
import Header from '@/components/Header';
import BottomAppBar from '@/components/BottomAppBar';
import LayoutWrapper from '@/components/LayoutWrapper';
import { SongProvider } from '@/context/SongContext'; // Import SongProvider to wrap the app
import { Capacitor, Plugins } from '@capacitor/core';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Dynamically import ChatPage without SSR to preload it
const ChatPage = dynamic(() => import('./chat/page'), { ssr: false });

const { BackgroundTask } = Plugins;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isChatLoaded, setIsChatLoaded] = useState(false);

  useEffect(() => {
    // Preload ChatPage once the app loads
    setIsChatLoaded(true); // This flag ensures that the chat page loads once the app starts
  }, []);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      if (BackgroundTask && typeof BackgroundTask.beforeExit === 'function') {
        const taskId = BackgroundTask.beforeExit(async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          BackgroundTask.finish({ taskId });
        });
      }
    }
  }, []);

  return (
    <html lang="en">
      <Head>
        <title>Entasi Radio</title>
        <meta name="description" content="Listen to the best music!" />
      </Head>
      <body
        style={{
          background:
            'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(90,0,130,1) 36%, rgba(168,14,205,1) 60%, rgba(34,34,34,1) 100%)',
        }}
        className="text-white h-screen flex flex-col"
      >
        <SongProvider>
          <Header />
          <LayoutWrapper>{children}</LayoutWrapper>
          <BottomAppBar /> {/* Include the Bottom App Bar */}
          {/* Preload Chat Page */}
          {isChatLoaded && (
            <div style={{ display: 'none' }}>
              <ChatPage />
            </div>
          )}
        </SongProvider>
      </body>
    </html>
  );
}