"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginModal from "./components/LoginModal";

const LoginPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
    router.back(); // Vrati korisnika na prethodnu stranicu
  };

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return <LoginModal isOpen={isOpen} onClose={handleClose} />;
};

export default LoginPage;
