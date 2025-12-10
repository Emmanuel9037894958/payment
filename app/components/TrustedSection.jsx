"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function TrustedSection() {
  const countersRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  // Trigger counting on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
        }
      },
      { threshold: 0.4 }
    );

    if (countersRef.current) observer.observe(countersRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative px-6 md:px-20 bg-[#0b1120] text-white overflow-hidden py-24">

      {/* BACKGROUND WORLD MAP */}
      <img
        src="/world-map.svg"
        alt=""
        className="absolute opacity-10 w-full top-10 pointer-events-none"
      />

      {/* GLOWING BLURS */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 blur-[180px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-500/20 blur-[180px] rounded-full"></div>

      {/* HEADER */}
      <div className="relative z-10 text-center mb-20">
        <h2 className="text-5xl font-extrabold drop-shadow-xl">
          Trusted Around the World
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto mt-4 text-lg">
          ZentraPay powers fast, secure, and global payments across multiple
          countries, merchants, and industries.
        </p>
      </div>

      {/* COUNTERS */}
      <div
        ref={countersRef}
        className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12"
      >
        <CounterCard
          title="Active Users"
          end={startCount ? 1000 : 0}
          suffix="+"
          gradient="from-blue-500 to-cyan-400"
        />

        <CounterCard
          title="Countries Supported"
          end={startCount ? 82 : 0}
          suffix="+"
          gradient="from-green-400 to-emerald-400"
        />

        <CounterCard
          title="Transactions Processed"
          end={startCount ? 5330 : 0}
          suffix="+"
          gradient="from-purple-500 to-pink-500"
        />
      </div>

      {/* TRUSTED BY LOGOS */}
      <BrandsCarousel />

      {/* SECURITY BADGES */}
      <SecurityBadges />

      {/* ADD /images1.jpg HERE */}
      <div className="relative z-10 mt-16 flex justify-center">
        <Image
          src="/images1.jpg"
          alt="Trusted Payment Illustration"
          width={900}
          height={600}
          className="rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.2)] opacity-90 hover:opacity-100 transition"
        />
      </div>
    </section>
  );
}

/* -------------------------
   COUNTER CARD
-------------------------- */
function CounterCard({ title, end, suffix, gradient }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    if (current === end) return;

    let speed = end / 55;

    let interval = setInterval(() => {
      current += speed;
      if (current >= end) {
        current = end;
        clearInterval(interval);
      }
      setCount(Math.floor(current));
    }, 25);

    return () => clearInterval(interval);
  }, [end]);

  return (
    <div
      className="p-10 rounded-2xl text-center bg-white/10 backdrop-blur-xl border border-white/20
      hover:shadow-[0_0_40px_rgba(0,255,200,0.4)] hover:scale-[1.04] transition duration-300"
    >
      <h3
        className={`text-6xl font-extrabold bg-gradient-to-r ${gradient} text-transparent bg-clip-text`}
      >
        {count}
        {suffix}
      </h3>
      <p className="text-white/60 text-xl">{title}</p>
    </div>
  );
}

/* -------------------------
   BRANDS CAROUSEL
-------------------------- */
function BrandsCarousel() {
  return (
    <div className="relative z-10 mt-20">
      <p className="text-center text-white/50 tracking-widest mb-6">
        TRUSTED BY BUSINESSES & USERS GLOBALLY
      </p>

      <div className="overflow-hidden">
        <div className="flex items-center gap-6 animate-scroll whitespace-nowrap opacity-70 hover:opacity-100 transition">
          <img src="/brand1.svg" className="h-10" />
          <img src="/brand2.svg" className="h-10" />
          <img src="/brand3.svg" className="h-10" />
          <img src="/brand4.svg" className="h-10" />
          <img src="/brand5.svg" className="h-10" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 18s linear infinite;
        }
      `}</style>
    </div>
  );
}

/* -------------------------
   SECURITY BADGES
-------------------------- */
function SecurityBadges() {
  return (
    <div className="relative z-10 mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
      <Badge
        icon="/shield.svg"
        title="SSL Secure"
        desc="Protected by 256-bit SSL/TLS encryption."
      />
      <Badge
        icon="/lock.svg"
        title="Cloud Protected"
        desc="Backed by Google Cloud security architecture."
      />
      <Badge
        icon="/check.svg"
        title="PCI Ready"
        desc="Compliant infrastructure for financial transactions."
      />
    </div>
  );
}

function Badge({ icon, title, desc }) {
  return (
    <div className="p-7 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-xl hover:bg-white/20 hover:shadow-lg transition">
      <div className="flex items-center gap-4">
        <img src={icon} className="w-10 h-10 opacity-90" />
        <div>
          <h4 className="text-xl font-semibold">{title}</h4>
          <p className="text-white/60 text-sm">{desc}</p>
        </div>
      </div>
    </div>
  );
}
