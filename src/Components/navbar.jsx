
'use client'
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from 'lucide-react'
export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-blue-600">
        MyLogo
      </Link>

      <div className="hidden md:flex space-x-6">
        <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
        <Link href="/services" className="text-gray-700 hover:text-blue-600">Services</Link>
        <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
      </div>

      <div className="md:hidden">
        <button onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
    </div>

    {open && (
      <div className="md:hidden px-4 pb-4 space-y-2 bg-white">
        <Link href="/" className="block text-gray-700 hover:text-blue-600">Home</Link>
        <Link href="/about" className="block text-gray-700 hover:text-blue-600">About</Link>
        <Link href="/services" className="block text-gray-700 hover:text-blue-600">Services</Link>
        <Link href="/contact" className="block text-gray-700 hover:text-blue-600">Contact</Link>
      </div>
    )}
  </nav>
  );
};
