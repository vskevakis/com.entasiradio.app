import { Capacitor } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications/dist/esm";
import { Browser } from "@capacitor/browser"; // Ensure to import the Browser

const isNative = Capacitor.isNativePlatform();

type NotificationData = {
  actionUrl?: string;
  imageUrl?: string;
};

const CHANNEL_ID = "app_notifications_channel";
let areActionTypesRegistered = false; // Flag to check if action types are registered

export const createNotificationChannel = async () => {
  if (!isNative) return;

  const existingChannels = await LocalNotifications.listChannels();
  
  // Check if the channel already exists
  const channelExists = existingChannels.channels.some(
    (channel) => channel.id === CHANNEL_ID
  );

  if (!channelExists) {
    await LocalNotifications.createChannel({
      id: CHANNEL_ID,
      name: "Entasi Radio Notifications",
      importance: 5,
      description: "Notifications for Entasi Radio",
      sound: "default",
      vibration: true,
    });

    console.log("Notification channel created");
    await registerActionTypes(); // Register action types when creating the channel
  } else {
    console.log("Notification channel already exists");
  }
};

const registerActionTypes = async () => {
  if (!areActionTypesRegistered) {
    await LocalNotifications.registerActionTypes({
      types: [
        {
          id: "ACTION",
          actions: [
            {
              id: "open_url", // Action ID
              title: "Open URL", // Action title
            },
          ],
        },
      ],
    });
    areActionTypesRegistered = true; // Set flag to true after registering
    console.log("Action types registered");
  }
};

export const getNotificationService = async () => {
  const checkNotificationPermission = async () => {
    if (!isNative) return true; // Skip permission checks on web

    const permissionStatus = await LocalNotifications.checkPermissions();
    console.log("Notification Permission Status:", permissionStatus);
    if (permissionStatus.display !== "granted") {
      const result = await LocalNotifications.requestPermissions();
      return result.display === "granted";
    }
    return true; // Permission is already granted
  };

  await createNotificationChannel(); // Ensure the channel is created

  const notifyUserForUpdate = async (
    id: string,
    title: string,
    body: string,
    data: NotificationData = {}
  ) => {
    const hasPermission = await checkNotificationPermission();
    if (!hasPermission) {
      console.error("Notification permission not granted.");
      return;
    }

    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: title,
            body: body,
            id: parseInt(id, 10), // Ensure ID is a number
            channelId: CHANNEL_ID,
            actionTypeId: "ACTION", // Ensure this matches a defined action
            extra: {
              actionUrl: data.actionUrl || "", // Store the action URL
            },
            smallIcon: "res://ic_stat_entasilogo",
            largeIcon: data.imageUrl || "res://ic_launcher-playstore", // Fallback to app icon if imageUrl is not available
          },
        ],
      });

      console.log("Notification scheduled", data);
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  };

  // Listener for action performed on local notification
  LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
    const url = notification.notification.extra?.actionUrl; // Extract the URL
    if (url) {
      Browser.open({ url }); // Open in the browser
    } else {
      console.warn('No action URL found in the notification.');
    }
  });

  return { createNotificationChannel, notifyUserForUpdate };
};