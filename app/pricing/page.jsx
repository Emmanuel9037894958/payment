export default function PricingPage() {
  return (
    <main className="w-full px-6 md:px-12 max-w-7xl mx-auto py-44">

      {/* HEADER */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Simple & Transparent Pricing
        </h1>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          No hidden fees, no monthly charges. Pay only when you receive a payment.
        </p>
      </section>


      {/* PRICING CARDS */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">

        <PriceCard
          name="Starter"
          rate="1.5%"
          description="Ideal for freelancers, creators, and new businesses."
          highlight={false}
        />

        <PriceCard
          name="Business"
          rate="1.2%"
          description="Perfect for growing brands and online merchants."
          highlight={true}   // highlighted card
        />

        <PriceCard
          name="Enterprise"
          rate="Custom"
          description="Get special rates for high-volume payments."
          highlight={false}
        />

      </section>
    </main>
  );
}


function PriceCard({ name, rate, description, highlight }) {
  return (
    <div
      className={`
      p-8 rounded-2xl border shadow-md transition 
      ${highlight ? "bg-black text-white scale-105" : "bg-white border-gray-200"}
      `}
    >
      <h3 className={`text-2xl font-bold ${highlight ? "text-white" : "text-gray-900"}`}>
        {name}
      </h3>

      <p className={`text-5xl font-extrabold mt-4 ${highlight ? "text-white" : "text-gray-900"}`}>
        {rate}
      </p>

      <p className={`mt-2 text-sm ${highlight ? "text-white/70" : "text-gray-600"}`}>
        Per successful transaction
      </p>

      <p className={`mt-6 ${highlight ? "text-white/90" : "text-gray-500"}`}>
        {description}
      </p>

      <button
        className={`
          w-full mt-8 py-3 rounded-lg font-semibold 
          ${highlight 
            ? "bg-white text-black hover:bg-gray-200" 
            : "bg-black text-white hover:bg-gray-800"
          }
        `}
      >
        {highlight ? "Best Choice" : "Select Plan"}
      </button>
    </div>
  );
}
