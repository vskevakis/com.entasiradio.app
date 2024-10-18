// import { useState, useEffect, useRef, useCallback } from 'react';
// import { useNotificationService } from './useNotificationService';

// interface Song {
//   name: string;
//   artists: string;
//   album: string;
//   image: string;
//   link: string;
// }

// export const useSongData = () => {
//   const { updateNotificationWithImage, cancelNotification } = useNotificationService();
//   const [currentSong, setCurrentSong] = useState<Song | null>(null);
//   const [error, setError] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
//   const previousSongRef = useRef<Song | null>(null);

//   // Fetch current song data
//   const fetchCurrentSong = useCallback(async () => {
//     try {
//       const response = await fetch('https://entasiradio.tuc.gr/ftp/identifier/now_playing.xml');
//       if (!response.ok) throw new Error('Network response was not ok');

//       const textData = await response.text();
//       const parser = new DOMParser();
//       const xmlDoc = parser.parseFromString(textData, 'text/xml');

//       const newSong: Song = {
//         name: xmlDoc.getElementsByTagName('name')[0]?.textContent || '',
//         artists: xmlDoc.getElementsByTagName('artists')[0]?.textContent || '',
//         album: xmlDoc.getElementsByTagName('album')[0]?.textContent || '',
//         image: xmlDoc.getElementsByTagName('image')[0]?.textContent || '',
//         link: xmlDoc.getElementsByTagName('link')[0]?.textContent || '',
//       };

//       if (!previousSongRef.current || previousSongRef.current.name !== newSong.name) {
//         setCurrentSong(newSong);
//         updateNotificationWithImage(newSong.name, newSong.artists, newSong.album, newSong.image); // Send notification
//         previousSongRef.current = newSong;
//         setError(false);
//       }
//     } catch {
//       setError(true);
//       setCurrentSong(null);
//     }
//   }, [updateNotificationWithImage]);

//   // Initialize audio on mount
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const newAudio = new Audio('https://entasistream.tuc.gr:8000/main.mp3');
//       setAudio(newAudio);

//       // Clean up on unmount
//       return () => {
//         newAudio.pause();
//       };
//     }
//   }, []);

//   // Play or pause audio
//   const togglePlay = () => {
//     if (audio) {
//       if (isPlaying) {
//         audio.pause();
//         setIsPlaying(false);
//         cancelNotification();
//       } else {
//         audio.play().catch((err) => {
//           console.error('Playback failed:', err);
//         });
//         setIsPlaying(true);
//       }
//     }
//   };

//   const refreshStream = () => {
//     if (audio) {
//       audio.pause();
//       audio.currentTime = 0;
//       audio.src = audio.src; // Reload the audio source
//       audio.play().catch((err) => {
//         console.error('Playback failed:', err);
//       });
//       setIsPlaying(true);
//     }
//   };

//   return { currentSong, error, isPlaying, togglePlay, refreshStream, cancelNotification, audio, setIsPlaying };
// };