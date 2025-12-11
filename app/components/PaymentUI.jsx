"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { auth } from "@/app/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function PaymentUI() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // 🔥 Detect logged-in user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsub();
  }, []);

  // 🔥 Logout function
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-30 mb-0">

      {/* Background Video */}
      <video
        src="/video1.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      ></video>

      {/* Decorative Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-600/40 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/30 blur-3xl rounded-full"></div>

      {/* MAIN CARD */}
      <div className="relative z-20 w-[90%] max-w-4xl rounded-3xl bg-white/10 border border-white/20 shadow-[0_0_50px_rgba(0,0,20,0.5)] p-10">

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Complete Your Secure Payment
        </h1>

        <p className="text-white/70 mb-10">
          Choose how you want to get started or make a payment.
        </p>

        <div className="flex flex-col md:flex-row justify-between items-center gap-10">

          {/* LEFT SIDE */}
          <div className="relative w-full md:w-2/3 rounded-2xl p-6 overflow-hidden shadow-xl">
            <p className="text-white text-xs uppercase tracking-wider">
              Payment Options
            </p>

            <p className="text-white font-semibold text-lg mb-4">
              Available Payment Methods
            </p>

            {/* ICON LIST */}
            <div className="flex gap-6 flex-wrap">
              <HoverIcon label="Visa" iconSrc="/visa.svg" />
              <HoverIcon label="MasterCard" iconSrc="/mastercard.svg" />
              <HoverIcon label="Apple Pay" iconSrc="/applepay.svg" />
              <HoverIcon label="Google Pay" iconSrc="/gpay.svg" />
            </div>
          </div>

          {/* RIGHT SIDE BUTTONS */}
          <div className="w-full md:w-1/3 flex flex-row justify-center gap-4">

            {/* 🔥 GET STARTED → LOGOUT */}
            {!user ? (
              <button
                onClick={() => router.push("/signup")}
                className="px-4 py-3 rounded-lg bg-gradient-to-br from-green-400 to-green-800 text-white font-semibold shadow-md hover:scale-105 transition"
              >
                Get Started
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-3 rounded-lg bg-red-600 text-white font-semibold shadow-md hover:scale-105 transition"
              >
                Logout
              </button>
            )}

            {/* PAY NOW */}
            <button
              onClick={() => setOpen(true)}
              className="px-6 py-3 rounded-lg bg-gradient-to-br from-sky-400 via-cyan-500 to-blue-600 text-white font-semibold shadow-md hover:scale-105 transition"
            >
              Pay Now
            </button>
          </div>
        </div>

        {/* MODAL */}
        {open && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="w-80 bg-[#0d1522]/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-5 animate-fadeSlideUp">

              <div className="flex justify-between items-center mb-4">
                <p className="text-white font-semibold">Select Payment Method</p>
                <button
                  className="text-white/50 hover:text-white text-xl"
                  onClick={() => setOpen(false)}
                >
                  <X />
                </button>
              </div>

              <div className="space-y-3 rounded-full">
                <ModalButton
                  label="Visa"
                  iconSrc="/visa.svg"
                  onClick={() => router.push("/card?method=visa")}
                />

                <ModalButton
                  label="MasterCard"
                  iconSrc="/mastercard.svg"
                  onClick={() => router.push("/card?method=mastercard")}
                />

                <ModalButton
                  label="Apple Pay"
                  iconSrc="/applepay.svg"
                  onClick={() => router.push("/card?method=applepay")}
                />

                <ModalButton
                  label="Google Pay"
                  iconSrc="/gpay.svg"
                  onClick={() => router.push("/card?method=gpay")}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ICON WITH HOVER GLOW */
function HoverIcon({ iconSrc, label }) {
  return (
    <div className="flex items-center gap-3 bg-white/10 border border-white/20 px-4 py-3 rounded-xl text-white hover:bg-white/20 hover:shadow-xl transition">
      <div className="p-2 rounded-xl bg-white/20">
        <img src={iconSrc} className="w-8 h-8 object-contain" />
      </div>
      <span className="text-sm">{label}</span>
    </div>
  );
}

/* BUTTON INSIDE MODAL */
function ModalButton({ iconSrc, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:shadow-xl transition"
    >
      <img src={iconSrc} className="w-5 h-5 object-contain" />
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}
