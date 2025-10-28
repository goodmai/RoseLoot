
import React from 'react';
import { LootBox } from '../types';

interface BoxItemProps {
  box: LootBox;
  onSelect: () => void;
  isFocused?: boolean;
}

const BoxItem: React.FC<BoxItemProps> = ({ box, onSelect, isFocused = false }) => {
  const boxClasses = `
    relative aspect-square rounded-2xl bg-gradient-to-br ${box.gradient} 
    flex items-center justify-center p-4 cursor-pointer 
    transition-all duration-300 ease-in-out transform 
    hover:-translate-y-2 hover:shadow-2xl ${box.shadow}
    border-2 border-white/20
    ${isFocused ? 'scale-110 shadow-2xl' : ''}
  `;

  return (
    <div className="flex flex-col items-center gap-3" onClick={!isFocused ? onSelect : undefined}>
      <div className={boxClasses}>
        {/* Placeholder for a 3D box icon/model */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-1/2 w-1/2 text-white opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811A37.339 37.339 0 0112 21c-2.815 0-5.525-.312-8.128-.902M12 21V3m0 18c2.815 0 5.525-.312 8.128-.902M12 3c-2.815 0-5.525.312-8.128.902m16.256 12.99A37.338 37.338 0 0012 3C9.185 3 6.475 3.312 3.872 3.902m16.256 0a25.2 25.2 0 01-8.128 13.196m-8.128-13.196A25.2 25.2 0 0012 17.098" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a2.963 2.963 0 012.963 2.963V7.95A2.963 2.963 0 0112 10.913a2.963 2.963 0 01-2.963-2.963V5.963A2.963 2.963 0 0112 3z" />
        </svg>
      </div>
      <p className="font-semibold text-gray-200">{box.name}</p>
    </div>
  );
};

export default BoxItem;
