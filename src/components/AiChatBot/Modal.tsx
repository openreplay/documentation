import React, { ReactNode } from 'react';

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
        <div className="flex flex-col md:flex-row items-center justify-between border-b bg-white w-full p-4 rounded-t-lg relative">
          <div className="flex items-center space-x-2 w-full md:justify-center">
            <h3 className="text-lg font-bold text-black text-center md:text-left">OpenReplay Docs AI</h3>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">EXPERIMENTAL</span>
          </div>
          <button
            className="absolute top-2 right-2 text-black bg-transparent border-none focus:outline-none"
            onClick={onClose}
          >
            ✖️
          </button>
        </div>
        <div className="bg-gray-100 p-6 w-full rounded-b-lg overflow-y-auto" style={{ maxHeight: '75vh' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
