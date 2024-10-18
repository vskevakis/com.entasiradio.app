import {
    createContext,
    useContext,
    useState,
    useRef,
    useCallback,
    useEffect,
  } from "react";
  import { useNotificationService } from "@/hooks/useNotificationService";
  import { useWebSocket } from "@/hooks/useWebSocket";
  import { useMusicControls } from "@/hooks/useMusicControls";
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
    const { updateNotificationWithImage, cancelNotification } = useNotificationService();
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [error, setError] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const previousSongRef = useRef<Song | null>(null);
  
    // Media controls hook - This must come before using updateMusicControls
    const { updateMusicControls } = useMusicControls(audio, isPlaying, setIsPlaying, cancelNotification);
    /* eslint-disable @typescript-eslint/no-explicit-any */

    // Handle WebSocket song data
    const handleWebSocketMessage = useCallback(
      (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          const nowPlaying = data.now_playing;
          const newSong: Song = {
            name: nowPlaying.song.name,
            artists: nowPlaying.song.artists.map((artist: any) => artist.name).join(", "),
            album: nowPlaying.album.name,
            image: nowPlaying.album.image_url,
            link: nowPlaying.song.spotify_url,
          };
  
          if (!previousSongRef.current || previousSongRef.current.name !== newSong.name) {
            setCurrentSong(newSong);
            if (isPlaying) {
              updateNotificationWithImage(newSong.name, newSong.artists, newSong.album, newSong.image);
              updateMusicControls(newSong);
            }
            previousSongRef.current = newSong;
            setError(false);
          }
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);
          setError(true);
          setCurrentSong(null);
        }
      },
      [isPlaying, updateNotificationWithImage, updateMusicControls]
    );
    /* eslint-enable @typescript-eslint/no-explicit-any */

    // Initialize WebSocket with message handling
    useWebSocket(handleWebSocketMessage, setError); 
  
    // Play or pause audio and update Music Controls
    const togglePlay = useCallback(() => {
      if (audio) {
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
          cancelNotification();
          CapacitorMusicControls.updateIsPlaying({ isPlaying: false });
        } else {
          audio.play().catch((err) => {
            console.error("Playback failed:", err);
          });
          setIsPlaying(true);
  
          if (currentSong) {
            updateNotificationWithImage(currentSong.name, currentSong.artists, currentSong.album, currentSong.image);
            updateMusicControls(currentSong);
          }
          CapacitorMusicControls.updateIsPlaying({ isPlaying: true });
        }
      }
    }, [audio, isPlaying, cancelNotification, currentSong, updateNotificationWithImage, updateMusicControls]);
  
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