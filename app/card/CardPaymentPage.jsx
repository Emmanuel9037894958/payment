"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Lock, CreditCard, Loader2 } from "lucide-react";

export default function AdvancedCardPaymentPage() {
  const params = useSearchParams();
  const methodParam = params.get("method");
  const methods = ["visa", "mastercard", "applepay", "gpay"];
  const method = methods.includes(methodParam) ? methodParam : null;

  const icons = {
    visa: "/visa.svg",
    mastercard: "/mastercard.svg",
    applepay: "/applepay.svg",
    gpay: "/gpay.svg",
  };

  const accentGradient = "from-purple-600 to-pink-500";
  const accentShadow = "shadow-[0_0px_30px_rgba(236,72,153,0.5)]";

  // FORM STATES
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  // CARD VALIDATION
  const validateCardNumber = (num) => {
    const clean = num.replace(/\s/g, "");
    if (clean.length < 16) return false;

    let sum = 0;
    let shouldDouble = false;

    for (let i = clean.length - 1; i >= 0; i--) {
      let digit = parseInt(clean[i]);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  };

  // EXPIRY FORMAT
  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) {
      return digits.slice(0, 2) + "/" + digits.slice(2);
    }
    return digits;
  };

  // ----------------------------------------
  // 🔥 HANDLE PAY → REDIRECT TO NOWPAYMENTS
  // ----------------------------------------
  const handlePay = async () => {
    const newErrors = {};

    if (!validateCardNumber(cardNumber)) newErrors.cardNumber = "Invalid card number";
    if (!expiry || expiry.length < 5) newErrors.expiry = "Invalid expiry";
    if (cvv.length < 3) newErrors.cvv = "Invalid CVV";
    if (!name.trim()) newErrors.name = "Enter cardholder name";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 50,
          currency: "usd",
          description: `Card payment by ${name}`,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // redirect to NOWPayments checkout
      } else {
        alert("NOWPayments error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Payment request failed.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-6 relative overflow-hidden font-sans py-44">
      
      {/* Background Glow */}
      <div className="absolute top-[-5rem] left-[-5rem] w-80 h-80 bg-blue-500/30 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-[-5rem] right-[-5rem] w-96 h-96 bg-pink-500/30 blur-[180px] rounded-full"></div>
      
      {/* Card Container */}
      <div 
        className={`relative w-full max-w-md bg-gray- backdrop-blur-2xl border rounded-3xl p-8 sm:p-10
                    shadow-[0_0_80px_rgba(0,0,0,0.5)]
                    hover:scale-[1.01] transition-all duration-500`}
      >

        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          {method && (
            <img src={icons[method]} className="w-10 h-10 object-contain rounded-full mb-10 bg-white" />
          )}

          <h2 className="text-center text-white text-3xl font-extrabold pb-4">
            Secure Card Payment
          </h2>

          <p className="text-sm text-white/80 flex items-center">
            <Lock className="w-4 h-4 mr-1 text-green-400" /> Your connection is encrypted.
          </p>
        </div>

        {/* FORM INPUTS */}
        <AdvancedInput
          label="Card Number"
          placeholder="0000 0000 0000 0000"
          value={cardNumber}
          onChange={(e) => {
            let v = e.target.value.replace(/\D/g, "").slice(0, 16);
            v = v.match(/.{1,4}/g)?.join(" ") || "";
            setCardNumber(v);
          }}
          icon={<CreditCard className="text-white" />}
          error={errors.cardNumber}
        />

        <div className="flex gap-4 mt-6">
          <AdvancedInput
            label="Expiry (MM/YY)"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            maxLength={5}
            error={errors.expiry}
          />

          <CVVAdvanced
            value={cvv}
            onChange={setCvv}
            error={errors.cvv}
          />
        </div>

        <div className="mt-6">
          <AdvancedInput
            label="Cardholder Name"
            placeholder="cardholder name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
          />
        </div>

        {/* PAY BUTTON */}
        <button
          onClick={handlePay}
          disabled={loading}
          className={`w-full py-4 mt-10 bg-gradient-to-r ${accentGradient}
                      text-white rounded-xl font-bold text-lg transition-all ${accentShadow}
                      ${loading ? "opacity-70" : "hover:opacity-90 active:scale-95"}`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" /> Processing...
            </div>
          ) : (
            "Pay Now"
          )}
        </button>

      </div>
    </div>
  );
}

/* FLOATING INPUT */
function AdvancedInput({ label, placeholder, value, onChange, icon, error, ...props }) {
  return (
    <div className="relative w-full">
      <label
        className={`absolute left-4 px-1 transition-all text-xs
          ${!value ? "top-1/2 -translate-y-1/2 text-white/80 text-base"
                   : "-top-2 bg-gray-900 text-white z-10"}`}
      >
        {label}
      </label>

      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2">{icon}</div>}

        <input
          {...props}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full p-4 text-white bg-gray-800 border rounded-xl placeholder:text-white/60
            ${icon ? "pl-12" : ""}
            ${error ? "border-red-500" : "border-gray-600"}
            focus:border-pink-500 outline-none`}
        />
      </div>

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

/* CVV WITH TOGGLE PREVIEW */
function CVVAdvanced({ value, onChange, error }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full">
      <label
        className={`absolute left-4 px-1 transition-all text-xs
          ${!value ? "top-1/2 -translate-y-1/2 text-white/80 text-base"
                   : "-top-2 bg-gray-900 z-10"}`}
      >
        CVV
      </label>

      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 4))}
        placeholder="***"
        className={`w-full p-4 text-white bg-gray-800 border rounded-xl placeholder:text-white/60
          ${error ? "border-red-500" : "border-gray-600"}
          focus:border-pink-500 outline-none`}
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70"
      >
        {show ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
