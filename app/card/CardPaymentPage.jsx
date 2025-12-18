"use client";

import { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  CreditCard,
  Loader2,
  CheckCircle,
} from "lucide-react";

/* ---------------- PAYMENT METHODS ---------------- */
const METHODS = [
  { id: "visa", label: "Visa", icon: "/visa.svg", currency: "eur" },
  { id: "mastercard", label: "Mastercard", icon: "/mastercard.svg", currency: "usd" },
  { id: "applepay", label: "Apple Pay", icon: "/applepay.svg", currency: "eur" },
  { id: "gpay", label: "Google Pay", icon: "/gpay.svg", currency: "eur" },
];


export default function CombinedPaymentPage() {
  const [method, setMethod] = useState("visa");
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  /* ---------------- VALIDATION ---------------- */
  const validateCardNumber = (num) => {
    const clean = num.replace(/\s/g, "");
    if (clean.length < 16) return false;

    let sum = 0;
    let alt = false;
    for (let i = clean.length - 1; i >= 0; i--) {
      let n = parseInt(clean[i]);
      if (alt) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      sum += n;
      alt = !alt;
    }
    return sum % 10 === 0;
  };

  const formatExpiry = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d;
  };

  /* ---------------- PAY HANDLER ---------------- */
  const handlePay = async () => {
    const errs = {};

    if (!validateCardNumber(cardNumber)) errs.cardNumber = "Invalid card number";
    if (expiry.length < 5) errs.expiry = "Invalid expiry";
    if (cvv.length < 3) errs.cvv = "Invalid CVV";
    if (!name.trim()) errs.name = "Enter cardholder name";
    if (!amount || Number(amount) <= 0) errs.amount = "Enter valid amount";

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const selectedMethod = METHODS.find((m) => m.id === method);
    if (!selectedMethod) return;

    setLoading(true);
    setSuccess(true);

    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount),
          currency: selectedMethod.currency,
          description: `Payment via ${method} by ${name}`,
        }),
      });

      const data = await res.json();

      if (data.url) {
        setTimeout(() => {
          window.location.href = data.url;
        }, 2200);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const activeCurrency =
    METHODS.find((m) => m.id === method)?.currency.toUpperCase() || "EUR";

  return (
    <div
      className="
        min-h-screen bg-[#0b0f1a]
        flex items-center justify-center
        px-4 sm:px-6 md:px-8
        py-32 sm:py-24 md:py-32
        relative overflow-hidden
      "
    >
      {/* MAIN CARD */}
      <div
        className="
          relative w-full
          max-w-sm sm:max-w-md
          bg-white/10 backdrop-blur-2xl
          border border-white/20
          rounded-3xl
          p-5 sm:p-6 md:p-8
          shadow-2xl
        "
      >
        {/* PAYMENT METHODS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {METHODS.map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl border transition
                ${
                  method === m.id
                    ? "border-purple-500 bg-purple-500/20 shadow-lg"
                    : "border-white/20 bg-gray-800/40 hover:bg-gray-700/40"
                }`}
            >
              <img src={m.icon} className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-white text-xs sm:text-sm font-semibold">
                {m.label}
              </span>
            </button>
          ))}
        </div>

        <h2 className="text-center text-white text-2xl sm:text-3xl font-bold mb-2">
          Secure Payment
        </h2>

        <p className="text-center text-white/70 flex justify-center items-center mb-8 text-sm sm:text-base">
          <Lock className="w-4 h-4 mr-1 text-green-400" />
          Encrypted & Secure
        </p>

        {/* AMOUNT */}
        <Input
          label={`Amount (${activeCurrency})`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          error={errors.amount}
        />

        {/* CARD NUMBER */}
        <Input
          label="Card Number"
          value={cardNumber}
          placeholder="0000 0000 0000 0000"
          onChange={(e) => {
            let v = e.target.value.replace(/\D/g, "").slice(0, 16);
            v = v.match(/.{1,4}/g)?.join(" ") || "";
            setCardNumber(v);
          }}
          icon={<CreditCard />}
          error={errors.cardNumber}
        />

        {/* EXPIRY + CVV */}
        <div className="flex flex-row sm:flex-row gap-4 mt-5">
          <Input
            label="Expiry"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            error={errors.expiry}
          />
          <CVV value={cvv} onChange={setCvv} error={errors.cvv} />
        </div>

        {/* NAME */}
        <Input
          label="Cardholder Name"
          placeholder="Alex Johnson"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />

        {/* PAY BUTTON */}
        <button
          onClick={handlePay}
          disabled={loading}
          className="
            w-full mt-8
            py-3 sm:py-4
            rounded-xl
            bg-gradient-to-r from-purple-600 to-pink-500
            text-white font-bold
            text-base sm:text-lg
            hover:opacity-90 transition
          "
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" /> Processing
            </span>
          ) : (
            "Pay Now"
          )}
        </button>
      </div>

      {/* SUCCESS MODAL */}
      {success && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div
            className="
              relative bg-white rounded-3xl
              p-6 sm:p-8 md:p-10
              text-center
              max-w-xs sm:max-w-sm
              w-full
              shadow-2xl
            "
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900">
              Card Payment Initialized 🎉
            </h3>
            <p className="text-gray-600 mt-3 text-sm">
              Redirecting you securely to the payment processor…
            </p>
            <div className="mt-6 flex justify-center gap-2 text-gray-500 text-sm">
              <Loader2 className="animate-spin w-4 h-4" />
              Please wait
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- INPUT ---------------- */
function Input({ label, value, onChange, icon, error, placeholder }) {
  return (
    <div className="relative w-full mt-5">
      <label className="text-white/80 text-sm">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">
            {icon}
          </div>
        )}
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full mt-1 p-3 rounded-xl bg-gray-800 text-white border
            placeholder:text-white/40
            ${icon ? "pl-10" : ""}
            ${error ? "border-red-500" : "border-gray-600"}`}
        />
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

/* ---------------- CVV ---------------- */
function CVV({ value, onChange, error }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full mt-5">
      <label className="text-white/80 text-sm">CVV</label>
      <input
        type={show ? "text" : "password"}
        value={value}
        placeholder="123"
        onChange={(e) =>
          onChange(e.target.value.replace(/\D/g, "").slice(0, 4))
        }
        className={`w-full mt-1 p-3 rounded-xl bg-gray-800 text-white border
          ${error ? "border-red-500" : "border-gray-600"}`}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 p-2 rounded-lg text-white/70 hover:text-white"
      >
        {show ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
