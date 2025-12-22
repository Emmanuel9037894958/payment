"use client";

import React, { useState } from "react";

const PAYMENT_LINK = "https://flutterwave.com/pay/swj4qzcu6cra";

export default function PaymentUI() {
  const [amount, setAmount] = useState("");

  // 💳 Redirect to Flutterwave Payment Link
  const startPayment = () => {
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount in EUR");
      return;
    }

    // Redirect to Flutterwave hosted checkout
    window.location.href = PAYMENT_LINK;
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-30">
      {/* 🎥 Background Video */}
      <video
        src="/video1.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Decorative Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-500/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/30 blur-3xl rounded-full"></div>

      {/* CARD */}
      <div className="relative z-20 w-[90%] max-w-4xl rounded-3xl bg-white/15 border border-white/40 p-10">
        <h1 className="text-4xl font-bold text-white mb-3">
          Complete Your Secure Payment
        </h1>

        <p className="text-white/70 mb-6">
          You’ll be redirected to a secure Flutterwave payment page.
        </p>

        {/* 💶 Amount Input */}
        <div className="mb-6">
          <label className="block text-white/80 mb-2">Amount (EUR)</label>
          <input
            type="number"
            min="1"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount in EUR"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20
                       text-white placeholder-white/40 outline-none"
          />
        </div>

        {/* PAYMENT OPTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <PayIcon label="Visa" icon="/visa.svg" onClick={startPayment} />
          <PayIcon label="MasterCard" icon="/mastercard.svg" onClick={startPayment} />
          <PayIcon
            label="Apple Pay"
            icon="/applepay.svg"
            badge="Powered by Flutterwave"
            onClick={startPayment}
          />
          <PayIcon
            label="Google Pay"
            icon="/gpay.svg"
            badge="Powered by Flutterwave"
            onClick={startPayment}
          />
        </div>
      </div>
    </div>
  );
}

/* PAYMENT ICON COMPONENT */
function PayIcon({ icon, label, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center gap-3 bg-white/10 border border-white/20
                 px-5 py-4 rounded-xl text-white
                 hover:bg-white/20 hover:scale-105 transition"
    >
      <img src={icon} className="w-8 h-8 object-contain" alt={label} />
      <div className="flex flex-col text-left">
        <span className="font-medium">{label}</span>
        {badge && (
          <span className="text-[11px] text-white/60 mt-0.5">
            {badge}
          </span>
        )}
      </div>
    </button>
  );
}
