import { useCallback, useEffect } from "react";
import { CapacitorMusicControls } from "capacitor-music-controls-plugin";

export const useMusicControls = (
  audio: HTMLAudioElement | null,
  isPlaying: boolean,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  cancelNotification: () => void
) => {
  const handleControlsEvent = (message: string) => {
    console.log("Handling media control event:", message);

    switch (message) {
      case "music-controls-pause":
        if (audio && isPlaying) {
          audio.pause();
          setIsPlaying(false);
          CapacitorMusicControls.updateIsPlaying({ isPlaying: false });
        }
        break;
      case "music-controls-play":
        if (audio && !isPlaying) {
          audio.play();
          setIsPlaying(true);
          CapacitorMusicControls.updateIsPlaying({ isPlaying: true });
        }
        break;
      case "music-controls-destroy":
        cancelNotification();
        CapacitorMusicControls.destroy();
        break;
      default:
        console.warn("Unknown media control action:", message);
        break;
    }
  };

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const updateMusicControls = useCallback(
    (song: any) => {
      CapacitorMusicControls.create({
        track: song.name,
        artist: song.artists,
        cover: song.image,
        isPlaying,
        dismissable: true,
        hasPrev: false,
        hasNext: false,
        hasClose: true,
        playIcon: "media_play",
        pauseIcon: "media_pause",
        notificationIcon: "notification",
      });

      // iOS event listener
      CapacitorMusicControls.addListener(
        "controlsNotification",
        (info: { message: string }) => {
          handleControlsEvent(info.message);
        }
      );
    },
    [isPlaying, handleControlsEvent]
  );
  

  // Add Android media control listener
  useEffect(() => {
    const androidControlHandler = (event: any) => {
      const message = event.message;
      if (message) {
        handleControlsEvent(message);
      }
    };

    // Register Android media control event listener
    document.addEventListener("controlsNotification", androidControlHandler);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("controlsNotification", androidControlHandler);
    };
  }, [handleControlsEvent]);
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return { handleControlsEvent, updateMusicControls };
};