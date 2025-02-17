// app/auth/login/components/LoginModal.tsx
"use client";

import React, { useState } from "react";
import Modal from "@/app/components/Modal/Modal";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-3xl font-bold mb-5 text-[#593E2E] text-center">Login</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-md font-bold mb-1 text-[#593E2E]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-2 bg-white text-[#593E2E]"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-md font-bold mb-1 text-[#593E2E]">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-2 bg-white text-[#593E2E] mb-4"
          />
        </div>
        <button
          type="submit"
          className="w-full text-white py-2 rounded-lg bg-[#593E2E] hover:bg-[#8C6954]"
        >
          Log in
        </button>
      </form>
    </Modal>
  );
};

export default LoginModal;
