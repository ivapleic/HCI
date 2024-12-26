"use client";

import React from "react";
import Modal from "@/app/components/Modal/Modal";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-3xl font-bold mb-5 text-[#593E2E] text-center">Join Us !</h1>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-md font-bold mb-1 text-[#593E2E]"
          >
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            className="w-full border rounded-lg p-2 bg-white"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-md font-bold mb-1 text-[#593E2E]"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg p-2 bg-white"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-md font-bold mb-1 text-[#593E2E]"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="w-full border rounded-lg p-2 bg-white mb-4"
          />
        </div>
        <button
          type="submit"
          className="w-full text-white py-2 rounded-lg bg-[#593E2E] hover:bg-[#8C6954] "
        >
          Register
        </button>
      </form>
    </Modal>
  );
};

export default RegisterModal;
