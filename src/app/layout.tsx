'use client';

import './globals.css';
import Header from '../components/Header';
import BottomAppBar from '../components/BottomAppBar';
import LayoutWrapper from '@/components/LayoutWrapper';
import { SongProvider } from '@/context/SongContext'; // Import SongProvider to wrap the app
import { Capacitor, Plugins } from '@capacitor/core';
import { useEffect } from 'react';
import Head from 'next/head';

const { BackgroundTask } = Plugins;

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        </SongProvider>
      </body>
    </html>
  );
}