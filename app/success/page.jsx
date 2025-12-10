export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1120] px-6">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Payment Successful 🎉</h1>
        <p className="text-white/60 text-lg">
          Your payment has been completed successfully.
        </p>

        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg text-white hover:opacity-80 transition"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
