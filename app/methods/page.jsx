"use client";

export default function PaymentMethodsPage() {
  return (
    <main className="w-full px-6 md:px-12 max-w-7xl mx-auto py-44">

      {/* HEADER */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Supported Payment Methods
        </h1>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          LumoPay enables fast, secure, and flexible payments through multiple global and local payment options.
        </p>
      </section>

      {/* PAYMENT METHOD SECTIONS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">

        <MethodCard
          title="Crypto Payments"
          desc="Accept major cryptocurrencies including BTC, ETH, USDT, BNB, XRP, and many more."
          icon="/crypto-icon.svg"
        />

        <MethodCard
          title="Card Payments"
          desc="Customers can pay using Visa, MasterCard, Verve, and other debit/credit cards."
          icon="/card-icon.svg"
        />

        <MethodCard
          title="Fiat Currencies"
          desc="Support for multiple world currencies such as USD, EUR, NGN, GBP, JPY and more."
          icon="/fiat-icon.svg"
        />

      </section>

      {/* SECOND ROW */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">

        <MethodCard
          title="Bank Transfers"
          desc="Enable direct bank transfers for seamless payouts and deposits."
          icon="/bank-icon.svg"
        />

        <MethodCard
          title="Mobile Wallets"
          desc="Support for Apple Pay, Google Pay, Samsung Pay and major digital wallets."
          icon="/wallet-icon.svg"
        />

        {/* PAY NOW button ENABLED here */}
        <MethodCard
          title="Payment Links"
          desc="Generate secure payment links that customers can use from any device."
          icon="/link-icon.svg"
          showButton={true}
        />

      </section>

    </main>
  );
}


/* -------------------------
   PAYMENT METHOD CARD
-------------------------- */
function MethodCard({ title, desc, icon, showButton = false }) {
  
  // Redirect to NOWPayments
  const payNow = async () => {
    try {
      const res = await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 50,
          currency: "usd",
          description: `${title} Payment`,
        }),
      });

      const data = await res.json();

      if (data.invoice_url) {
        window.location.href = data.invoice_url;
      } else {
        alert("NOWPayments not configured yet.");
      }
    } catch (err) {
      console.error(err);
      alert("Payment error occurred");
    }
  };

  return (
    <div className="p-8 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition">
      
      {/* ICON */}
      <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
        <img src={icon} alt={title} className="w-8 h-8" />
      </div>

      {/* TITLE */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-gray-600 leading-relaxed mb-6">
        {desc}
      </p>

      {/* PAY NOW BUTTON */}
      {showButton && (
        <button
          onClick={payNow}
          className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Pay Now
        </button>
      )}

    </div>
  );
}
