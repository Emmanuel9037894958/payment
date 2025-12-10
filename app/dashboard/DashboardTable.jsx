"use client";

import { useMemo, useState } from "react";

export default function DashboardTable({ payments }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const totalAmount = payments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0
  );

  const filtered = useMemo(() => {
    return payments.filter((p) => {
      const matchesQuery =
        !query ||
        p.id?.toLowerCase().includes(query.toLowerCase()) ||
        p.invoice_id?.toLowerCase().includes(query.toLowerCase()) ||
        p.currency?.toLowerCase().includes(query.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || (p.status || "").toLowerCase() === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [payments, query, statusFilter]);

  const getStatusColor = (status = "") => {
    const s = status.toLowerCase();
    if (s === "paid" || s === "success" || s === "succeeded")
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
    if (s === "pending" || s === "processing")
      return "bg-amber-500/20 text-amber-300 border-amber-500/40";
    if (s === "failed" || s === "canceled" || s === "cancelled")
      return "bg-rose-500/20 text-rose-300 border-rose-500/40";
    return "bg-slate-500/20 text-slate-200 border-slate-500/40";
  };

  return (
    <div className="space-y-6">
      {/* Top stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Total Payments"
          value={payments.length}
          sub="All-time"
        />
        <StatCard
          label="Total Amount"
          value={`$${totalAmount.toFixed(2)}`}
          sub="(sum of amount field)"
        />
        <StatCard
          label="Last Payment"
          value={
            payments[0]
              ? new Date(payments[0].timestamp).toLocaleString()
              : "No payments yet"
          }
          sub={payments[0]?.status || ""}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by ID, invoice, or currency..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-1/2 px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <div className="flex gap-2">
          <FilterButton
            label="All"
            active={statusFilter === "all"}
            onClick={() => setStatusFilter("all")}
          />
          <FilterButton
            label="Paid"
            active={statusFilter === "paid"}
            onClick={() => setStatusFilter("paid")}
          />
          <FilterButton
            label="Pending"
            active={statusFilter === "pending"}
            onClick={() => setStatusFilter("pending")}
          />
          <FilterButton
            label="Failed"
            active={statusFilter === "failed"}
            onClick={() => setStatusFilter("failed")}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5 text-white/70">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Invoice ID</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Currency</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-white/50"
                  >
                    No payments found.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t border-white/10 hover:bg-white/5"
                  >
                    <td className="px-4 py-3 font-mono text-xs">
                      {p.id || "-"}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {p.invoice_id || "-"}
                    </td>
                    <td className="px-4 py-3">
                      ${Number(p.amount || 0).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 uppercase">
                      {p.currency || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(
                          p.status
                        )}`}
                      >
                        {p.status || "unknown"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-white/70">
                      {p.timestamp
                        ? new Date(p.timestamp).toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* Small reusable components */

function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
      <p className="text-xs text-white/60 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-xl font-bold mt-1">{value}</p>
      {sub && <p className="text-xs text-white/50 mt-1">{sub}</p>}
    </div>
  );
}

function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
        active
          ? "bg-sky-500/30 border-sky-400 text-sky-100"
          : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}
