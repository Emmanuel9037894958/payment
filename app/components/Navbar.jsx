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
        w-full fixed top-0 z-50 
        bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
        text-white border-b border-white/20
        shadow-lg backdrop-blur-xl
      "
    >
      {/* MAIN NAV CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="h-20 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <Image src="/emma.png" alt="Logo" width={45} height={45} className="rounded-full"/>
            <span className="text-xl md:text-2xl font-bold tracking-wide">ZentraPay</span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-10">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white/90 hover:text-white transition text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="hidden lg:flex items-center gap-5">
            <Link href="/login" className="text-white/80 hover:text-white text-sm">
              Login
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden text-white"
            onClick={() => setOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={32} />
          </button>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white text-black shadow-2xl z-[60]
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex justify-between items-center px-6 py-5  border-b">
          <div className="flex items-center gap-3">
            <Image src="/emma.png" alt="Logo" width={40} height={40} className="rounded-full"/>
            <span className="text-xl font-semibold">ZentraPay</span>
          </div>

          <button onClick={() => setOpen(false)} aria-label="Close Menu">
            <X size={28} className="text-black" />
          </button>
        </div>

        {/* SIDEBAR MENU LINKS */}
        <div className="px-6 py-6 space-y-5 bg-white h-screen">
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

          <hr className="my-4 border-gray-300" />

          <Link href="/login" onClick={() => setOpen(false)} className="block text-lg text-gray-700">
            Login
          </Link>

          <Link
            href="/signup"
            onClick={() => setOpen(false)}
            className="block bg-black text-white text-center py-2 rounded-lg text-lg font-medium"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* OVERLAY BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[50]"
        />
      )}
    </nav>
  );
}
