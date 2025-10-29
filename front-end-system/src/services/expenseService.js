import API from "./api";

// Get all expenses
export const getExpenses = () => API.get("/expenses");

// Add new expense
export const addExpense = (data) => API.post("/expenses/add", data);

// Update expense
export const updateExpense = (id, data) => API.put(`/expenses/${id}`, data);

// Delete expense
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);
