"use client";

import "./globals.css";
import Header from "@/components/Header";
import BottomAppBar from "@/components/BottomAppBar";
import LayoutWrapper from "@/components/LayoutWrapper";
import { SongProvider } from "@/context/SongContext";
import { useEffect } from "react";
import Head from "next/head";
import AnimatedBackground from "@/components/AnimatedBackground";
import initPushNotifications from "@/hooks/usePushNotifications";
import { createNotificationChannel } from "@/hooks/getNotificationService";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const initializeNotifications = async () => {
      await createNotificationChannel(); // Ensure the channel is created
      await initPushNotifications(); // Initialize push notifications
    };

    initializeNotifications();
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
        </SongProvider>
      </body>
    </html>
  );
}
