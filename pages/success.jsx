import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();
  const { tx_ref } = router.query;

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!tx_ref) return;

    async function verifyPayment() {
      try {
        const res = await fetch(`/api/verify?tx_ref=${tx_ref}`);
        const data = await res.json();

        if (!res.ok || data.status !== "success") {
          throw new Error(data.message || "Payment verification failed");
        }

        setStatus("success");
        setMessage("Your payment was successful.");
      } catch (err) {
        setStatus("error");
        setMessage(err?.message || "Verification failed");
      }
    }

    verifyPayment();
  }, [tx_ref]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      {status === "loading" && (
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
          <p>Verifying your payment...</p>
        </div>
      )}

      {status === "success" && (
        <div className="text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Payment Successful 🎉</h1>
          <p className="text-white/70 mb-6">{message}</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-green-600 rounded-lg font-semibold"
          >
            Go Home
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Payment Failed</h1>
          <p className="text-white/70 mb-6">{message}</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-red-600 rounded-lg font-semibold"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}




