
import React, { useRef } from 'react';

interface ResultScreenProps {
  videoUrl: string;
  onReset: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ videoUrl, onReset }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = `rose_lootbox_celebration.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  return (
    <div className="flex flex-col items-center justify-center text-center animate-fade-in w-full">
        <div className="w-full max-w-3xl aspect-video bg-black rounded-lg shadow-2xl shadow-purple-500/20 overflow-hidden border-2 border-gray-700 mb-4">
            <video
                ref={videoRef}
                src={videoUrl}
                controls
                autoPlay
                loop
                className="w-full h-full object-contain"
            />
        </div>
        <p className="text-2xl font-bold my-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400">
            Поздравляю Таня!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
                onClick={handleDownload}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-transform duration-200 transform hover:scale-105"
            >
                Download Video
            </button>
            <button
                onClick={onReset}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-transform duration-200 transform hover:scale-105"
            >
                Create Another
            </button>
        </div>
    </div>
  );
};

export default ResultScreen;
