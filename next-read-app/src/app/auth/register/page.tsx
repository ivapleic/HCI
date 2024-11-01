// app/book/[bookId]/page.js
import BookImage from "C:/Users/Korisnik/Desktop/HCI/next-read-app/public/assets/icon-books.png";
import Image from "next/image";
import "./Register.css";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen">
      {/* Lijevi dio - forma */}
      <div className="w-1/2 h-1/2 flex items-center justify-center p-10">
        <form className="w-full max-w-sm">
          <h1 className="text-3xl font-bold mb-6">Registration</h1>

          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder=""
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder=""
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder=""
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="sign-up-btn text-white font-bold py-2 rounded-lg focus:outline-none focus:shadow-outline w-full" 
            >
              Sign up
            </button>
          </div>
        </form>
      </div>

      {/* Desni dio - slika */}
      <div className="w-1/2 h-1/2  flex items-center justify-center">
        <Image
          src={BookImage}
          alt="Register"
          className="object-cover h-80 w-full"
        />
      </div>
    </div>
  );
}
