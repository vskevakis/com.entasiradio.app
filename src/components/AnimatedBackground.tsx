import { useSongContext } from '@/context/SongContext';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';

const backgroundVariants = {
    idle: {
      background:
        'radial-gradient(circle, rgba(90,0,130,1) 36%, rgba(168,14,205,1) 60%, rgba(34,34,34,1) 100%)',
      transition: {
        duration: 1,
      },
    },
    playing: {
      background:
        'radial-gradient(circle, rgba(110,10,160,1) 36%, rgba(200,30,240,1) 60%, rgba(34,34,34,1) 100%)',
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: 'mirror' as const,
      },
    },
  };

const AnimatedBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isPlaying } = useSongContext();
  const controls = useAnimation();

  useEffect(() => {
    if (isPlaying) {
      controls.start('playing');
    } else {
      controls.start('idle');
    }
  }, [isPlaying, controls]);

  return (
    <motion.div
      className="w-full h-full flex flex-col flex-grow"
      initial="idle"
      animate={controls}
      variants={backgroundVariants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedBackground;