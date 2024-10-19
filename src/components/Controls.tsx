// import React, { useState } from 'react';
import { Icon } from '@iconify/react';


// disable es linting for this file
/* eslint-disable */
const Controls = ({ isPlaying, togglePlay, refreshStream }: { isPlaying: boolean, togglePlay: () => void, refreshStream: () => void }) => {
        return (
        <div className="flex items-center justify-center space-x-4 w-full max-w-lg mt-8">
            {/* Play/Pause Button with gradient matching 'Μουσική' (blue to cyan) */}
            <button
                onClick={togglePlay}
                // className="flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500 p-6 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
                <Icon 
                    icon={isPlaying ? "mingcute:pause-line" : "solar:play-broken"} 
                    className="h-12 w-12 text-white" 
                />
            </button>


            {/* Refresh Button with gradient matching 'για ολα' (red to yellow) */}
            {/* <button
            onClick={refreshStream}
                // className="flex items-center justify-center bg-gradient-to-br from-pink-500 to-violet-400 p-6 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
                <Icon 
                    icon="solar:refresh-broken" 
                    className="h-12 w-12 text-white" 
                />
            </button> */}
        </div>
    );
};

export default Controls;