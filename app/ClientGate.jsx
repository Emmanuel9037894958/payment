"use client";

import { useEffect, useState } from "react";
import AppLoader from "./components/AppLoader";

export default function ClientGate({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("zentra_loaded");

    if (hasLoaded) {
      // User is navigating inside the app
      setReady(true);
      return;
    }

    // First visit / hard refresh
    const timer = setTimeout(() => {
      sessionStorage.setItem("zentra_loaded", "true");
      setReady(true);
    }, 10000); // ⏱️ 10 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!ready) {
    return <AppLoader />;
  }

  return <>{children}</>;
}
