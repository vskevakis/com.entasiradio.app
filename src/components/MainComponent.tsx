'use client';

import React, { useEffect, useState } from 'react';
import Controls from '@/components/Controls';
import { useSongContext } from '@/context/SongContext'; // Use the global SongContext
// import ErrorFallback from './ErrorFallback';
import SongDetails from './SongDetails'; // Import the component to show song details

const MainComponent = () => {
  const { currentSong, isPlaying, togglePlay, refreshStream, audio, setIsPlaying } = useSongContext(); // Fetch song data including currentSong and isPlaying state
  const [isSmallHeight, setIsSmallHeight] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsSmallHeight(window.innerHeight < 600);
      }
    };

    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize); // Add event listener for resize

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup on unmount
    };
  }, []);

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
<div className="flex flex-col justify-center items-center w-full h-full px-4 sm:px-6">
<div className={`flex flex-col justify-center items-center ${isSmallHeight ? 'px-16' : 'px-12'}`}>
{/* Display the song details when available */}
          <SongDetails song={currentSong} isLoading={!currentSong} />
        </div>
      <Controls isPlaying={isPlaying} togglePlay={togglePlay} refreshStream={refreshStream} />
    </div>
  );
};

export default MainComponent;