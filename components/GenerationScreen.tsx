
import React, { useState, useEffect } from 'react';
import { LootBox } from '../types';
import { generateRoseVideo } from '../services/geminiService';
import { LOADING_MESSAGES } from '../constants';
import BoxItem from './BoxItem';

interface GenerationScreenProps {
  box: LootBox;
  onVideoGenerated: (url: string) => void;
  onError: (error: string) => void;
  onBack: () => void;
  error: string | null;
}

const GenerationScreen: React.FC<GenerationScreenProps> = ({ box, onVideoGenerated, onError, onBack, error }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');

  useEffect(() => {
    // FIX: Changed NodeJS.Timeout to ReturnType<typeof setInterval> for browser compatibility.
    let interval: ReturnType<typeof setInterval>;
    if (isGenerating) {
        // Set an initial message
        setProgressMessage(LOADING_MESSAGES[0]);
        // Cycle through messages
        interval = setInterval(() => {
            setProgressMessage(prev => {
                const currentIndex = LOADING_MESSAGES.indexOf(prev);
                const nextIndex = (currentIndex + 1) % LOADING_MESSAGES.length;
                return LOADING_MESSAGES[nextIndex];
            });
        }, 4000);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    onError(''); // Clear previous errors
    try {
        const url = await generateRoseVideo(box, setProgressMessage);
        onVideoGenerated(url);
    } catch (e: any) {
        console.error(e);
        onError(e.message || 'An unknown error occurred during video generation.');
        if (e.message.includes("API key error")) {
           onBack(); // Force user to re-select key
        }
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center animate-fade-in">
        <button onClick={onBack} className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors">
            &larr; Back to Selection
        </button>
        <h2 className="text-3xl font-bold mb-6">Your Chosen Box</h2>
        <div className="mb-8 w-48 h-48">
            <BoxItem box={box} onSelect={() => {}} isFocused={true}/>
        </div>
      
        {isGenerating ? (
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-t-transparent border-purple-500 rounded-full animate-spin mb-4"></div>
                <p className="text-lg text-gray-300 font-semibold">{progressMessage}</p>
                <p className="text-sm text-gray-500 mt-2">Please keep this window open.</p>
            </div>
        ) : (
            <div className='flex flex-col items-center'>
                {error && <p className="text-red-400 mb-4 bg-red-900/50 p-3 rounded-lg">{error}</p>}
                <button
                    onClick={handleGenerate}
                    className="px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg text-xl
                               transform transition-transform duration-200 hover:scale-105 shadow-lg shadow-purple-600/40"
                    disabled={isGenerating}
                >
                    Open Box
                </button>
            </div>
        )}
    </div>
  );
};

export default GenerationScreen;
