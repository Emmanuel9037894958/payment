"use client";

import { useEffect, useState } from "react";
import AppLoader from "./components/AppLoader";

export default function ClientGate({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, 20000); // ⏱️ FORCE 20 SECONDS

    return () => clearTimeout(timer);
  }, []);

  if (!ready) {
    return <AppLoader />;
  }

  return <>{children}</>;
}
