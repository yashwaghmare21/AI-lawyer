
import React from 'react';
import { GavelIcon } from './icons/GavelIcon';

interface HeaderProps {
    onFileCaseClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onFileCaseClick }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-brand-primary border-b border-brand-secondary/50 shadow-lg">
      <div className="flex items-center space-x-3">
        <GavelIcon className="w-8 h-8 text-brand-secondary" />
        <div>
          <h1 className="text-xl font-bold text-white tracking-wider">Prasad Wakhre</h1>
          <p className="text-sm text-brand-secondary">AI Legal Counsel</p>
        </div>
      </div>
      <button 
        onClick={onFileCaseClick}
        className="px-4 py-2 bg-brand-secondary text-brand-primary font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-75">
        File a Case
      </button>
    </header>
  );
};
