"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [summary, setSummary] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [txnRes, sumRes] = await Promise.all([
          fetch("http://localhost:3001/api/admin/transactions"),
          fetch("http://localhost:3001/api/admin/summary"),
        ]);
        const txnData = await txnRes.json();
        const sumData = await sumRes.json();
        setTransactions(txnData);
        setSummary(sumData);
      } catch (err) {
        console.error("Error loading admin data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-8">Loading Admin Dashboard...</div>;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-600">Monitor all payments and system stats</p>

      {/* Summary cards */}
      {summary && (
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-green-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Total Revenue</h2>
            <p className="text-2xl font-bold text-green-700">
              ${summary.total_amount ?? 0}
            </p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Successful</h2>
            <p className="text-2xl font-bold text-blue-700">
              {summary.successful}
            </p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Pending</h2>
            <p className="text-2xl font-bold text-yellow-700">
              {summary.pending}
            </p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Failed</h2>
            <p className="text-2xl font-bold text-red-700">
              {summary.failed}
            </p>
          </div>
        </div>
      )}

      {/* Transactions table */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Transaction ID</th>
              <th className="border px-4 py-2">Student</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Method</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.transaction_id}>
                <td className="border px-4 py-2">{txn.transaction_id}</td>
                <td className="border px-4 py-2">{txn.student_name}</td>
                <td className="border px-4 py-2">${txn.amount}</td>
                <td className="border px-4 py-2">{txn.method}</td>
                <td
                  className={`border px-4 py-2 font-semibold ${
                    txn.status === "Success"
                      ? "text-green-600"
                      : txn.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {txn.status}
                </td>
                <td className="border px-4 py-2">
                  {new Date(txn.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
