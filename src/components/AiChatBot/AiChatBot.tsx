import React, { useEffect, useRef, useState } from 'react';
import { Chat } from './Chat';
import { Modal } from './Modal';
import { Message } from './index';

const AiChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [hasSentMessage, setHasSentMessage] = useState<boolean>(false);
  const [assistantHistory, setAssistantHistory] = useState<string[]>([]);
  const [userHistory, setUserHistory] = useState<string[]>([]);
  const [continuationMessageId, setContinuationMessageId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateHistory = (role: string, content: string) => {
    if (role === 'assistant') {
      setAssistantHistory((prev) => [...prev.slice(-2), content]);
    } else if (role === 'user') {
      setUserHistory((prev) => [...prev.slice(-2), content]);
    }
  };

  const handleSend = async (message: Message) => {
    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    setLoading(true);
    setHasSentMessage(true);

    const apiKey = process.env.DOCS_KEY;
    const userQuestion = message.content;

    // Update user history
    updateHistory('user', userQuestion);

    console.debug('User history:', userHistory);
    console.debug('Assistant history:', assistantHistory);

    try {
      const body = JSON.stringify({
        question: userQuestion,
        assistant_history: assistantHistory,
        user_history: userHistory,
        n_references: 3,
        resume: false,
      });

      console.debug('Request body:', body);

      const response = await fetch('https://api.openreplay.com/ai/docs/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body,
      });

      console.debug('API response status:', response.status);
      if (!response.ok) {
        setLoading(false);
        throw new Error(`API response error: ${response.statusText}`);
      }

      const data = await response.json();
      console.debug('API response data:', data);
      if (!data) return;

      setLoading(false);

      // Format the response and references
      const formattedResponse = `${data.response.join(' ')}\n\n**Related resources:**\n${data.references.map((ref: { url: string, title: string }) => `- [${ref.title}](${ref.url})`).join('\n')}`;

      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: formattedResponse },
      ]);

      // Ensure data.response is a string before updating history
      const responseContent = Array.isArray(data.response) ? data.response.join(' ') : data.response;
      if (typeof responseContent === 'string') {
        updateHistory('assistant', responseContent);
      } else {
        console.error('Response is not a string:', data.response);
      }

      // Check endReason and set continuation message
      if (data.endReason === "length") {
        setContinuationMessageId(updatedMessages.length); 
        setMessages((messages) => [
          ...messages,
          { role: 'assistant', content: "Continue generating answer? Click here!", isContinuation: true },
        ]);
      } else {
        setContinuationMessageId(null);
      }
    } catch (error) {
      console.error('Error fetching chat response:', error);
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    if (continuationMessageId === null) return;

    setLoading(true);
    const lastAssistantMessage = messages[continuationMessageId].content;
    const apiKey = process.env.DOCS_KEY;

    try {
      const body = JSON.stringify({
        question: lastAssistantMessage,
        assistant_history: assistantHistory,
        user_history: userHistory,
        n_references: 3,
        resume: true,
      });

      console.debug('Request body for continuation:', body);

      const response = await fetch('https://api.openreplay.com/ai/docs/chat', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body,
      });

      console.debug('API response status for continuation:', response.status);
      if (!response.ok) {
        setLoading(false);
        throw new Error(`API response error: ${response.statusText}`);
      }

      const data = await response.json();
      console.debug('API response data for continuation:', data);
      if (!data) return;

      setLoading(false);

      // Check endReason and update continuation message id if needed
      if (data.endReason === "length") {
        setContinuationMessageId(messages.length); 
      } else {
        setContinuationMessageId(null);
      }

      // Format the response and references
      const formattedResponse = `${data.response.join(' ')}\n\n**Related resources:**\n${data.references.map((ref: { url: string, title: string }) => `- [${ref.title}](${ref.url})`).join('\n')}`;

      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: formattedResponse },
      ]);

      // Ensure data.response is a string before updating history
      const responseContent = Array.isArray(data.response) ? data.response.join(' ') : data.response;
      if (typeof responseContent === 'string') {
        updateHistory('assistant', responseContent);
      } else {
        console.error('Response is not a string:', data.response);
      }
    } catch (error) {
      console.error('Error fetching chat continuation response:', error);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Welcome to the OpenReplay Docs AI Assistant. What can I help you with?',
      },
    ]);
    setAssistantHistory([]);
    setUserHistory([]);
    setHasSentMessage(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: 'Welcome to the OpenReplay Docs AI Assistant. What can I help you with?',
      },
    ]);
  }, []);

  const handleAssistantMessageClick = (messageId: number) => {
    if (messages[messageId].isContinuation) {
      handleContinue();
    }
  };

  return (
    <div>
      <style>
        {`
          .bg-blue-500 {
            background-color: rgb(57 77 255);
          }
        `}
      </style>
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-auto sm:px-10 pb-4 sm:pb-10">
          <div className="max-w-[800px] mx-auto mt-4 sm:mt-12"></div>
        </div>
      </div>

      <button
        className="fixed bottom-4 right-4 bg-gradient-to-r from-teal-500 bg-indigo-600 hover:bg-blue-700 cursor-pointer rounded-full text-white font-bold py-2 px-4 rounded shadow-lg z-50 flex items-center gap-2 drop-shadow-sm"
        onClick={() => {
          setIsChatOpen(!isChatOpen);
          console.debug(`Button, isChatOpen: ${!isChatOpen}`);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>
        Ask AI
      </button>

      {isChatOpen && (
        <Modal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)}>
          <Chat
            messages={messages}
            loading={loading}
            onSend={handleSend}
            onReset={handleReset}
            hasSentMessage={hasSentMessage}
            onMessageClick={handleAssistantMessageClick}
          />
          <div ref={messagesEndRef}></div>
        </Modal>
      )}
    </div>
  );
};

export default AiChatBot;
