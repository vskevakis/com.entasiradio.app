'use client'; // Mark this as a Client Component

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Header = () => {
  const pathname = usePathname();
  const [isSmallHeight, setIsSmallHeight] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(max-height: 600px)');

      // Function to handle changes to the media query
      const handleMediaChange = () => setIsSmallHeight(mediaQuery.matches);

      // Initial check
      handleMediaChange();

      // Attach listener for changes
      mediaQuery.addEventListener('change', handleMediaChange);

      // Cleanup listener on unmount
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    }
  }, []);

  // Don't render the header if the pathname is `/chat`
  if (pathname === '/chat') return null;

  return (
    <header className="p-4 sm:p-6 fixed w-full top-0 left-0 flex flex-col justify-center items-center rounded-xl z-10">
      <Image
      src="https://entasiradio.tuc.gr/wp-content/uploads/2021/12/logo_white-transparent.png"
      alt="Logo"
      width={80} // Adjust width as needed
      height={80} // Adjust height as needed
      className={`h-20 ${isSmallHeight ? 'h-20' : 'sm:h-20 md:h-24'} w-auto`}
      />
      {/* Inline row for the header text with proper spacing */}
      <div className="flex flex-row items-center justify-center whitespace-nowrap space-x-2 sm:space-x-4 mt-2 sm:mt-4">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-br from-blue-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-md">
        Μουσική
        </span>
      </h1>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-br from-red-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-md">
        για ολα
        </span>
      </h1>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-br from-pink-500 to-violet-400 bg-clip-text text-transparent drop-shadow-md">
        τα γούστα.
        </span>
      </h1>
      </div>
    </header>
  //   <header className="p-4 sm:p-6 fixed w-full top-0 left-0 flex flex-col justify-center items-center rounded-xl z-10">
  //     <Image
  //       src="https://entasiradio.tuc.gr/wp-content/uploads/2021/12/logo_white-transparent.png"
  //       alt="Logo"
  //       width={80} // Adjust width as needed
  //       height={80} // Adjust height as needed
  //       className="h-16 sm:h-16 md:h-20 w-auto"
  //     />
  //     {/* Apply flex-row if screen height is small */}
  //     <div
  //       className={`${
  //         isSmallHeight ? 'flex flex-row space-x-2' : 'flex flex-col '
  //       } items-center mt-2 sm:mt-4`}
  //     >
  //       <h1
  //         className={`${
  //           isSmallHeight ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
  //         } font-extrabold tracking-tight`}
  //       >
  //         <span className="bg-gradient-to-br from-blue-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-md">
  //           Μουσική
  //         </span>
  //       </h1>
  //       <h1
  //         className={`${
  //           isSmallHeight ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
  //         } font-extrabold tracking-tight`}
  //       >
  //         <span className="bg-gradient-to-br from-red-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-md">
  //           για ολα
  //         </span>
  //       </h1>
  //       <h1
  //         className={`${
  //           isSmallHeight ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
  //         } font-extrabold tracking-tight`}
  //       >
  //         <span className="bg-gradient-to-br from-pink-500 to-violet-400 bg-clip-text text-transparent drop-shadow-md">
  //           τα γούστα.
  //         </span>
  //       </h1>
  //     </div>
  //   </header>
  );
};

export default Header;