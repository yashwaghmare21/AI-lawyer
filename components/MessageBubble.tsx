
import React from 'react';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const UserAvatar: React.FC = () => (
  <div className="w-10 h-10 rounded-full bg-gray-600 flex-shrink-0 flex items-center justify-center">
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
  </div>
);

const ModelAvatar: React.FC = () => (
  <div className="w-10 h-10 rounded-full bg-brand-primary flex-shrink-0 flex items-center justify-center border-2 border-brand-secondary">
    <svg className="w-6 h-6 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
  </div>
);

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  const baseBubbleClasses = 'p-4 rounded-xl max-w-lg lg:max-w-2xl break-words';
  const userBubbleClasses = 'bg-blue-600 text-white';
  const modelBubbleClasses = `bg-brand-primary ${message.isError ? 'text-red-400 border border-red-500' : 'text-brand-text'}`;

  const containerClasses = isUser ? 'flex-row-reverse' : 'flex-row';

  return (
    <div className={`flex items-start space-x-4 space-x-reverse ${containerClasses}`}>
      {isUser ? <UserAvatar /> : <ModelAvatar />}
      <div className="flex flex-col">
          <div className={`${baseBubbleClasses} ${isUser ? userBubbleClasses : modelBubbleClasses}`}>
            {message.fileInfo && (
              <div className="mb-2 p-2 bg-gray-700/50 rounded-md border border-gray-600">
                <p className="text-xs font-semibold text-gray-300">Attached File:</p>
                <p className="text-sm text-gray-100 truncate">{message.fileInfo.name}</p>
              </div>
            )}
            <p className="whitespace-pre-wrap">{message.parts}</p>
          </div>
          <p className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>{message.timestamp.toLocaleTimeString()}</p>
      </div>
    </div>
  );
};
