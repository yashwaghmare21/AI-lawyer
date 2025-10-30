
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ChatWindow } from './components/ChatWindow';
import { InputArea } from './components/InputArea';
import { FileCaseModal } from './components/FileCaseModal';
import { generateResponse } from './services/geminiService';
import type { Message, Role } from './types';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      parts: "Welcome. I am Prasad Wakhre, your AI Legal Counsel. How may I assist you with your criminal law query today? You can ask a question or upload a document for analysis. \n\n*This is an AI-powered service and does not constitute legal advice. For formal legal counsel, please consult a qualified professional.*",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSend = useCallback(async (text: string, file: File | null) => {
    if (!text && !file) return;

    setIsLoading(true);
    setError(null);

    const userMessage: Message = {
      role: 'user',
      parts: text,
      fileInfo: file ? { name: file.name, type: file.type } : undefined,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      let fileContent: { mimeType: string; data: string } | undefined;
      if (file) {
        const base64Data = await fileToBase64(file);
        fileContent = { mimeType: file.type, data: base64Data };
      }

      const responseText = await generateResponse(text, fileContent);

      const modelMessage: Message = {
        role: 'model',
        parts: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, modelMessage]);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      const errorMessageObj: Message = {
        role: 'model',
        parts: `I apologize, but I've encountered an error: ${errorMessage}. Please try again later.`,
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessageObj]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-brand-background text-brand-text font-sans">
      <Header onFileCaseClick={() => setIsModalOpen(true)} />
      <main className="flex-1 overflow-hidden flex flex-col">
        <ChatWindow messages={messages} isLoading={isLoading} />
      </main>
      <div className="p-4 bg-brand-background border-t border-gray-700">
        <InputArea onSend={handleSend} isLoading={isLoading} />
      </div>
      {isModalOpen && <FileCaseModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default App;
