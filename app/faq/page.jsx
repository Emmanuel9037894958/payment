"use client";

import { useState } from "react";

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [category, setCategory] = useState("All");

  const categories = ["All", "Payments", "Security", "Account", "API", "General"];

  const faqs = [
    {
      q: "What is ZentraPay?",
      a: "ZentraPay is a secure multi-payment platform that enables users and businesses to accept crypto, cards, and mobile wallet payments instantly. Our system is built with scalable cloud infrastructure, real-time processing, and strong security protocols.",
      cat: "General",
    },
    {
      q: "Is ZentraPay safe to use?",
      a: `Yes. ZentraPay uses multiple strong security layers to protect users:

1. Firebase Authentication protects login, identity, and account sessions.
2. Google Cloud Identity Protection blocks suspicious logins and automated attacks.
3. TLS 1.3 end-to-end encryption ensures all payment data remains secure in transit.
4. OWASP-compliant security standards includes brute-force protection, secure password hashing, and input sanitization.
5. Optional two-factor authentication adds an extra identity protection step.

Your account and payment data are protected with modern, enterprise-grade security.`,
      cat: "Security",
    },
    {
      q: "How long does a payment take to process?",
      a: "Card and wallet payments are processed instantly. Crypto payments may take 1–5 minutes depending on blockchain network traffic.",
      cat: "Payments",
    },
    {
      q: "What payment methods does ZentraPay support?",
      a: "We support crypto (BTC, ETH, USDT, BNB), Visa, Mastercard, Verve, Apple Pay, Google Pay, Samsung Pay, and global bank transfers.",
      cat: "Payments",
    },
    {
      q: "Can I issue refunds?",
      a: "Yes. Crypto refunds are returned manually to the wallet address. Card refunds depend on bank or card issuer policies.",
      cat: "Payments",
    },
    {
      q: "Do I need to verify my email?",
      a: "Yes. Email verification strengthens account security and is required before accessing protected areas or processing payments.",
      cat: "Account",
    },
    {
      q: "Do you offer APIs for developers?",
      a: "Yes. We offer REST APIs for generating payment links, tracking transactions, and integrating crypto payments into mobile apps and websites.",
      cat: "API",
    },
    {
      q: "Can I use ZentraPay anywhere in the world?",
      a: "Yes. ZentraPay supports global users and international payments based on local regulations.",
      cat: "General",
    },
    {
      q: "How do I reach customer support?",
      a: "Our support team is available through live chat, email, and the Support page. We offer 24/7 assistance for payment-related issues.",
      cat: "General",
    },
    {
      q: "Does ZentraPay have a sandbox for testing?",
      a: "Yes. Developers can use our sandbox mode to test APIs, simulate payments, and debug integrations safely.",
      cat: "API",
    },
  ];

  const filteredFAQs = faqs.filter(
    (faq) =>
      (category === "All" || faq.cat === category) &&
      faq.q.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFAQ = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <main className="min-h-screen px-6 md:px-16 py-42 bg-[#0b1120] text-white relative overflow-hidden">

      {/* BACKGROUND GLOW EFFECTS */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-500/20 blur-[140px] rounded-full"></div>

      {/* HEADER */}
      <section className="text-center relative z-10 mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow">
          Frequently Asked Questions
        </h1>

        <p className="text-white/60 mt-4 max-w-2xl mx-auto">
          Find answers about payments, security, accounts, APIs, and more.
        </p>
      </section>

      {/* SEARCH BAR */}
      <div className="relative z-10 max-w-2xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white 
          placeholder-white/40 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* CATEGORY FILTER */}
      <div className="relative z-10 flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm border transition 
              ${
                category === cat
                  ? "bg-gradient-to-r from-blue-600 to-green-500 border-blue-400"
                  : "bg-white/10 border-white/20 hover:bg-white/20"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ LIST */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        {filteredFAQs.map((faq, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl cursor-pointer transition 
            bg-white/5 backdrop-blur-xl border border-transparent 
            hover:shadow-[0_0_25px_rgba(0,255,180,0.4)]
            hover:border-green-400
            hover:bg-green-400/10"
            onClick={() => toggleFAQ(i)}
          >
            {/* QUESTION */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{faq.q}</h3>
              <span
                className="text-xl transition-transform"
                style={{
                  transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                ⌄
              </span>
            </div>

            {/* ANSWER */}
            <div
              className={`overflow-hidden transition-all duration-300 text-white/70 mt-3 whitespace-pre-line
              ${openIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
            >
              {faq.a}

              {/* HELPFUL FEEDBACK */}
              <div className="flex gap-3 mt-4">
                <button className="px-4 py-1 rounded-lg bg-green-500/20 text-green-300 hover:bg-green-500/40 transition text-sm">
                  👍 Helpful
                </button>
                <button className="px-4 py-1 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/40 transition text-sm">
                  👎 Not Helpful
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY RESULTS */}
      {filteredFAQs.length === 0 && (
        <p className="text-center text-white/40 mt-10">
          No results found for "{search}".
        </p>
      )}
    </main>
  );
}
