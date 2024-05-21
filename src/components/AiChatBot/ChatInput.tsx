import { Message } from ".";
import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import React from 'react';

interface Props {
  onSend: (message: Message) => void;
  hasSentMessage: boolean; // Add this prop
}

export const ChatInput: FC<Props> = ({ onSend, hasSentMessage }) => {
  const [content, setContent] = useState<string>("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 4000) {
      alert("Message limit is 4000 characters");
      return;
    }
    setContent(value);
  };

  const handleSend = () => {
    if (!content) {
      alert("Please enter a message");
      return;
    }
    onSend({ role: "user", content });
    setContent("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const suggestedPrompts = [
    "Get Started with OpenReplay",
    "How can I deploy OpenReplay on Docker",
    "How can I troubleshoot session replays"
  ];

  return (
    <div className="relative">
      {!hasSentMessage && ( // Conditionally render the Suggested Prompts section
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Suggested Prompts</h3>
          <div className="flex flex-col gap-2 mt-2">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                className="bg-gray-200 hover:border-blue-500 text-gray-700 py-1 px-2 rounded border border-transparent text-left"
                onClick={() => onSend({ role: "user", content: prompt })}
                style={{ borderColor: 'transparent', transition: 'border-color 0.3s', width: 'fit-content' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgb(57, 77, 255)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}
      <textarea
        ref={textareaRef}
        className="min-h-[44px] rounded-lg pl-4 pr-12 py-2 w-full focus:outline-none border-2 border-neutral-200"
        style={{ resize: "none", transition: 'border 0.3s' }}
        placeholder="Ask OpenReplay AI a question"
        value={content}
        rows={1}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onMouseEnter={(e) => (e.currentTarget.style.border = '2px solid rgb(57, 77, 255)')}
        onMouseLeave={(e) => (e.currentTarget.style.border = '2px solid neutral-200')}
      />
      <button
        onClick={handleSend}
        className="absolute right-2 bottom-3 h-8 w-8 flex items-center justify-center rounded p-1 bg-blue-500 text-white hover:opacity-80"
      >
        ↑
      </button>
    </div>
  );
};
