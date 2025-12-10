"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function CardPaymentPage() {
  const params = useSearchParams();
  const method = params.get("method"); // visa, mastercard, applepay, gpay

  const icons = {
    visa: "/visa.svg",
    mastercard: "/mastercard.svg",
    applepay: "/applepay.svg",
    gpay: "/gpay.svg",
  };

  return (
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center px-6 py-30 relative overflow-hidden">

      {/* ORANGE UNDER SHADOW */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-orange-500/30 blur-[120px]"></div>

      {/* BACKGROUND BLOBS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/20 blur-[150px] rounded-full"></div>

      {/* CARD CONTAINER */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 shadow-[0_40px_120px_rgba(255,120,0,0.45)]">

        {/* SELECTED METHOD ICON */}
        {method && (
          <div className="flex justify-center mb-8">
            <img
              src={icons[method]}
              className="w-28 h-20 object-contain drop-shadow-2xl animate-pulse"
            />
          </div>
        )}

        <h2 className="text-center text-white text-3xl font-extrabold mb-11">
          Secure Card Payment
        </h2>

        {/* CARD NUMBER */}
        <FloatingInput label="Card Number" placeholder="1234 5678 9012 3456" />

        {/* EXPIRY + CVV */}
        <div className="flex gap-4 mt-11">
          <FloatingInput label="Expiry (MM/YY)" placeholder="08/27" />
          <CVVInput />
        </div>

        {/* CARDHOLDER NAME WITH ICON */}
        <div className="relative mt-11">
          {method && (
            <img
              src={icons[method]}
              className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 opacity-90 rounded-full"
            />
          )}

          <FloatingInput
            label="Cardholder Name"
            placeholder="Anabel Martha"
            extraClass="pl-12"
          />
        </div>

        {/* PAY BUTTON */}
        <button className="w-full py-4 mt-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold hover:opacity-90 shadow-lg transition-all">
          Pay Now
        </button>
      </div>
    </div>
  );
}

/* FLOATING LABEL INPUT */
function FloatingInput({ label, placeholder, type = "text", extraClass = "" }) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full p-4 bg-white/10 border border-white/20 text-white rounded-xl outline-none transition 
        focus:ring-2 focus:ring-blue-400 ${extraClass}`}
      />
      <span className="absolute -top-3 left-3 bg-[#0b1120] px-2 text-white/70 text-xs">
        {label}
      </span>
    </div>
  );
}

/* CVV WITH TOGGLE */
function CVVInput() {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={show ? "text" : "password"}
        placeholder="•••"
        maxLength={4}
        className="w-full p-4 bg-white/10 border border-white/20 text-white rounded-xl outline-none transition 
        focus:ring-2 focus:ring-blue-400"
      />

      <span className="absolute -top-3 left-3 bg-[#0b1120] px-2 text-white/70 text-xs">
        CVV
      </span>

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
      >
        {show ? <Eye size={20} /> : <EyeOff size={20} />}
      </button>
    </div>
  );
}
