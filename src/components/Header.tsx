'use client'; // Mark this as a Client Component

import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Header = () => {
  const pathname = usePathname();

  // Don't render the header if the pathname is `/chat`
  if (pathname === '/chat') return null;

  return (
    <header className="p-4 sm:p-6 fixed w-full top-0 left-0 flex flex-col justify-center items-center rounded-xl z-10">
        <Image
          src="https://entasiradio.tuc.gr/wp-content/uploads/2021/12/logo_white-transparent.png"
          alt="Logo"
          width={80} // Adjust width as needed
          height={80} // Adjust height as needed
          className="h-16 sm:h-16 md:h-20 w-auto"
        />
      <div className="flex flex-col items-center mt-2 sm:mt-4 space-y-1 sm:space-y-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-br from-blue-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-md">
            Μουσική
          </span>
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-br from-red-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-md">
            για ολα
          </span>
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-br from-pink-500 to-violet-400 bg-clip-text text-transparent drop-shadow-md">
            τα γούστα.
          </span>
        </h1>
      </div>
    </header>
  );
};

export default Header;