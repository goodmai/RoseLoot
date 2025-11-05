import React, { useState, useEffect } from 'react';
import { LootBox } from '../types';
import { generateRoseVideo } from '../services/geminiService';
import { LOADING_MESSAGES, svgTemplate, colorPalettes } from '../constants';

interface GenerationScreenProps {
  box: LootBox;
  onVideoGenerated: (url: string) => void;
  onError: (error: string) => void;
  onBack: () => void;
  error: string | null;
}

const GenerationScreen: React.FC<GenerationScreenProps> = ({ box, onVideoGenerated, onError, onBack, error }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isGenerating) {
        setProgressMessage(LOADING_MESSAGES[0]);
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

  const startVideoGeneration = async () => {
    setIsGenerating(true);
    onError(''); // Clear previous errors
    try {
        const url = await generateRoseVideo(box, setProgressMessage);
        onVideoGenerated(url);
    } catch (e: any) {
        console.error(e);
        onError(e.message || 'An unknown error occurred during video generation.');
    } finally {
        setIsGenerating(false);
        setIsOpening(false);
    }
  };

  const handleOpenClick = () => {
    if (isOpening || isGenerating) return;
    setIsOpening(true);
    setTimeout(() => {
        startVideoGeneration();
    }, 1200); // Wait for animation to finish
  };

  const createSvgString = () => {
    const palette = colorPalettes[box.name];
    if (!palette) return '';
    return svgTemplate
        .replace(/%%COLOR_SUPERLIGHT%%/g, palette.superlight)
        .replace(/%%COLOR_LIGHT%%/g, palette.light)
        .replace(/%%COLOR_MEDIUM%%/g, palette.medium)
        .replace(/%%COLOR_DARK%%/g, palette.dark)
        .replace(/%%COLOR_SHADOW%%/g, palette.shadow)
        .replace(/%%ACCENT_COLOR%%/g, palette.accent)
        .replace(/%%ACCENT_GLOW%%/g, palette.accentGlow)
        .replace(/%%SECONDARY_ACCENT%%/g, palette.secondaryAccent)
        .replace(/%%LEATHER_LIGHT%%/g, palette.leatherLight)
        .replace(/%%LEATHER_MEDIUM%%/g, palette.leatherMedium)
        .replace(/%%LEATHER_DARK%%/g, palette.leatherDark);
  };
  
  return (
    <div className="flex flex-col items-center justify-center text-center animate-fade-in relative">
        <button onClick={onBack} className="absolute top-0 left-4 text-gray-400 hover:text-white transition-colors disabled:opacity-50" disabled={isOpening || isGenerating}>
            &larr; Back to Selection
        </button>
        <h2 className="text-3xl font-bold mb-6">Your Chosen Box</h2>
        <div className={`mb-8 w-48 h-48 transition-all duration-500 ease-out ${isGenerating ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
            <div 
              className={`w-full h-full animate-float ${isOpening ? 'box-opening' : ''}`}
              dangerouslySetInnerHTML={{ __html: createSvgString() }}
            />
        </div>
      
        {isGenerating ? (
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-t-transparent border-purple-500 rounded-full animate-spin mb-4"></div>
                <p className="text-lg text-gray-300 font-semibold">{progressMessage}</p>
                <p className="text-sm text-gray-500 mt-2">Please keep this window open.</p>
            </div>
        ) : (
            <div className='flex flex-col items-center'>
                {error && <p className="text-red-400 mb-4 bg-red-900/50 p-3 rounded-lg max-w-md">{error}</p>}
                <button
                    onClick={handleOpenClick}
                    className="px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg text-xl
                               transform transition-transform duration-200 hover:scale-105 shadow-lg shadow-purple-600/40
                               disabled:opacity-50 disabled:scale-100 disabled:cursor-wait"
                    disabled={isOpening}
                >
                    {isOpening ? 'Opening...' : error ? 'Try Again' : 'Open Box'}
                </button>
            </div>
        )}
    </div>
  );
};

export default GenerationScreen;
