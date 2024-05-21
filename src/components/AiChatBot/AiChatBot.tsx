import React, { useEffect, useRef, useState } from 'react';
import { Chat } from './Chat';
import { Modal } from './Modal';
import { Message } from './index';

const AiChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [hasSentMessage, setHasSentMessage] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (message: Message) => {
    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    setLoading(true);
    setHasSentMessage(true); // Update the state to indicate a message has been sent
  
    const apiKey = 'paste_key_here';
    const userQuestion = message.content;
  
    try {
      const response = await fetch('https://api.openreplay.com/ai/docs/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          question: userQuestion,
          n_references: 3,
        }),
      });
  
      console.log('API response status:', response.status);
      if (!response.ok) {
        setLoading(false);
        throw new Error(`API response error: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('API response data:', data);
      if (!data) return;
  
      setLoading(false);
  
      // Format the response and references
      const formattedResponse = `${data.response}\n\n**Related resources:**\n${data.references.map((ref: { url: string, title: string }) => `- [${ref.title}](${ref.url})`).join('\n')}`;
  
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: formattedResponse },
      ]);
    } catch (error) {
      console.error('Error fetching chat response:', error);
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
    setHasSentMessage(false); // Reset the state
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
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg z-50"
        onClick={() => {
          setIsChatOpen(!isChatOpen);
          console.log(`Button, isChatOpen: ${!isChatOpen}`); // Log state change
        }}
      >
        ✨ Ask AI
      </button>

      {isChatOpen && (
        <Modal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)}>
          <Chat
            messages={messages}
            loading={loading}
            onSend={handleSend}
            onReset={handleReset}
            hasSentMessage={hasSentMessage} // Pass the state as a prop
          />
          <div ref={messagesEndRef}></div>
        </Modal>
      )}
    </div>
  );
};

export default AiChatBot;
