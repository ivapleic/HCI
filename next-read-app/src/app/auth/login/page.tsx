"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

//imports the login function that checks if the user exists in contenful
import { loginUser } from "@/lib/auth"; 

const LoginPage = () => {

  // inputs states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await loginUser(email, password);

    if (user) {
      console.log("User logged in:", user);
      router.push("/"); //redirect to home page
    } else {
      console.log("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex mt-20 items-start justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
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
              required
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
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white py-2 rounded-lg bg-[#593E2E] hover:bg-[#8C6954]"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
