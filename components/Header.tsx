import React, { useState, useEffect } from 'react';
import { AppState } from '../types';

interface HeaderProps {
  appState: AppState;
  onAuthenticationSuccess: () => void;
}

const Header: React.FC<HeaderProps> = ({ appState, onAuthenticationSuccess }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, [appState]); // Re-check when app state changes

  const checkAuthStatus = async () => {
    if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      setIsConnected(hasKey);
    } else {
      setIsConnected(true); // Assume connected in dev environment
    }
  };

  const handleOAuth2Connect = async () => {
    setIsConnecting(true);
    try {
      if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
        await window.aistudio.openSelectKey();
        setIsConnected(true);
        onAuthenticationSuccess();
      } else {
        // Fallback for development
        setIsConnected(true);
        onAuthenticationSuccess();
      }
    } catch (error) {
      console.error('OAuth2 connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Don't show header on authentication screen
  if (appState === AppState.AUTHENTICATING) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-gray-900/90 backdrop-blur-sm border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo/Title */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white">
              Rose Lootbox Generator
            </h1>
          </div>

          {/* Right side - OAuth2 Connect */}
          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Connected</span>
              </div>
            ) : (
              <button
                onClick={handleOAuth2Connect}
                disabled={isConnecting}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span>{isConnecting ? 'Connecting...' : 'OAuth2 Connect'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;