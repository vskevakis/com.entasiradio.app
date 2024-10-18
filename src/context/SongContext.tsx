import {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef,
    useCallback,
  } from "react";
  import { useNotificationService } from "@/hooks/useNotificationService";
  import { CapacitorMusicControls } from "capacitor-music-controls-plugin";
  
  interface Song {
    name: string;
    artists: string;
    album: string;
    image: string;
    link: string;
  }
  
  interface SongContextType {
    currentSong: Song | null;
    error: boolean;
    isPlaying: boolean;
    togglePlay: () => void;
    refreshStream: () => void;
    audio: HTMLAudioElement | null;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  const SongContext = createContext<SongContextType | undefined>(undefined);
  
  export const SongProvider = ({ children }: { children: React.ReactNode }) => {
    const { updateNotificationWithImage, cancelNotification } =
      useNotificationService();
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [error, setError] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const previousSongRef = useRef<Song | null>(null);
  
    // Function to handle media control events
    const handleControlsEvent = (message: string) => {
      console.log("Handling media control event:", message);
  
      switch (message) {
        case "music-controls-pause":
          if (audio && isPlaying) {
            audio.pause();
            setIsPlaying(false);
            CapacitorMusicControls.updateIsPlaying({
                isPlaying: false,
              });
          }
          break;
        case "music-controls-play":
          if (audio && !isPlaying) {
            audio.play();
            setIsPlaying(true);
            CapacitorMusicControls.updateIsPlaying({
                isPlaying: true,
              });
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
  
    // Setup the music controls with actions
    const updateMusicControls = useCallback(
      (song: Song) => {
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
  
    /* eslint-disable @typescript-eslint/no-explicit-any */
    useEffect(() => {
      console.log("Registering Android media control listener...");
  
      document.addEventListener("controlsNotification", (event: Event) => {
        console.log("Android media control event received:", event);
  
        // Extract the message directly from the event object
        const message = (event as any).message;
  
        if (message) {
          console.log(
            "Valid message received from Android media control event:",
            message
          );
          handleControlsEvent(message);
        } else {
          console.warn(
            "No valid message received from Android media control event"
          );
        }
      });
  
      // Cleanup the event listener on unmount
      return () => {
        document.removeEventListener("controlsNotification", () => {});
      };
    }, [handleControlsEvent]);
    /* eslint-enable @typescript-eslint/no-explicit-any */
  
    // Play or pause audio and update Music Controls
    const togglePlay = useCallback(() => {
      if (audio) {
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
          cancelNotification();
  
          CapacitorMusicControls.updateIsPlaying({
            isPlaying: false,
          });
        } else {
          audio.play().catch((err) => {
            console.error("Playback failed:", err);
          });
          setIsPlaying(true);
  
          if (currentSong) {
            updateNotificationWithImage(
              currentSong.name,
              currentSong.artists,
              currentSong.album,
              currentSong.image
            );
            updateMusicControls(currentSong);
          }
  
          CapacitorMusicControls.updateIsPlaying({
            isPlaying: true,
          });
        }
      }
    }, [
      audio,
      isPlaying,
      cancelNotification,
      currentSong,
      updateNotificationWithImage,
      updateMusicControls,
    ]);
  
    const refreshStream = useCallback(() => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.src = audio.src;
        audio.play().catch((err) => {
          console.error("Playback failed:", err);
        });
        setIsPlaying(true);
      }
    }, [audio]);
  
    // Fetch current song data
    const fetchCurrentSong = useCallback(async () => {
      try {
        const response = await fetch(
          "https://entasiradio.tuc.gr/ftp/identifier/now_playing.xml"
        );
        if (!response.ok) throw new Error("Network response was not ok");
  
        const textData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(textData, "text/xml");
  
        const newSong: Song = {
          name: xmlDoc.getElementsByTagName("name")[0]?.textContent || "",
          artists: xmlDoc.getElementsByTagName("artists")[0]?.textContent || "",
          album: xmlDoc.getElementsByTagName("album")[0]?.textContent || "",
          image: xmlDoc.getElementsByTagName("image")[0]?.textContent || "",
          link: xmlDoc.getElementsByTagName("link")[0]?.textContent || "",
        };
  
        if (
          !previousSongRef.current ||
          previousSongRef.current.name !== newSong.name
        ) {
          setCurrentSong(newSong);
          if (isPlaying) {
            updateNotificationWithImage(
              newSong.name,
              newSong.artists,
              newSong.album,
              newSong.image
            );
            updateMusicControls(newSong);
          }
          previousSongRef.current = newSong;
          setError(false);
        }
      } catch (error) {
        console.log(error);
        setError(true);
        setCurrentSong(null);
      }
    }, [isPlaying, updateNotificationWithImage, updateMusicControls]);
  
    useEffect(() => {
      const fetchSongData = async () => {
        await fetchCurrentSong();
      };
      fetchSongData();
  
      const interval = setInterval(fetchSongData, 10000);
      return () => clearInterval(interval);
    }, [fetchCurrentSong]);
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        const newAudio = new Audio("https://entasistream.tuc.gr:8000/main.mp3");
        setAudio(newAudio);
  
        return () => {
          newAudio.pause();
        };
      }
    }, []);
  
    return (
      <SongContext.Provider
        value={{
          currentSong,
          error,
          isPlaying,
          togglePlay,
          refreshStream,
          audio,
          setIsPlaying,
        }}
      >
        {children}
      </SongContext.Provider>
    );
  };
  
  export const useSongContext = () => {
    const context = useContext(SongContext);
    if (context === undefined) {
      throw new Error("useSongContext must be used within a SongProvider");
    }
    return context;
  };