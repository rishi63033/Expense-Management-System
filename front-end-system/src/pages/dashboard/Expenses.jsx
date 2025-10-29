import { useEffect, useState, useCallback } from "react";
import {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "../../services/expenseService";
import ExpenseForm from "../../components/ExpenseForm";
import toast from "react-hot-toast";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getExpenses();
      setExpenses(res.data);
    } catch {
      setError("Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleAdd = async (data) => {
    try {
      await addExpense(data);
      toast.success("Expense added successfully!");
      fetchExpenses();
    } catch {
      toast.error("Error adding expense");
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateExpense(data._id, data);
      toast.success("Expense updated successfully!"); 
      setEditingExpense(null);
      fetchExpenses();
    } catch {
      toast.error("Error updating expense"); 
    }
  };

  const handleDelete = useCallback(async (id) => {
  toast((t) => (
    <span>
      Are you sure you want to delete this expense?
      <button
        onClick={async () => {
          await deleteExpense(id);
          toast.dismiss(t.id);
          toast.success("Expense deleted successfully!");
          fetchExpenses();
        }}
        className="ml-2 px-3 py-1 bg-red-600 text-white rounded"
      >
        Yes
      </button>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="ml-2 px-3 py-1 bg-gray-300 rounded"
      >
        No
      </button>
    </span>
  ));
}, [fetchExpenses]);


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Expenses</h2>

 
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full bg-white rounded-xl shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Note</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{exp.title}</td>
                <td className="p-3">₹{exp.amount}</td>
                <td className="p-3">{exp.category}</td>
                <td className="p-3">{exp.date?.slice(0, 10)}</td>
                <td className="p-3">{exp.note}</td>
                <td className="p-3 space-x-3">
                  <button
                    onClick={() => setEditingExpense(exp)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No expense records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

     
      <div className="mt-8">
        <ExpenseForm
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          editingExpense={editingExpense}
        />
      </div>
    </div>
  );
}

export default Expenses;
