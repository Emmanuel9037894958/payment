"use client";

import { Loader2, Lock, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function AppLoader() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing secure session");

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      // 20+ seconds smooth progress
      if (current < 30) {
        current += 0.4;
        setStatus("Initializing secure session");
      } else if (current < 60) {
        current += 0.5;
        setStatus("Establishing encrypted connection");
      } else if (current < 85) {
        current += 0.3;
        setStatus("Verifying security protocols");
      } else if (current < 95) {
        current += 0.15;
        setStatus("Finalizing setup");
      } else {
        current += 0.05;
        setStatus("Almost ready");
      }

      setProgress(Math.min(Math.floor(current), 100));

      if (current >= 100) {
        clearInterval(interval);
        setStatus("Secure connection established");
      }
    }, 200); // slow interval → long duration

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0b0f1a] flex items-center justify-center">
      <div className="flex flex-col items-center text-center px-6 max-w-md w-full">
        {/* Spinner */}
        <div className="relative mb-12">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-40"></div>
          <Loader2 className="relative w-16 h-16 text-white animate-spin" />
        </div>

        <h1 className="text-white text-2xl sm:text-3xl font-extrabold mb-2">
          Secure Payment Gateway
        </h1>

        <p className="text-white/70 text-sm sm:text-base mb-10">
          Preparing your protected experience
        </p>

        <div className="w-64 sm:w-80 h-2 bg-white/10 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-2 text-white/60 text-sm">
          {progress < 100 ? (
            <>
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>{status}… {progress}%</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 text-green-400" />
              <span>Secure connection established</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
