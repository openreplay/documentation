import { Message } from ".";
import { FC } from "react";
import { ChatInput } from "./ChatInput";
import { ChatLoader } from "./ChatLoader";
import { ChatMessage } from "./ChatMessage";
import React from 'react';

interface Props {
  messages: Message[];
  loading: boolean;
  onSend: (message: Message) => void;
  onReset: () => void;
  hasSentMessage: boolean; 
  onMessageClick: (index: number) => void; 
}

export const Chat: FC<Props> = ({ messages, loading, onSend, onReset, hasSentMessage, onMessageClick }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto sm:border border-neutral-300">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className="my-1 sm:my-1.5"
            onClick={() => message.isContinuation && onMessageClick(index)} // Add click handler for continuation messages
            style={{ cursor: message.isContinuation ? 'pointer' : 'default' }} // Change cursor style for continuation messages
          >
            <ChatMessage message={message} />
          </div>
        ))}

        {loading && (
          <div className="my-1 sm:my-1.5">
            <ChatLoader />
          </div>
        )}
      </div>

      <div className="mt-4 sm:mt-8 bottom-[56px] left-0 w-full">
        <ChatInput onSend={onSend} hasSentMessage={hasSentMessage} /> {/* Pass the prop here */}
      </div>
    </div>
  );
};
