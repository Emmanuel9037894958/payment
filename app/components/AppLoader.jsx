"use client";

import { useEffect, useState } from "react";
import { Loader2, Lock } from "lucide-react";

export default function AppLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0b0f1a] flex items-center justify-center">
      <div className="flex flex-col items-center text-center px-6 animate-fadeIn">
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-3xl"></div>
          <Loader2 className="relative w-20 h-20 text-white animate-spin-slow" />
        </div>

        <h1 className="text-white text-3xl font-extrabold mb-2">
          Securing Connection
        </h1>

        <p className="text-white/60 text-sm mb-6">
          Verifying environment & payment channels…
        </p>

        <div className="flex items-center gap-2 text-white/50 text-sm">
          <Lock className="w-4 h-4 text-green-400" />
          Encrypted & protected
        </div>
      </div>
    </div>
  );
}
