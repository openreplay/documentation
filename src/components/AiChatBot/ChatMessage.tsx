import { Message } from ".";
import React from 'react';
import { FC } from "react";
import ReactMarkdown from 'react-markdown';

interface Props {
  message: Message;
}

export const ChatMessage: FC<Props> = ({ message }) => {
  return (
    <div className={`flex w-full ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
      <div
        className={`flex flex-col ${message.role === "assistant" ? "bg-neutral-200 text-neutral-900" : "bg-blue-500 text-white"} rounded-2xl px-3 py-2 max-w-[67%] whitespace-pre-wrap`}
        style={{ overflowWrap: "anywhere" }}
      >
        <ReactMarkdown
          components={{
            p: ({ node, ...props }) => (
              <p style={{ color: message.role === "assistant" ? "inherit" : "white", marginTop: 6 }} {...props} />
            ),
            a: ({ node, ...props }) => (
              <a style={{ color: message.role === "assistant" ? "blue" : "lightblue" }} {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul style={{ paddingLeft: "20px", listStyleType: "disc" }} {...props} />
            ),
            li: ({ node, ...props }) => (
              <li style={{ color: message.role === "assistant" ? "inherit" : "white", marginTop: -20 }} {...props} />
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
