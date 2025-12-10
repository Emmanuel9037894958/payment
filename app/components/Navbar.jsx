"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Pricing", href: "/pricing" },
    { name: "Payment Methods", href: "/methods" },
    { name: "Developers", href: "/docs" },
    { name: "Support", href: "/support" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <nav
      className="
        w-full 
        fixed 
        top-0 
        z-50 
        border-b border-gray-200 
        bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
        text-white
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/emma.png" alt="Logo" width={40} height={40} className="rounded-full"/>
          <span className="text-xl font-bold">ZentraPay</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white/90 hover:text-white transition"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-white/80 hover:text-white">
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* LEFT SLIDING SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-[60] transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <span className="text-xl font-semibold">LumoPay</span>
          <button onClick={() => setOpen(false)}>
            <X size={28} />
          </button>
        </div>

        <div className="px-6 py-6 space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block text-lg text-gray-700 hover:text-black transition"
            >
              {item.name}
            </Link>
          ))}

          <hr className="my-4" />

          <Link href="/login" className="block text-gray-700 text-lg">
            Login
          </Link>

          <Link
            href="/signup"
            className="block bg-black text-white text-center py-2 rounded-lg"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* BACKDROP OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[50]"
        />
      )}
    </nav>
  );
}
