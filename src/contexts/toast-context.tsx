'use client';

import React, { createContext, useContext } from 'react';
import { toast as showToast } from '@/hooks/use-toast';

interface ToastContextType {
  toast: typeof showToast;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const success = (message: string, title: string = 'Berhasil') => {
    showToast({
      title,
      description: message,
      variant: 'success',
    });
  };

  const error = (message: string, title: string = 'Error') => {
    showToast({
      title,
      description: message,
      variant: 'destructive',
    });
  };

  const warning = (message: string, title: string = 'Peringatan') => {
    showToast({
      title,
      description: message,
      variant: 'warning',
    });
  };

  const info = (message: string, title: string = 'Info') => {
    showToast({
      title,
      description: message,
      variant: 'info',
    });
  };

  return (
    <ToastContext.Provider
      value={{
        toast: showToast,
        success,
        error,
        warning,
        info,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};
