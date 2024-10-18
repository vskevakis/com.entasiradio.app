import React from 'react';
import Image from 'next/image';

interface SongDetailsProps {
  song: {
    name: string;
    artists: string;
    album: string;
    image: string;
  };
}

const SongDetails: React.FC<SongDetailsProps> = ({ song }) => {
  return (
    <div className="bg-white mx-8 bg-opacity-20 backdrop-blur-lg shadow-lg border border-white border-opacity-30 p-6 md:p-10 rounded-3xl max-w-lg w-full">
      <Image
        src={song.image}
        alt="Album cover"
        width={256}
        height={256}
        className="rounded-lg mb-4 object-cover mx-auto"
      />
      <div className="text-white text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold">{song.name}</h2>
        <p className="text-lg">{song.artists}</p>
        <p className="text-sm opacity-70">{song.album}</p>
      </div>
    </div>
  );
};

export default SongDetails;