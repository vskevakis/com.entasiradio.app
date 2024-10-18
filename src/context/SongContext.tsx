import {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef,
    useCallback,
  } from "react";
  import { useNotificationService } from "@/hooks/useNotificationService";
  
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
  
    // Fetch current song data
    const fetchCurrentSong = useCallback(async () => {
      console.log("Fetching current song...");
  
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
  
        console.log("Fetched song data:", newSong);
  
        if (
          !previousSongRef.current ||
          previousSongRef.current.name !== newSong.name
        ) {
          console.log("New song detected:", newSong.name);
          setCurrentSong(newSong);
  
          // Only update notifications if the audio is playing
          if (isPlaying) {
            console.log("Audio is playing, updating notification");
            try {
              await updateNotificationWithImage(
                newSong.name,
                newSong.artists,
                newSong.album,
                newSong.image
              );
            } catch (error) {
              console.error("Error updating notification:", error);
            }
          }
          previousSongRef.current = newSong;
          setError(false);
        } else {
          console.log("Song is the same, no notification needed");
        }
      } catch (error) {
        console.error("Error fetching song:", error);
        setError(true);
        setCurrentSong(null);
      }
    }, [isPlaying, updateNotificationWithImage]);
  
    // Call fetchCurrentSong inside useEffect to fix the unused variable issue
    useEffect(() => {
      fetchCurrentSong();
  
      const interval = setInterval(fetchCurrentSong, 10000); // Fetch song data every 10 seconds
      return () => clearInterval(interval); // Cleanup on unmount
    }, [fetchCurrentSong]);
  
    // Initialize audio globally
    useEffect(() => {
      if (typeof window !== "undefined") {
        const newAudio = new Audio("https://entasistream.tuc.gr:8000/main.mp3");
        setAudio(newAudio);
  
        // Cleanup on unmount
        return () => {
          newAudio.pause();
        };
      }
    }, []);
  
    // Play or pause audio
    const togglePlay = () => {
      if (audio) {
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
          cancelNotification();
        } else {
          audio.play().catch((err) => {
            console.error("Playback failed:", err);
          });
          setIsPlaying(true);
        }
      }
    };
  
    const refreshStream = () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.src = audio.src; // Reload the audio source
        audio.play().catch((err) => {
          console.error("Playback failed:", err);
        });
        setIsPlaying(true);
      }
    };
  
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