// import { LocalNotifications } from '@capacitor/local-notifications';

import { getNotificationService } from '@/hooks/getNotificationService'; // Update the path to your service

export async function checkForUpdate() {
  const { notifyUserForUpdate } = getNotificationService(); // Get the notification service
  
  try {
    // Fetch the latest version metadata
    const response = await fetch("https://vskevakis.github.io/com.entasiradio.app/version.json");
    const { latestVersion, apkUrl } = await response.json();

    const currentVersion = "1.0.0"; // Replace this with actual version retrieval logic

    if (latestVersion > currentVersion) {
        console.log("New version available");
        console.log(apkUrl)
      // Notify the user to download the new APK
      await notifyUserForUpdate(latestVersion, apkUrl);
    }
    console.log("No new version available");
  } catch (error) {
    console.error("Error checking for updates:", error);
  }
}

// Function to send notification
// async function notifyUserForUpdate(version: string, apkUrl: string) {
//   try {
//     const permissionGranted = await LocalNotifications.requestPermissions();
//     if (permissionGranted.display === 'granted') {
//       await LocalNotifications.schedule({
//         notifications: [
//           {
//             title: 'App Update Available',
//             body: `Version ${version} is available. Click to download the latest version.`,
//             id: 2,
//             channelId: 'app_update_channel',
//             largeIcon: 'res://ic_launcher', // Optional: Use your app's icon
//             actionTypeId: 'DOWNLOAD_APK',
//             attachments: [
//               { id: 'apk-url', url: apkUrl }, // Include the APK URL
//             ],
//           },
//         ],
//       });
//     } else {
//       console.warn('Notification permission not granted.');
//     }
//   } catch (error) {
//     console.error('Failed to send update notification:', error);
//   }
// }