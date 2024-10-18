'use client';

import React, { useEffect } from 'react';
import Controls from './Controls';
import { useSongContext } from '@/context/SongContext'; // Use the global SongContext
import ErrorFallback from './ErrorFallback';
import SongDetails from './SongDetails'; // Import the component to show song details

const MainComponent = () => {
  const { currentSong, isPlaying, togglePlay, refreshStream, audio, setIsPlaying, error } = useSongContext(); // Fetch song data including currentSong and isPlaying state

  useEffect(() => {
    if (audio) {
      const handlePlaying = () => setIsPlaying(true);
      const handlePaused = () => setIsPlaying(false);

      audio.addEventListener('play', handlePlaying);
      audio.addEventListener('pause', handlePaused);

      return () => {
        audio.removeEventListener('play', handlePlaying);
        audio.removeEventListener('pause', handlePaused);
      };
    }
  }, [audio, setIsPlaying]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      {error ? (
        <ErrorFallback />
      ) : currentSong ? (
        <div className="flex flex-col justify-center items-center">
          {/* Display the song details when available */}
          <SongDetails song={currentSong} />
        </div>
      ) : (
        <p className="text-white">Loading song data...</p>
      )}
      <Controls isPlaying={isPlaying} togglePlay={togglePlay} refreshStream={refreshStream} />
    </div>
  );
};

export default MainComponent;