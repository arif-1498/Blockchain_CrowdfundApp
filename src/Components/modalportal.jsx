'use client'
import ReactDOM from 'react-dom';

export const ModalPortal = ({ children }) => {
    if (typeof window === 'undefined') return null; 
  
    return ReactDOM.createPortal(
      <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50">
        {children}
      </div>,
      document.body
    );
  };
  
 
