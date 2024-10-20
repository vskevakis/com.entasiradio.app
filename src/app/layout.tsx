'use client';

import './globals.css';
import Header from '@/components/Header';
import BottomAppBar from '@/components/BottomAppBar';
import LayoutWrapper from '@/components/LayoutWrapper';
import { SongProvider } from '@/context/SongContext';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import AnimatedBackground from '@/components/AnimatedBackground';
import initPushNotifications from '@/hooks/usePushNotifications';
import { createNotificationChannel } from '@/hooks/getNotificationService';


// Dynamically import ChatPage without SSR to preload it
const ChatPage = dynamic(() => import('./chat/page'), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [iframeLoaded, setIframeLoaded] = useState(false); // Track iframe load status

  useEffect(() => {
    const initializeNotifications = async () => {
      await createNotificationChannel(); // Ensure the channel is created
      await initPushNotifications(); // Initialize push notifications
    };

    initializeNotifications();
  }, []);

  useEffect(() => {
    // Preload the iframe once the app loads
    const iframe = document.createElement('iframe');
    iframe.src = 'https://minnit.chat/c/RadioEntasi?embed&&nickname=';
    iframe.style.display = 'none'; // Hide the iframe initially
    iframe.onload = () => setIframeLoaded(true); // Mark iframe as loaded once it's ready
    document.body.appendChild(iframe);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(iframe);
    };
  }, []);

  return (
    <html lang="en">
      <Head>
        <title>Entasi Radio</title>
        <meta name="description" content="Listen to the best music!" />
      </Head>
      <body className="text-white h-screen flex flex-col">
        <SongProvider>
          <Header />
          <AnimatedBackground>
            <LayoutWrapper>{children}</LayoutWrapper>
          </AnimatedBackground>
          <BottomAppBar />
          {iframeLoaded && (
            <div style={{ display: 'none' }}>
              <ChatPage />
            </div>
          )}
        </SongProvider>
      </body>
    </html>
  );
}