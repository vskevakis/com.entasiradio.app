'use client';

import './globals.css';
import Header from '@/components/Header';
import BottomAppBar from '@/components/BottomAppBar';
import LayoutWrapper from '@/components/LayoutWrapper';
import { SongProvider } from '@/context/SongContext';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
// import { motion, useAnimation } from 'framer-motion';
import Head from 'next/head';
import AnimatedBackground from '@/components/AnimatedBackground';
// import { Capacitor } from '@capacitor/core';

// Dynamically import ChatPage without SSR to preload it
const ChatPage = dynamic(() => import('./chat/page'), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isChatLoaded, setIsChatLoaded] = useState(false);

  useEffect(() => {
    // Preload ChatPage once the app loads
    setIsChatLoaded(true); 
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