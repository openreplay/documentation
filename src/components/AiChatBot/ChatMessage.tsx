import { Message } from ".";
import React from 'react';
import { FC } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  message: Message;
}

export const ChatMessage: FC<Props> = ({ message }) => {
  const [showFollowUp, setShowFollowUp] = React.useState(false);

  React.useEffect(() => {
    // Only show follow-up if it's an assistant message, not the welcome message, 
    // and not a continuation message
    if (
      message.role === "assistant" && 
      message.content !== 'Welcome to the OpenReplay Docs AI Assistant. What can I help you with?' &&
      !message.isContinuation
    ) {
      const timer = setTimeout(() => {
        setShowFollowUp(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [message.role, message.content]);

  return (
    <>
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
      
      {message.role === "assistant" && showFollowUp && !message.isContinuation && (
        <div className="flex w-full justify-start mt-2 animate-fade-in">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 max-w-[67%] shadow-sm border border-indigo-100 hover:border-indigo-200 transition-colors">
            <p className="text-sm font-bold text-gray-800 mb-1">Not the answer you were looking for?</p>
            <p className="text-sm text-gray-600">
              Try posting your question in our{' '}
              <a 
                href="https://join.slack.com/t/openreplay/shared_invite/zt-3090w3wwi-BWYoPyVVSfoRqklblyETow" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              >
                OpenReplay Community Slack
              </a>
              {' '}and our team will help!
            </p>
          </div>
        </div>
      )}
    </>
  );
};
