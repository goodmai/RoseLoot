import React, { useState, useCallback, useEffect } from 'react';
import { AppState, LootBox } from './types';
import { LOOT_BOXES } from './constants';
import AuthScreen from './components/AuthScreen';
import SelectionScreen from './components/SelectionScreen';
import GenerationScreen from './components/GenerationScreen';
import ResultScreen from './components/ResultScreen';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.AUTHENTICATING);
  const [selectedBox, setSelectedBox] = useState<LootBox | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBoxSelect = (box: LootBox) => {
    setSelectedBox(box);
    setAppState(AppState.GENERATING_VIDEO);
    setError(null);
  };
  
  const handleAuthenticationSuccess = () => {
    setAppState(AppState.SELECTING_BOX);
  };

  const handleVideoGenerated = (url: string) => {
    setGeneratedVideoUrl(url);
    setAppState(AppState.VIDEO_READY);
  };
  
  const handleGenerationError = (errorMessage: string) => {
    setError(errorMessage);
    if (errorMessage.includes("API key error")) {
        setAppState(AppState.AUTHENTICATING);
    } else {
        setAppState(AppState.GENERATING_VIDEO);
    }
  };

  const handleReset = () => {
    setAppState(AppState.SELECTING_BOX);
    setSelectedBox(null);
    setGeneratedVideoUrl(null);
    setError(null);
  };

  const handleBackToSelection = () => {
    setAppState(AppState.SELECTING_BOX);
    setSelectedBox(null);
    setError(null);
  }

  const renderContent = () => {
    switch (appState) {
      case AppState.AUTHENTICATING:
        return <AuthScreen onSuccess={handleAuthenticationSuccess} initialError={error} />;
      case AppState.SELECTING_BOX:
        return <SelectionScreen onBoxSelect={handleBoxSelect} />;
      case AppState.GENERATING_VIDEO:
        if (!selectedBox) {
            // Should not happen, but handle it gracefully
            handleReset();
            return null;
        }
        return <GenerationScreen 
                    box={selectedBox} 
                    onVideoGenerated={handleVideoGenerated}
                    onError={handleGenerationError}
                    onBack={handleBackToSelection}
                    error={error}
                />;
      case AppState.VIDEO_READY:
        if (!generatedVideoUrl || !selectedBox) {
            // Should not happen
            handleReset();
            return null;
        }
        return <ResultScreen videoUrl={generatedVideoUrl} onReset={handleReset} />;
      default:
        return <AuthScreen onSuccess={handleAuthenticationSuccess} initialError={error}/>;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-700/[0.2] bg-[length:20px_20px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <main className="z-10 w-full max-w-5xl">
            {renderContent()}
        </main>
    </div>
  );
};

export default App;