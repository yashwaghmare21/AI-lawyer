
import React from 'react';

interface FileCaseModalProps {
  onClose: () => void;
}

export const FileCaseModal: React.FC<FileCaseModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-brand-primary rounded-lg shadow-2xl p-8 max-w-md w-full border-2 border-brand-secondary/50 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">&times;</button>
        
        <div className="text-center">
            <img 
                src="https://picsum.photos/150/150" 
                alt="Prasad Wakhre" 
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-brand-secondary"
            />
          <h2 className="text-2xl font-bold text-white mb-2">Adv. Prasad Wakhre</h2>
          <p className="text-brand-secondary mb-4">Specialist in Criminal Law</p>
          
          <div className="text-left bg-gray-800/50 p-4 rounded-lg">
            <p className="text-brand-text mb-4">
              To proceed with your case and receive personalized legal representation, please use the contact details below.
            </p>
            <div className="space-y-3">
                <div className="flex items-center">
                    <svg className="w-5 h-5 text-brand-secondary mr-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                    <a href="tel:+918483001726" className="text-white hover:text-brand-secondary transition-colors">+91 84830 01726</a>
                </div>
                 <div className="flex items-center">
                    <svg className="w-5 h-5 text-brand-secondary mr-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                    <span className="text-white">prasad.wakhre.law@email.com</span>
                </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="mt-6 w-full px-4 py-2 bg-brand-secondary text-brand-primary font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
