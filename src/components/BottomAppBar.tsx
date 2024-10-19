'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from "@iconify/react";

const BottomAppBar = () => {
    const pathname = usePathname(); // To highlight the active route

    return (
        <div className="fixed bottom-0 left-0 w-full bg-black p-4 z-[9999] flex justify-around items-center shadow-lg">
            {/* Home Button */}
            <Link href="/" className="flex flex-col items-center justify-center space-y-1 text-center w-16">
                <Icon
                    icon="iconamoon:home-fill"
                    className={`h-6 w-6 ${pathname === '/' ? 'text-purple-400' : 'text-gray-400'}`} // Active color: purple, Inactive: gray
                />
                <span className={`text-xs ${pathname === '/' ? 'text-purple-400' : 'text-gray-400'}`}>
                    Home
                </span>
            </Link>

            {/* Divider */}
            <div className="h-6 border-l border-gray-600"></div>

            {/* Chat Button */}
            <Link href="/chat" className="flex flex-col items-center justify-center space-y-1 text-center w-16">
                <Icon
                    icon="lets-icons:chat-fill"
                    className={`h-6 w-6 ${pathname === '/chat' ? 'text-purple-400' : 'text-gray-400'}`} // Active color: purple, Inactive: gray
                />
                <span className={`text-xs ${pathname === '/chat' ? 'text-purple-400' : 'text-gray-400'}`}>
                    Chat
                </span>
            </Link>
        </div>
    );
};

export default BottomAppBar;