import DashboardTable from "./DashboardTable";
import { headers } from "next/headers";

export default async function DashboardPage() {
  // ✅ Build absolute URL safely on the server
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/payments`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch payments");
  }

  const payments = await res.json();

  return (
    <div className="min-h-screen bg-[#040816] text-white p-6 md:p-10 py-32">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-white/60 mt-1">
            View and manage all payment activity.
          </p>
        </div>

        <form action="/api/admin/logout" method="POST">
          <button className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 font-semibold">
            Logout
          </button>
        </form>
      </div>

      <DashboardTable payments={payments} />
    </div>
  );
}
