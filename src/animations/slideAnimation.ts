// animations/slideAnimation.ts
export const slideLeft = {
    initial: { opacity: 0, x: '100%' }, // Start outside the right edge
    animate: { opacity: 1, x: 0 }, // Slide to the center
    exit: { opacity: 0, x: '-100%' }, // Slide out to the left
    transition: { duration: 0.5, ease: 'easeInOut' },
  };