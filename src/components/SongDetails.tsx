import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInOut } from '@/animations/fadeAnimation';
import { scaleUp } from '@/animations/scaleUpAnimation';
import { useSongContext } from '@/context/SongContext';
import { splashEffect } from '@/animations/splashEffect';

interface SongDetailsProps {
  song: {
    name: string;
    artists: string;
    album: string;
    image: string;
  } | null;
  isLoading: boolean;
}

const SongDetails: React.FC<SongDetailsProps> = ({ song, isLoading }) => {
  const [isSmallHeight, setIsSmallHeight] = useState(false);
  const { isPlaying } = useSongContext(); // Get playing state

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-height: 600px)');
    
    const handleChange = () => setIsSmallHeight(mediaQuery.matches);
    
    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-height: 600px)');
    
    const handleChange = () => setIsSmallHeight(mediaQuery.matches);
    
    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <motion.div
      className="mx-8 p-6 md:p-10 rounded-3xl max-w-lg w-full shadow-lg border border-white border-opacity-30 bg-white bg-opacity-20 backdrop-blur-lg"
      animate={isPlaying ? "animate" : "initial"} // Trigger splash effect on play
      variants={splashEffect} // Use the splashEffect animation
    >
      {isLoading ? (
        <motion.div role="status" className="animate-pulse" {...fadeInOut}>
          {/* Skeleton for album cover */}
          <div className="flex items-center justify-center w-full h-auto aspect-square bg-gray-300 rounded-lg dark:bg-gray-700 mb-4 mx-auto">
            <Image
              src="/images/mr-entasi.svg"
              alt="Loading placeholder"
              width={256}
              height={256}
              className="w-full h-full text-gray-200 dark:text-gray-600"
            />
          </div>
          
          {/* Skeleton for song name */}
          <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 mx-auto"></div>
          
          {/* Skeleton for artists */}
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2 mx-auto"></div>
          
          {/* Skeleton for album */}
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mx-auto"></div>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div key={song?.name} {...scaleUp} exit={{ opacity: 0, scale: 0.9 }}>
            <div className="flex items-center justify-center w-full h-auto aspect-square mx-auto mb-4">
              <Image
                src={song?.image || '/placeholder.jpg'}
                alt="Album cover"
                width={256}
                height={256}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            <div className={`text-white text-center mb-8 ${isSmallHeight ? 'text-sm' : 'text-base'}`}>
              <h2 className={`font-semibold ${isSmallHeight ? 'text-lg' : 'text-lg md:text-2xl'}`}>
                {song?.name}
              </h2>
              <p className={`${isSmallHeight ? 'text-base' : 'text-md'}`}>{song?.artists}</p>
              <p className={`opacity-70 ${isSmallHeight ? 'text-xs' : 'text-sm'}`}>{song?.album}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};
export default SongDetails;