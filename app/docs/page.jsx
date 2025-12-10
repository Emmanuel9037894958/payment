export default function DevelopersPage() {
  return (
    <main className="w-full px-6 md:px-12 max-w-7xl mx-auto py-44">

      {/* HERO */}
      <section className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          ZentraPay Developer Hub
        </h1>
        <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
          Build fast, secure, and reliable payment experiences with our modern redirect API.
          LumoPay provides a clean, simple, and scalable workflow for global payments.
        </p>
      </section>


      {/* KEY FEATURES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
        <DevFeature title="Fast Integration" desc="Accept payments with a single API call and redirect flow." />
        <DevFeature title="Bank-Level Security" desc="Encryption, signed webhooks, and secure token validation." />
        <DevFeature title="Multi-Currency" desc="Support for crypto, fiat, wallets, and bank transfer." />
      </section>


      {/* AUTHENTICATION */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Authentication</h2>
        <p className="text-gray-600 mb-6">
          Each request to LumoPay requires your <strong>API Key</strong>. Never expose your secret key on the frontend.
        </p>

        <CodeBlock>
{`Authorization: Bearer YOUR_SECRET_API_KEY`}
        </CodeBlock>

        <p className="text-gray-600 mt-4">
          Store your API key in environment variables:
        </p>

        <CodeBlock>
{`NEXT_PUBLIC_LUMOPAY_KEY=your_public_key
LUMOPAY_SECRET_KEY=your_secret_key`}
        </CodeBlock>
      </section>


      {/* HOW IT WORKS FLOW */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Redirect Payment Flow</h2>

        <FlowStep number="1" title="Client requests payment" />
        <FlowStep number="2" title="Backend sends request to NOWPayments" />
        <FlowStep number="3" title="NOWPayments returns invoice_url" />
        <FlowStep number="4" title="Customer is redirected to checkout" />
        <FlowStep number="5" title="NOWPayments processes payment" />
        <FlowStep number="6" title="Webhook notifies LumoPay backend" />
        <FlowStep number="7" title="LumoPay updates your system" />
      </section>


      {/* SIMPLE PAYMENT EXAMPLE */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Create Payment Request</h2>

        <CodeBlock>
{`POST /api/create

{
  "amount": 100,
  "currency": "usd",
  "description": "Test Payment",
  "success_url": "https://yourdomain.com/success",
  "cancel_url": "https://yourdomain.com/cancel"
}`}
        </CodeBlock>
      </section>


      {/* JAVASCRIPT REDIRECT EXAMPLE */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frontend Redirect Example</h2>

        <CodeBlock>
{`const res = await fetch("/api/create", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    amount: 50,
    currency: "usd",
    description: "Card Payment",
  }),
});

const data = await res.json();
window.location.href = data.invoice_url;`}
        </CodeBlock>
      </section>


      {/* CLIENT LIBRARIES / SDK */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">SDK & Client Libraries</h2>

        <p className="text-gray-600 mb-6">Integrate LumoPay using any environment:</p>

        <CodeBlock>
{`npm install lumopay-sdk`}
        </CodeBlock>

        <CodeBlock>
{`import LumoPay from "lumopay-sdk";

const client = new LumoPay("YOUR_SECRET_API_KEY");

const payment = await client.createPayment({
  amount: 100,
  currency: "usd",
  description: "Example Order",
});

console.log(payment.invoice_url);`}
        </CodeBlock>
      </section>


      {/* WEBHOOKS */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold">Webhooks</h2>
        <p className="text-gray-600 mt-2 mb-6">
          Webhooks notify your server when a payment succeeds, fails, or expires.
        </p>

        <CodeBlock>
{`POST /webhook

{
  "payment_id": "0821s-12ab",
  "status": "finished",
  "amount": 100,
  "currency": "usd"
}`}
        </CodeBlock>

        <ul className="mt-6 text-gray-700 space-y-2">
          <li>✔ payment_pending</li>
          <li>✔ payment_confirming</li>
          <li>✔ payment_finished</li>
          <li>✔ payment_failed</li>
        </ul>
      </section>


      {/* ERRORS */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold">Error Handling</h2>
        <p className="text-gray-600 mb-4">Standard error responses look like this:</p>

        <CodeBlock>
{`{
  "error": true,
  "message": "Invalid API key"
}`}
        </CodeBlock>
      </section>


      {/* RATE LIMITS */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold">Rate Limits</h2>
        <p className="text-gray-600">
          You can make up to <strong>600 requests/minute</strong>.  
          Contact support for higher limits.
        </p>
      </section>

    </main>
  );
}




/* COMPONENTS BELOW */

/* Feature Card */
function DevFeature({ title, desc }) {
  return (
    <div className="p-8 bg-white shadow-md rounded-2xl border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

/* Flow Step */
function FlowStep({ number, title }) {
  return (
    <div className="flex items-start gap-6 mb-4">
      <div className="text-3xl font-bold text-indigo-600">{number}</div>
      <p className="text-gray-800 text-lg">{title}</p>
    </div>
  );
}

/* Code Block */
function CodeBlock({ children }) {
  return (
    <pre className="bg-gray-900 text-white p-6 rounded-xl text-sm overflow-auto shadow-lg">
      {children}
    </pre>
  );
}
