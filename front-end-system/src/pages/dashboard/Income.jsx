import { useEffect, useState, useCallback } from "react";
import { getIncomes, addIncome, deleteIncome, updateIncome } from "../../services/incomeService";
import IncomeForm from "../../components/IncomeForm";
import toast from "react-hot-toast"; 

function Income() {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingIncome, setEditingIncome] = useState(null);

  const fetchIncomes = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getIncomes();
      setIncomes(res.data);
    } catch (err) {
      setError("Failed to fetch income data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIncomes();
  }, [fetchIncomes]);

  const handleAdd = useCallback(async (formData) => {
    try {
      const res = await addIncome(formData);
      toast.success(res.data.message || "Income added successfully!"); 
      fetchIncomes();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding income"); 
    }
  }, [fetchIncomes]);

  const handleUpdate = useCallback(async (formData) => {
    try {
      const res = await updateIncome(editingIncome._id, formData);
      toast.success(res.data.message || "Income updated successfully!"); 
      setEditingIncome(null);
      fetchIncomes();
    } catch (err) {
      toast.error("Error updating income");
    }
  }, [editingIncome, fetchIncomes]);

  const handleDelete = useCallback(async (id) => {
   
    toast((t) => (
      <span>
        Are you sure you want to delete?
        <button
          onClick={async () => {
            await deleteIncome(id);
            toast.dismiss(t.id);
            toast.success("Income deleted successfully!");
            fetchIncomes();
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
  }, [fetchIncomes]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Income</h2>

      
      {loading ? (
        <p>Loading income...</p>
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
            {incomes.map((inc) => (
              <tr key={inc._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{inc.title}</td>
                <td className="p-3">₹{inc.amount}</td>
                <td className="p-3">{inc.category || "-"}</td>
                <td className="p-3">{inc.date?.slice(0, 10)}</td>
                <td className="p-3">{inc.note || "-"}</td>
                <td className="p-3 space-x-3">
                  <button
                    onClick={() => setEditingIncome(inc)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(inc._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {incomes.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No income records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      
      <div className="mt-8">
        <IncomeForm
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          editingIncome={editingIncome}
        />
      </div>
    </div>
  );
}

export default Income;
