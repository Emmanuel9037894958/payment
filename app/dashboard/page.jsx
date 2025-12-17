// import { cookies } from "next/headers";
// import DashboardTable from "./DashboardTable";

// export default async function DashboardPage() {
//   // ✅ cookies() is NOT async
//   const cookieStore = cookies();
//   const auth = cookieStore.get("admin_auth");

//   if (!auth) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#061224] text-white">
//         <div className="text-center">
//           <h1 className="text-xl font-bold mb-2">Access Denied</h1>
//           <p className="text-white/70 mb-4">
//             You must be logged in as admin to view this page.
//           </p>
//           <a
//             href="/admin-login"
//             className="text-blue-400 hover:text-blue-500 underline"
//           >
//             Go to Admin Login
//           </a>
//         </div>
//       </div>
//     );
//   }

//   // ✅ RELATIVE fetch (works in dev + prod)
//   const res = await fetch("/api/payments", {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch payments");
//   }

//   const payments = await res.json();

//   return (
//     <div className="min-h-screen bg-[#040816] text-white p-6 md:p-10 py-32">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
//           <p className="text-white/60 mt-1">
//             View and manage all payment activity.
//           </p>
//         </div>

//         {/* Logout */}
//         <form action="/admin-login" method="GET">
//           <button className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 font-semibold">
//             Logout
//           </button>
//         </form>
//       </div>

//       {/* Client component */}
//       <DashboardTable payments={payments} />
//     </div>
//   );
// }



export default function DashboardPage() {
  return (
    <div style={{ color: "white", padding: 40 }}>
      <h1>Dashboard is rendering</h1>
    </div>
  );
}
