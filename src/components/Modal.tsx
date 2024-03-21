import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex justify-center items-center transition-colors ${isOpen ? "visible bg-black/20" : "invisible"}`}
        onClick={onClose}
      >
        <div
          className={`bg-slate-200 rounded-lg shadow p-6 transition-all h-auto mt-16 w-auto ${
            isOpen ? "scale-100 opacity-100" : "scale-110 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-[-1.5rem] right-[-1.5rem] focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={onClose}
          >
            X
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
