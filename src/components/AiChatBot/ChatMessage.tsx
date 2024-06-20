import { Message } from ".";
import React from 'react';
import { FC } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  message: Message;
}

export const ChatMessage: FC<Props> = ({ message }) => {
  return (
    <div className={`flex w-full ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
      <div
        className={`flex flex-col ${message.role === "assistant" ? "bg-gradient-to-r from-teal-50 bg-green-50 text-neutral-900 shadow-sm" : "bg-white text-black shadow-sm" } rounded-xl px-3 py-2 max-w-[67%] whitespace-pre-wrap`}
        style={{ overflowWrap: "anywhere" }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ node, ...props }) => (
              <p style={{ color: message.role === "assistant" ? "inherit" : "black", marginTop: 2 }} {...props} />
            ),
            a: ({ node, ...props }) => (
              <a style={{ color: message.role === "assistant" ? "#394dfe" : "lightblue" }} {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul style={{ paddingLeft: "20px", listStyleType: "disc" }} {...props} />
            ),
            li: ({ node, ...props }) => (
              <li style={{ color: message.role === "assistant" ? "inherit" : "white", marginTop: -20 }} {...props} />
            ),
            table: ({ node, ...props }) => (
              <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '10px' }} {...props} />
            ),
            th: ({ node, ...props }) => (
              <th style={{  padding: '8px', backgroundColor: '#f8f9fa' }} {...props} />
            ),
            td: ({ node, ...props }) => (
              <td style={{  padding: '8px' }} {...props} />
            ),
            tr: ({ node, ...props }) => (
              <tr style={{ backgroundColor: 'white' }} {...props} />
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
