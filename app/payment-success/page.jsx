"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function PaymentSuccessPage() {

  useEffect(() => {
    async function savePayment() {
      try {
        await fetch("/api/payments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: 50,
            currency: "usd",
            status: "paid",
            invoice_id: "np_" + Date.now()
          })
        });
      } catch (error) {
        console.error("Error saving payment:", error);
      }
    }

    savePayment();
  }, []);

  return (
    <div className="min-h-screen bg-[#040b17] flex items-center justify-center px-6">
      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-xl text-center max-w-md w-full">
        
        <div className="text-green-400 text-6xl mb-4">✔</div>

        <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
        <p className="text-white/60 mb-6">
          Thank you! Your payment has been confirmed.
        </p>

        <Link
          href="/"
          className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl text-white font-semibold transition"
        >
          Go to Home
        </Link>

      </div>
    </div>
  );
}
