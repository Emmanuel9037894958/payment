import { Suspense } from "react";
import CardPaymentPage from "./CardPaymentPage";

export const dynamic = "force-dynamic"; // FIXES VERCEL BUILD ERROR

export default function CardPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-20">Loading...</div>}>
      <CardPaymentPage />
    </Suspense>
  );
}
