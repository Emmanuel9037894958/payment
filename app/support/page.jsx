export default function SupportPage() {
  return (
    <main className="w-full px-6 md:px-12 max-w-7xl mx-auto py-44">
      {/* HERO */}
      <section className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          ZentraPay Support Center
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Everything you need to troubleshoot payments, understand API behavior,
          manage your account, and keep your integrations running smoothly.
        </p>
      </section>

      {/* QUICK ACCESS */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Access</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <QuickItem
            title="Payment Issues"
            desc="Resolve delays, confirmations, and declined payments."
            link="#payments"
          />

          <QuickItem
            title="API & Integration"
            desc="Fix API errors, redirect issues, and webhook problems."
            link="#api"
          />

          <QuickItem
            title="Account Support"
            desc="Manage email, identity verification, and login issues."
            link="#account"
          />
        </div>
      </section>

      {/* PAYMENT ISSUES */}
      <section id="payments" className="mb-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Payment Troubleshooting
        </h2>

        <TroubleItem
          title="Payments stuck on 'pending'"
          text="This usually happens due to blockchain congestion or slow bank response. Payments typically resolve within minutes. Retry with a different method if delayed."
        />

        <TroubleItem
          title="Card declined"
          text="Check available balance, CVV, and card restrictions. Try another card or switch to a wallet option such as Apple Pay or Google Pay."
        />

        <TroubleItem
          title="Crypto sent but not confirmed"
          text="Confirm the network used (e.g., TRC20 vs ERC20). Incorrect networks require manual review."
        />
      </section>

      {/* API & DEVELOPERS */}
      <section id="api" className="mb-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          API & Developer Support
        </h2>

        <DevHelp
          title="Invoice URL not returned"
          text="Verify server has correct API keys and JSON request formatting. Check NOWPayments dashboard for API key permissions."
        />

        <DevHelp
          title="Webhook not triggering"
          text="Ensure your webhook URL is publicly reachable (HTTPS required). Use a tool like ngrok for local development."
        />

        <DevHelp
          title="Redirect URL failing"
          text="Make sure your success_url and cancel_url are valid absolute links, not relative paths."
        />

        <a
          href="/docs"
          className="mt-6 inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Visit Developer Docs
        </a>
      </section>

      {/* ACCOUNT SUPPORT */}
      <section id="account" className="mb-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Account Support
        </h2>

        <ul className="space-y-4 text-gray-700">
          <li className="p-4 bg-gray-50 rounded-xl border">
            ✔ Email verification not arriving — check spam or try another email
            provider.
          </li>
          <li className="p-4 bg-gray-50 rounded-xl border">
            ✔ Reset password — use the “Forgot Password” page or contact admin.
          </li>
          <li className="p-4 bg-gray-50 rounded-xl border">
            ✔ Enable 2FA for improved security — recommended.
          </li>
        </ul>
      </section>

      {/* SYSTEM STATUS */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold mb-4">System Status</h2>
        <div className="p-6 bg-white shadow border rounded-xl">
          <p className="text-lg font-semibold text-green-600">
            🟢 All Services Operational
          </p>
          <p className="text-gray-600 mt-2">
            No incidents reported in the last 24 hours.
          </p>
        </div>
      </section>

      {/* SECURITY */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Security Notice
        </h2>
        <p className="text-gray-700 p-6 bg-gray-50 rounded-xl border">
          🔐 ZentraPay support will NEVER request your password, private keys,
          or 2FA codes. Always ensure you're communicating through official
          channels.
        </p>
      </section>

      {/* BACK TO FAQ */}
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Still Need Help?
        </h2>
        <p className="text-gray-600 mb-6">
          Explore our frequently asked questions or contact us if the issue
          continues.
        </p>

        <a
          href="/faq"
          className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Go to FAQ
        </a>
      </div>
    </main>
  );
}

/* -------------------------- */
/* COMPONENTS */
/* -------------------------- */

function QuickItem({ title, desc, link }) {
  return (
    <a
      href={link}
      className="p-6 bg-white border shadow rounded-xl hover:shadow-md transition block"
    >
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 mt-2">{desc}</p>
    </a>
  );
}

function TroubleItem({ title, text }) {
  return (
    <div className="p-6 bg-gray-50 rounded-xl border mb-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-700">{text}</p>
    </div>
  );
}

function DevHelp({ title, text }) {
  return (
    <div className="p-6 bg-white shadow rounded-xl border mb-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 mt-2">{text}</p>
    </div>
  );
}
