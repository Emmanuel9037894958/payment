import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export default function SuccessPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SuccessClient />
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <p>Loading payment status...</p>
    </div>
  );
}
