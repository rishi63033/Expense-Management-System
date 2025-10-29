import api from "./api";

// Hit backend GET /api/auth/profile
export const getProfile = () => api.get("/auth/profile");
