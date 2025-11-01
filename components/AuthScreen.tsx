import React, { useState, useEffect, useCallback } from 'react';

interface AuthScreenProps {
  onSuccess: () => void;
  initialError?: string | null;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess, initialError }) => {
  const [apiKeySelected, setApiKeySelected] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const checkApiKey = useCallback(async () => {
    setIsChecking(true);
    if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      setApiKeySelected(hasKey);
      if (hasKey) {
          onSuccess();
      }
    } else {
        // If aistudio is not available, we assume dev environment and proceed.
        // In a real scenario, this would show an error.
        console.warn("aistudio context not found. Proceeding for development.");
        setApiKeySelected(true);
        onSuccess();
    }
    setIsChecking(false);
  }, [onSuccess]);

  useEffect(() => {
    // Only check if there isn't an initial error telling us the key is bad.
    if (!initialError) {
        checkApiKey();
    } else {
        setIsChecking(false);
        setApiKeySelected(false);
    }
  }, [checkApiKey, initialError]);

  const handleSelectKey = async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
        await window.aistudio.openSelectKey();
        // Assume success and let the video generation call handle failures.
        // This avoids race conditions with hasSelectedApiKey.
        setApiKeySelected(true);
        onSuccess();
    }
  };

  return (
    <div className="text-center flex flex-col items-center justify-center h-full animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-red-500 mb-4">
            Rose Lootbox Generator
        </h1>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl">
            Create stunning video animations of magical loot boxes blooming with roses, powered by Gemini.
        </p>

        {initialError && (
             <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-300 max-w-xl mx-auto">
                <p className="font-bold text-lg mb-1">Authentication Error</p>
                <p>{initialError}</p>
            </div>
        )}

        {isChecking ? (
            <p className="text-gray-400">Checking API Key status...</p>
        ) : !apiKeySelected && (
            <div className="flex flex-col items-center gap-4 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="text-lg">To generate videos, you need to select a Gemini API Key.</p>
                <p className="text-sm text-gray-400">Video generation with Veo is a billable service.</p>
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">
                    Learn more about billing
                </a>
                <button
                    onClick={handleSelectKey}
                    className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-transform duration-200 transform hover:scale-105 shadow-lg shadow-blue-600/30"
                >
                    Select API Key
                </button>
            </div>
        )}
    </div>
  );
};

export default AuthScreen;