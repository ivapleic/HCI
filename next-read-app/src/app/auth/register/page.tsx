"use client"
import React, { useState } from "react";
import Image from "next/image";

export default function RegisterPage() {
  // Držimo sve korisničke podatke u jednom objektu
  const [userInput, setUserInput] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // Funkcija koja ažurira stanje objekta
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ovde možete slati podatke na backend, na primer:
    console.log(userInput);
  };

  return (
    <div className="flex min-h-screen">
      {/* Lijevi dio - forma */}
      <div className="w-1/2 h-full flex items-center justify-center p-10">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold mb-6">Registration</h1>

          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Full Name*
            </label>
            <input
              id="fullName"
              name="fullName" // Koristimo `name` atribut za praćenje polja
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 rounded-lg p-2 w-full bg-[#F9F3EE] focus:border-[#8C6954] focus:outline-none"
              required
              value={userInput.fullName} // Povezivanje sa stanjem
              onChange={handleInputChange} // Funkcija koja ažurira stanje
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email*
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-lg p-2 w-full bg-[#F9F3EE] focus:border-[#8C6954] focus:outline-none"
              required
              value={userInput.email} // Povezivanje sa stanjem
              onChange={handleInputChange} // Funkcija koja ažurira stanje
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password*
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-lg p-2 w-full bg-[#F9F3EE] focus:border-[#8C6954] focus:outline-none"
              required
              value={userInput.password} // Povezivanje sa stanjem
              onChange={handleInputChange} // Funkcija koja ažurira stanje
            />
          </div>

          <div className="flex items-center justify-between mt-10">
            <button
              type="submit"
              className="bg-[#593E2E] text-white font-bold py-2 rounded-lg focus:outline-none focus:shadow-outline w-full hover:bg-[#8C6954]"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>

      {/* Desni dio - slika */}
      <div className="w-1/2 h-full">
        <Image
          src="/assets/image2-cover-register.png"
          alt="Register"
          height={550} // Postavite visinu slike
          width={550} // Postavite širinu slike
          className="object-cover py-4" // Slika će prekriti cijeli prostor desne strane
        />
      </div>
    </div>
  );
}
