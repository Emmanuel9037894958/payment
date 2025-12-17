"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Loader2 } from "lucide-react";

export default function PaymentUI() {
  const [user, setUser] = useState(null);
  const [loadingMethod, setLoadingMethod] = useState(null);
  const router = useRouter();

  // 🔥 Detect logged-in user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  // 🔥 Logout
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  // 🔥 Handle payment selection with loader
  const handleSelectMethod = (method) => {
    setLoadingMethod(method);

    setTimeout(() => {
      router.push(`/card?method=${method}`);
    }, 6000); // ⏳ 6 seconds loader
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-30">

      {/* Background Video */}
      <video
        src="/video1.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-00/40 blur-3  xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/30 blur-3xl rounded-full"></div>

      {/* CARD */}
      <div className="relative z-20 w-[90%] max-w-4xl rounded-3xl bg-white/15 border border-white/40 p-10">

        <h1 className="text-4xl font-bold text-white mb-3">
          Complete Your Secure Payment
        </h1>

        <p className="text-white/70 mb-10">
          Choose your preferred payment method.
        </p>

        {/* PAYMENT OPTIONS */}
        <div className="flex gap-5 flex-wrap mb-">
          <PayIcon label="Visa" icon="/visa.svg" onClick={() => handleSelectMethod("visa")} />
          <PayIcon label="MasterCard" icon="/mastercard.svg" onClick={() => handleSelectMethod("mastercard")} />
          <PayIcon label="Apple Pay" icon="/applepay.svg" onClick={() => handleSelectMethod("applepay")} />
          <PayIcon label="Google Pay" icon="/gpay.svg" onClick={() => handleSelectMethod("gpay")} />
        </div>

        {/* ACTION BUTTON */}
        <div className="flex gap-4">
          {!user ? (
            <button
              onClick={() => router.push("/signup")}
              className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold"
            >
              Get Started
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="px-6 py-3 mt-11 rounded-lg bg-red-600 text-white font-semibold"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* 🔥 FULLSCREEN LOADER */}
      {loadingMethod && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
          <Loader2 className="w-16 h-16 text-white animate-spin mb-6" />
          <p className="text-white text-lg font-semibold text-center">
            Preparing secure {loadingMethod.toUpperCase()} payment…
          </p>
        </div>
      )}
    </div>
  );
}


function PayIcon({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 bg-white/10 border border-white/20 px-5 py-4 rounded-xl text-white
                 hover:bg-white/20 hover:scale-105 transition"
    >
      <img src={icon} className="w-8 h-8 object-contain" />
      <span className="font-medium">{label}</span>
    </button>
  );
}
