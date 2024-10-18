import { LocalNotifications } from '@capacitor/local-notifications';
import { Filesystem, Directory } from '@capacitor/filesystem';

const downloadImageToCache = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result as string;
        const fileName = `artist_image_${Date.now()}.png`;

        try {
          const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data.split(',')[1],
            directory: Directory.Cache,
          });

          resolve(savedFile.uri);
        } catch (err) {
          reject('Error saving file to cache: ' + err);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error downloading image:', error);
    return null;
  }
};

export const useNotificationService = () => {
  const checkNotificationPermission = async () => {
    const permissionStatus = await LocalNotifications.checkPermissions();
    if (permissionStatus.display !== 'granted') {
      const result = await LocalNotifications.requestPermissions();
      return result.display === 'granted';
    }
    return true; // Permission is already granted
  };

  const createNotificationChannel = async () => {
    await LocalNotifications.createChannel({
      id: 'music_player_channel',
      name: 'Music Player Notifications',
      importance: 5,
      description: 'Notifications for currently playing music',
      sound: undefined,
      vibration: true,
    });
  };

  const updateNotificationWithImage = async (name: string, artists: string, album: string, imageUrl: string) => {
    const hasPermission = await checkNotificationPermission();
    if (!hasPermission) {
      console.error('Notification permission not granted.');
      return;
    }

    const localImageUri = await downloadImageToCache(imageUrl);

    if (!localImageUri) {
      console.error('Failed to fetch image');
      return;
    }

    console.log('Scheduling notification for song:', name, artists, album);


    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Now Playing',
          body: `${name} - ${artists} (${album})`,
          id: 1,
          channelId: 'music_player_channel',
          ongoing: true,
          autoCancel: false,
          largeIcon: localImageUri,
        },
      ],
    });
  };

  const cancelNotification = async () => {
    await LocalNotifications.cancel({ notifications: [{ id: 1 }] });
  };

  return { createNotificationChannel, updateNotificationWithImage, cancelNotification };
};