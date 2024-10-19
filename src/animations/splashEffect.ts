// Add water splash effect animation
export const splashEffect = {
    initial: { scale: 1, opacity: 1 },
    animate: {
      scale: [1, 1.05, 0.95, 1], // A "pulse" or "ripple" effect with smaller scale changes
      opacity: [1, 0.85, 0.95, 1], // Smaller opacity changes
      transition: {
        duration: 0.6, // Duration of the effect
        ease: 'easeInOut',
      },
    },
  };