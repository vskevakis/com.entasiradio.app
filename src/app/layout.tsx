// Import the version check function
'use client';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Browser } from '@capacitor/browser';

import './globals.css';
import Header from '@/components/Header';
import BottomAppBar from '@/components/BottomAppBar';
import LayoutWrapper from '@/components/LayoutWrapper';
import { SongProvider } from '@/context/SongContext';
import { Capacitor } from '@capacitor/core';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { checkForUpdate } from '@/utils/versionCheck';

export const setupNotificationListeners = () => {
  LocalNotifications.addListener('localNotificationActionPerformed', async (notification) => {
    console.log('Notification clicked:', notification); // Log to check interaction
    if (notification.notification.actionTypeId === 'DOWNLOAD_APK') {
      console.log(notification.notification.attachments)
      const apkUrl = notification.notification.attachments?.find(att => att.id === 'apk-url')?.url;
      if (apkUrl) {
        console.log('Opening APK URL:', apkUrl); // Log to confirm URL
        await Browser.open({ url: apkUrl });
      }
    }
  });
};

const ChatPage = dynamic(() => import('./chat/page'), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isChatLoaded, setIsChatLoaded] = useState(false);

  useEffect(() => {
    // Preload ChatPage once the app loads
    setIsChatLoaded(true); 
  }, []);

  useEffect(() => {
    // Call the version check function on native platforms
    if (Capacitor.isNativePlatform()) {
      setupNotificationListeners();
      checkForUpdate();
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

