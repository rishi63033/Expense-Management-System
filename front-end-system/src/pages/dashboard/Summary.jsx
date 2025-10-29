import { useEffect, useState } from "react";
import { getSummary } from "../../services/summaryService";
import React from "react";

function Summary() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    recentTransactions: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const res = await getSummary();
      setSummary(res.data.summary);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch summary");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Summary Overview</h2>

      {loading ? (
        <p>Loading summary...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-green-100 p-6 rounded-xl text-center shadow">
              <h3 className="text-lg font-semibold text-green-800">Total Income</h3>
              <p className="text-2xl font-bold text-green-900 mt-2">
                ₹{summary.totalIncome.toLocaleString()}
              </p>
            </div>

            <div className="bg-red-100 p-6 rounded-xl text-center shadow">
              <h3 className="text-lg font-semibold text-red-800">Total Expenses</h3>
              <p className="text-2xl font-bold text-red-900 mt-2">
                ₹{summary.totalExpense.toLocaleString()}
              </p>
            </div>

            <div className="bg-blue-100 p-6 rounded-xl text-center shadow">
              <h3 className="text-lg font-semibold text-blue-800">Balance</h3>
              <p className="text-2xl font-bold text-blue-900 mt-2">
                ₹{summary.balance.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Transactions</h3>

            {summary.recentTransactions.length === 0 ? (
              <p className="text-gray-500">No recent transactions found.</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.recentTransactions.map((txn, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td
                        className={`p-3 font-medium ${
                          txn.type === "income" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {txn.type}
                      </td>
                      <td className="p-3">{txn.title}</td>
                      <td className="p-3">₹{txn.amount}</td>
                      <td className="p-3">{txn.date?.slice(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default React.memo(Summary);
