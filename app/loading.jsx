"use client";

import { Loader2, Lock, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing secure session");

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      // SMART PROGRESS LOGIC (fast → slow → pause)
      if (current < 50) {
        current += 2; // fast start
        setStatus("Initializing secure session");
      } else if (current < 80) {
        current += 1; // medium
        setStatus("Establishing encrypted connection");
      } else if (current < 95) {
        current += 0.4; // slow down
        setStatus("Verifying security protocols");
      } else {
        current += 0.2; // very slow end
        setStatus("Finalizing setup");
      }

      setProgress(Math.min(Math.floor(current), 100));

      if (current >= 100) {
        clearInterval(interval);
        setStatus("Secure connection established");
      }
    }, 120); // overall ~9–11 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0b0f1a] flex items-center justify-center">
      <div className="flex flex-col items-center text-center px-6 max-w-md w-full">
        
        {/* Glow Spinner */}
        <div className="relative mb-10">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-2xl opacity-40"></div>
          <Loader2 className="relative w-16 h-16 text-white animate-spin" />
        </div>

        {/* Title */}
        <h1 className="text-white text-2xl sm:text-3xl font-extrabold mb-2">
          Secure Payment Gateway
        </h1>

        {/* Subtitle */}
        <p className="text-white/70 text-sm sm:text-base mb-8">
          Preparing your protected experience
        </p>

        {/* Progress Bar */}
        <div className="w-64 sm:w-80 h-2 bg-white/10 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status */}
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
