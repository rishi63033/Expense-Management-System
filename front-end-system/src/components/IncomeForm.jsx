import { useState, useEffect } from "react";

function IncomeForm({ onAdd, onUpdate, editingIncome }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    note: "",
  });

  // Prefill form when editing
  useEffect(() => {
    if (editingIncome) setForm(editingIncome);
  }, [editingIncome]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIncome) onUpdate(form);
    else onAdd(form);

    // Reset form
    setForm({ title: "", amount: "", category: "", date: "", note: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl p-6 mb-6 space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="p-2 border rounded-lg"
          required
        />
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="p-2 border rounded-lg"
          required
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="p-2 border rounded-lg"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="p-2 border rounded-lg"
        />
      </div>
      <textarea
        name="note"
        value={form.note}
        onChange={handleChange}
        placeholder="Note"
        className="w-full p-2 border rounded-lg"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        {editingIncome ? "Update Income" : "Add Income"}
      </button>
    </form>
  );
}

export default IncomeForm;
