import React, { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-lg z-50 max-w-3xl w-full mx-4 md:mx-6 lg:mx-8">
        <div className="flex flex-col md:flex-row items-center justify-between border-b bg-gradient-to-r from-teal-100 bg-indigo-200 w-full p-4 rounded-t-lg relative">
          <div className="flex items-center space-x-2 w-full md:justify-center">
            <h3 className="text-lg font-bold text-black text-center md:text-left flex items-center gap-2">
            <Sparkles size={20} />
            Ask AI</h3>
            <span className="text-xs  bg-gradient-to-r from-white/50 bg-indigo-50/50  text-black px-2 py-1 rounded-full">EXPERIMENTAL</span>
          </div>
          <button
          className="absolute top-3 right-2 text-black bg-transparent border-none focus:outline-none cursor-pointer"
          onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        <div className="bg-indigo-50 p-6 w-full rounded-b-lg overflow-y-auto" style={{ maxHeight: '75vh' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
