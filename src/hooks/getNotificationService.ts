import { LocalNotifications } from '@capacitor/local-notifications/dist/esm';


export const getNotificationService = () => {
  const checkNotificationPermission = async () => {
    const permissionStatus = await LocalNotifications.checkPermissions();
    console.log('Notification Permission Status:', permissionStatus); // Add this log to check
    if (permissionStatus.display !== 'granted') {
      const result = await LocalNotifications.requestPermissions();
      return result.display === 'granted';
    }
    return true; // Permission is already granted
  };
  
    const createNotificationChannel = async () => {
      await LocalNotifications.createChannel({
        id: 'app_update_channel',
        name: 'Entasi Radio Updates',
        importance: 5,
        description: 'Notifications for app updates',
        sound: undefined,
        vibration: true,
      });
      console.log('Notification channel created'); // Log to confirm creation
    };
  
    const notifyUserForUpdate = async (version: string, apkUrl: string) => {
      await createNotificationChannel(); // Ensure the channel is created
      
      const hasPermission = await checkNotificationPermission();
      if (!hasPermission) {
        console.error('Notification permission not granted.');
        return;
      }
    
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'App Update Available',
            body: `Version ${version} is available. Click to download.`,
            id: 2,
            channelId: 'app_update_channel',
            actionTypeId: 'DOWNLOAD_APK',
            attachments: [
              { id: 'apk-url', url: apkUrl }, // Include the APK URL in the notification
            ],
            largeIcon: 'res://ic_launcher', // Optional: Replace with your app icon
          },
        ],
      });
      console.log('Notification scheduled', apkUrl); // Log to confirm scheduling
    };
  
    return { createNotificationChannel, notifyUserForUpdate };
  };