import React from 'react';
import { LootBox } from '../types';

interface BoxItemProps {
  box: LootBox;
  onSelect: () => void;
  isFocused?: boolean;
}

const BoxItem: React.FC<BoxItemProps> = ({ box, onSelect, isFocused = false }) => {
  const boxClasses = `
    relative w-full aspect-square rounded-2xl bg-black/30
    cursor-pointer 
    transition-all duration-300 ease-in-out transform 
    border border-transparent hover:border-white/30
    ${isFocused 
        ? `scale-110 shadow-2xl ${box.shadow} animate-float` 
        : `hover:-translate-y-2 hover:shadow-2xl ${box.shadow}`
    }
  `;

  return (
    <div className="flex flex-col items-center gap-3 group" onClick={!isFocused ? onSelect : undefined}>
      <div className={boxClasses}>
        <img src={box.imageUrl} alt={box.name} className="w-full h-full" />
      </div>
      <p className="font-semibold text-gray-200 transition-colors group-hover:text-white">{box.name}</p>
    </div>
  );
};

export default BoxItem;