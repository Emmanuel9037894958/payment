"use client";

import { Loader2, Lock } from "lucide-react";
import { useEffect, useState } from "react";

export default function Loading() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // ⏱ Force loader to stay for 10 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0b0f1a] flex items-center justify-center">
      <div className="flex flex-col items-center text-center px-6">
        {/* Glow Spinner */}
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-2xl"></div>
          <Loader2 className="relative w-16 h-16 text-white animate-spin" />
        </div>

        {/* Title */}
        <h1 className="text-white text-2xl sm:text-3xl font-extrabold mb-2">
          Initializing Secure Session
        </h1>

        {/* Subtitle */}
        <p className="text-white/70 text-sm sm:text-base mb-6">
          Please wait while we prepare your experience…
        </p>

        {/* Status */}
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <Lock className="w-4 h-4 text-green-400" />
          Secured & encrypted
        </div>
      </div>
    </div>
  );
}
