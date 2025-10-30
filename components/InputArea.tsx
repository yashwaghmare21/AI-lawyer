
import React, { useState, useRef } from 'react';
import { SendIcon } from './icons/SendIcon';
import { UploadIcon } from './icons/UploadIcon';

interface InputAreaProps {
  onSend: (text: string, file: File | null) => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSend, isLoading }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if ((text.trim() || file) && !isLoading) {
      onSend(text, file);
      setText('');
      setFile(null);
      if(fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-brand-primary p-3 rounded-lg shadow-inner">
      {file && (
        <div className="mb-2 flex items-center justify-between bg-gray-700 p-2 rounded-md">
          <span className="text-sm text-gray-300 truncate">Attached: {file.name}</span>
          <button onClick={() => setFile(null)} className="text-gray-400 hover:text-white">&times;</button>
        </div>
      )}
      <div className="flex items-center space-x-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a legal question or describe your document..."
          className="flex-1 bg-gray-700 text-brand-text p-3 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-brand-secondary/70 disabled:opacity-50"
          rows={1}
          disabled={isLoading}
        />
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.txt" />
        <button onClick={triggerFileSelect} disabled={isLoading} className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors disabled:opacity-50">
          <UploadIcon className="w-6 h-6 text-brand-secondary" />
        </button>
        <button onClick={handleSend} disabled={isLoading || (!text.trim() && !file)} className="p-3 bg-brand-secondary rounded-full hover:bg-yellow-400 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">
          <SendIcon className="w-6 h-6 text-brand-primary" />
        </button>
      </div>
    </div>
  );
};
