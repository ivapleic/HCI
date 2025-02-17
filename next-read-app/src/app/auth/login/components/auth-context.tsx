'use client';

import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <AuthContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </AuthContext.Provider>
  );
};
