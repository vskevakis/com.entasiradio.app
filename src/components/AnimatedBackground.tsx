import { useSongContext } from '@/context/SongContext';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';

const backgroundVariants = {
    idle: {
        background:
            'radial-gradient(circle, rgba(70,0,100,1) 36%, rgba(140,10,170,1) 60%, rgba(20,20,20,1) 100%)',
        transition: {
            duration: 1,
        },
    },
    playing: {
        background:
            'radial-gradient(circle, rgba(130,20,190,1) 36%, rgba(220,50,255,1) 60%, rgba(50,50,50,1) 100%)',
        transition: {
            duration: 3,
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