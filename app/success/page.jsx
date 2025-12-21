import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white">Loading payment status....</div>}>
      <SuccessClient />
    </Suspense>
  );
}

