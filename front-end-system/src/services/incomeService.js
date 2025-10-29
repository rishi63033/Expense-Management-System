import API from "./api";

export const getIncomes = () => API.get("/income");
export const addIncome = (data) => API.post("/income/add", data);
export const updateIncome = (id, data) => API.put(`/income/${id}`, data);
export const deleteIncome = (id) => API.delete(`/income/${id}`);
