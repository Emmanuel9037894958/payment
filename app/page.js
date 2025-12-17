import React from "react";
import AppLoader from "./components/AppLoader";
import PaymentUI from "./components/PaymentUI";
import TrustedSection from "./components/TrustedSection";

export default function Page() {
  return (
    <>
      {/* ⏳ Slow professional loader (10 seconds) */}
      <AppLoader />

      {/* Actual page content */}
      <div>
        <PaymentUI />
        <TrustedSection />
      </div>
    </>
  );
}
