// "use client";

// import { useState } from "react";
// import { auth, googleProvider } from "@/app/firebase";
// import {
//   createUserWithEmailAndPassword,
//   signInWithPopup,
//   sendEmailVerification,
// } from "firebase/auth";
// import { useRouter } from "next/navigation";

// export default function SignupPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [success, setSuccess] = useState(false); // ⭐ SUCCESS POPUP STATE

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         form.email,
//         form.password
//       );

//       await sendEmailVerification(userCredential.user);

//       // ⭐ SHOW SUCCESS POPUP
//       setSuccess(true);

//       // Redirect after 2 seconds
//       setTimeout(() => {
//         router.push("/");
//       }, 2000);

//     } catch (err) {
//       alert(err.message);
//     }

//     setLoading(false);
//   };

//   const handleGoogleSignup = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);

//       // ⭐ SUCCESS POPUP
//       setSuccess(true);

//       setTimeout(() => router.push("/"), 2000);

//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#0b1120] px-6 relative overflow-hidden py-30">
//       {/* BACKGROUND BLOBS */}
//       <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/20 blur-[120px] rounded-full"></div>
//       <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-500/20 blur-[120px] rounded-full"></div>

//       {/* SUCCESS POPUP */}
//       {success && (
//         <div className="fixed inset-0 flex items-center justify-center z-[999] animate-fadeIn">
//           <div className="bg-white p-6 rounded-2xl shadow-2xl text-center w-80 border border-green-400 relative">

//             {/* Floating flowers */}
//             <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex gap-2 animate-bounce">
//               <span className="text-2xl">🌸</span>
//               <span className="text-2xl">🌼</span>
//               <span className="text-2xl">🌷</span>
//             </div>

//             <h2 className="text-green-600 font-bold text-xl mt-4">
//               Account Created!
//             </h2>

//             <p className="text-gray-600 mt-2">
//               Redirecting you…
//             </p>

//             {/* confetti */}
//             <div className="absolute inset-0 pointer-events-none overflow-hidden">
//               <div className="animate-confetti absolute left-10 text-xl">🎉</div>
//               <div className="animate-confetti absolute right-10 text-xl">🎊</div>
//               <div className="animate-confetti absolute left-1/3 text-xl">🌸</div>
//               <div className="animate-confetti absolute right-1/3 text-xl">🌼</div>
//             </div>

//           </div>
//         </div>
//       )}

//       {/* CARD */}
//       <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 shadow-lg relative">
//         {/* TOP GRADIENT */}
//         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-t-2xl"></div>

//         <h1 className="text-3xl font-bold text-white text-center mb-8">
//           Create Your ZentraPay Account
//         </h1>

//         <form onSubmit={handleSignup} className="space-y-5">
//           {/* EMAIL */}
//           <div>
//             <label className="text-white/80 text-sm">Email Address</label>
//             <input
//               type="email"
//               required
//               value={form.email}
//               className="w-full p-3 bg-white/10 border border-white/20 text-white rounded-lg mt-1 outline-none focus:ring-2 focus:ring-blue-500"
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//             />
//           </div>

//           {/* PASSWORD */}
//           <div>
//             <label className="text-white/80 text-sm">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 required
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 className="w-full p-3 bg-white/10 border border-white/20 text-white rounded-lg mt-1 outline-none focus:ring-2 focus:ring-green-500"
//               />
//               <img
//                 src={showPassword ? "/eye-off.svg" : "/eye.svg"}
//                 alt="toggle"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="w-6 h-6 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer  bg-gray-800 rounded-full hover:opacity-100 transition"
//               />
//             </div>
//           </div>

//           {/* SIGN UP BUTTON */}
//           <button className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold shadow-lg hover:opacity-90 transition">
//             {loading ? "Creating Account..." : "Sign Up"}
//           </button>
//         </form>

//         {/* GOOGLE */}
//         <div className="mt-6">
//           <button
//             onClick={handleGoogleSignup}
//             className="w-full py-3 border border-white/30 rounded-lg text-white flex items-center justify-center gap-3 hover:bg-white/10 transition"
//           >
//             <img src="/google-icon.svg" className="w-6 h-6" alt="Google" />
//             Continue with Google
//           </button>
//         </div>

//         {/* FOOTER */}
//         <p className="text-white/60 text-center mt-6 text-sm">
//           Already have an account?{" "}
//           <a href="/login" className="text-green-400 hover:underline">
//             Login
//           </a>
//         </p>
//       </div>

//       {/* ANIMATIONS */}
//       <style jsx>{`
//         @keyframes confetti {
//           0% { transform: translateY(0) rotate(0); opacity: 1; }
//           100% { transform: translateY(150px) rotate(180deg); opacity: 0; }
//         }

//         .animate-confetti {
//           animation: confetti 1.5s linear infinite;
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(0.9); }
//           to { opacity: 1; transform: scale(1); }
//         }

//         .animate-fadeIn {
//           animation: fadeIn .3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }
