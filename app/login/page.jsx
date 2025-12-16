"use client";

import { useState } from "react";
import { auth, googleProvider } from "@/app/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // FOR EYE TOGGLE
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      router.push("/");
    } catch (err) {
      alert("Invalid email or password");
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1120] px-6 relative overflow-hidden py-3">
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/30 blur-[110px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-400/20 blur-[120px] rounded-full"></div>

      {/* LOGIN CARD */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 shadow-[0_0_40px_rgba(0,0,0,0.4)] relative">
        {/* TOP GRADIENT LINE */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-400 rounded-t-2xl"></div>

        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Welcome Back
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="text-white/80 text-sm">Email Address</label>
            <input
              type="email"
              required
              className="w-full p-3 bg-white/10 border border-white/20 text-white rounded-lg mt-1 outline-none 
              focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* PASSWORD + TOGGLE */}
          <div>
            <label className="text-white/80 text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full p-3 bg-white/10 border border-white/20 text-white rounded-lg mt-1 
                outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              {/* EYE TOGGLE ICON */}
              <img
                src={showPassword ? "/eye-off.svg" : "/eye.svg"}
                alt="toggle password"
                onClick={() => setShowPassword(!showPassword)}
                className="w-6 h-6 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer 
                bg-gray-800/40 rounded-full p-1 hover:bg-gray-400/60 transition"
              />
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            className="w-full py-3 mt-4 rounded-lg bg-gradient-to-br from-green-500 to-blue-700 text-white 
            font-semibold shadow-lg hover:opacity-90 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="relative my-8 flex items-center justify-center">
          <span className="h-[1px] w-full bg-white/30"></span>
          <span className="px-4 text-white/50 text-sm">Or continue with</span>
          <span className="h-[1px] w-full bg-white/30"></span>
        </div>

        {/* GOOGLE LOGIN BUTTON */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 border border-white/30 rounded-lg text-white 
          flex items-center justify-center gap-3 hover:bg-white/10 transition"
        >
          <img src="/google-icon.svg" className="w-6 h-6" alt="Google" />
          Continue with Google
        </button>

        {/* SIGN UP LINK */}
        <p className="text-white/60 text-center mt-6 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="relative text-blue-400 group">
            Sign up
            <span
              className="absolute left-0 -bottom-0.5 h-[2px] bg-gradient-to-r from-green-400 to-blue-500 
              w-0 group-hover:w-full transition-all duration-300 rounded"
            ></span>
          </a>
        </p>
      </div>
    </div>
  );
}
