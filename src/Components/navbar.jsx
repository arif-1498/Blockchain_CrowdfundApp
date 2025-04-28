"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import Link from "next/link";
import image from "next/image";
import { Menu, X } from "lucide-react";
export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-violet-400 shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          <div className="flex items-center">
          <img
              src="/Crowdfundinglogo.png"
              alt="Logo"
              className="h-10 mr-4 transform hover:scale-110 transition-transform duration-300"
            />
            <span className="self-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all duration-300 whitespace-nowrap animate-pulse">
              Crowd Funding
            </span>
          </div>
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600">
            Creat Campaign
          </Link>
        </div>
        <ConnectButton />

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white">
          <Link href="/" className="block text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link
            href="/contact"
            className="block text-gray-700 hover:text-blue-600"
          >
            Create Campaign
          </Link>
        </div>
      )}
    </nav>
  );
};
