"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RegisterModal from "./components/RegisterModal";

const RegisterPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
    router.back(); // Vrati korisnika na prethodnu stranicu
  };

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return <RegisterModal isOpen={isOpen} onClose={handleClose} />;
};

export default RegisterPage;
