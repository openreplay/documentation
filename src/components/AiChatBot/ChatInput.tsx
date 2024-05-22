import React, { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Message } from ".";
import { CornerDownLeft } from 'lucide-react';
import styles from './AiChatBotStyles.module.css';

interface Props {
  onSend: (message: Message) => void;
  hasSentMessage: boolean;
}

export const ChatInput: FC<Props> = ({ onSend, hasSentMessage }) => {
  const [content, setContent] = useState<string>("");
  const [remainingChars, setRemainingChars] = useState<number>(300);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 300) {
      setContent(value);
      setRemainingChars(300 - value.length);
    }
  };

  const handleSend = () => {
    if (!content.trim()) {
      alert("Please enter a message");
      return;
    }
    onSend({ role: "user", content });
    setContent("");
    setRemainingChars(300);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
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
      {!hasSentMessage && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Suggested Prompts</h3>
          <div className="flex flex-col gap-2 mt-2">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                className="bg-white hover:border-blue-500 text-gray-700 py-1 px-2 rounded-xl border border-transparent text-left shadow-sm transition-colors w-fit"
                onClick={() => onSend({ role: "user", content: prompt })}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={`${styles.textareaContainer} w-100`}>
        <textarea
          ref={textareaRef}
          className={`${styles.textarea} font-sans text-base w-100`}
          placeholder="Ask OpenReplay AI a question"
          value={content}
          rows={1}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          maxLength={300}
        />
        <button
          onClick={handleSend}
          className="absolute z-10 right-2 bottom-3 h-8 w-8 flex items-center justify-center rounded p-1 bg-transparent text-indigo-500 hover:opacity-80"
        >
          <CornerDownLeft />
        </button>
      </div>
      <div className="text-sm text-gray-500 mt-1">
        {remainingChars} characters remaining
      </div>
    </div>
  );
};
