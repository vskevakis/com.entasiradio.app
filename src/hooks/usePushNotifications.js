import { PushNotifications } from "@capacitor/push-notifications";
import { getNotificationService } from "@/hooks/getNotificationService"; // Adjust the import based on your file structure

const initPushNotifications = async () => {
  const { notifyUserForUpdate } = await getNotificationService(); // Initialize notification service

  // Request permission for push notifications
  const result = await PushNotifications.requestPermissions();
  if (result.receive === "granted") {
    PushNotifications.register(); // Register for push notifications
  } else {
    console.log("Push notification permission denied");
    return; // Exit if permission is denied
  }

  // Handle successful registration
  PushNotifications.addListener("registration", (token) => {
    console.log("Registration token: ", JSON.stringify(token));
    // Optionally send the token to your server or use it for FCM
  });

  // Handle push notification received
  PushNotifications.addListener(
    "pushNotificationReceived",
    async (notification) => {
      try {
        console.log(
          "Push notification received: ",
          JSON.stringify(notification)
        );
        const { id, title, body, data } = notification; // Assuming these are passed in the notification payload
        if (!data) {
          console.warn("Notification data is null");
          return; // Exit if data is null
        }

        // Call notifyUserForUpdate to display the notification
        await notifyUserForUpdate(id, title, body, data); // Use the method from the notification service
      } catch (error) {
        console.error("Error handling push notification: ", error);
      }
    }
  );

  // Handle action performed on push notification
  PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
    console.log('Push notification action performed: ', notification);
    
    // Open the URL in the device's browser
    const url = notification.notification.extra?.actionUrl; // Extract the URL
    if (url) {
      Browser.open({ url }); // Open in the browser
    }
  });

//   LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
//     console.log('Local notification action performed: ', JSON.stringify(notification));

    
//     try {
//       const url = notification.extra?.actionUrl; // Extract the URL
//       console.log('URL: ', url);
//       if (url) {
//         Browser.open({ url }); // Open in the browser
//       }
//     } catch (error) {
//       console.error("Error handling local notification action: ", error);
//     }
//   });

};

export default initPushNotifications;
