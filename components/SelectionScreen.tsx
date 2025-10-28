
import React from 'react';
import { LootBox } from '../types';
import { LOOT_BOXES } from '../constants';
import BoxItem from './BoxItem';

interface SelectionScreenProps {
  onBoxSelect: (box: LootBox) => void;
}

const SelectionScreen: React.FC<SelectionScreenProps> = ({ onBoxSelect }) => {
  return (
    <div className="text-center animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold mb-2">Choose Your Magic Box</h1>
      <p className="text-gray-400 mb-10">Select a loot box to reveal its floral surprise.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {LOOT_BOXES.map((box) => (
          <BoxItem key={box.id} box={box} onSelect={() => onBoxSelect(box)} />
        ))}
      </div>
    </div>
  );
};

export default SelectionScreen;
