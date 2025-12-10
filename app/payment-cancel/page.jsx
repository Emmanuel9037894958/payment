"use client";

import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-[#100a0a] flex items-center justify-center px-6">
      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-red-400/40 shadow-xl text-center max-w-md w-full">
        
        <div className="text-red-400 text-6xl mb-4">✖</div>

        <h1 className="text-3xl font-bold text-white mb-2">Payment Failed</h1>
        <p className="text-white/60 mb-6">
          Your payment failed. Try again.
        </p>

        <Link
          href="/"
          className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-xl text-white font-semibold transition"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
