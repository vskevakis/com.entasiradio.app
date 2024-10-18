import Image from 'next/image';

const ErrorFallback = () => (
  <div className="text-center">
    <Image
      src="/images/robot-404-error-errors.svg"
      alt="Error image"
      width={256}
      height={256}
      className="rounded-lg mb-4 object-cover mx-auto"
    />
    <p className="text-white">Identifier couldn&apos;t recognize the song.</p>
  </div>
);

export default ErrorFallback;