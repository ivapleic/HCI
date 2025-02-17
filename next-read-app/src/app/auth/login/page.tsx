// app/auth/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginModal from "@/app/auth/login/components/LoginModal";  // Putanja prema LoginModal

const LoginPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
    router.push("/"); // Vrati na početnu stranicu nakon zatvaranja modala
  };

  return (
    <LoginModal
      isOpen={isOpen}
      onClose={handleClose}
      onLogin={(email: string, password: string) => {
        console.log("User logged in with:", email, password);
        handleClose();
      }}
    />
  );
};

export default LoginPage;
