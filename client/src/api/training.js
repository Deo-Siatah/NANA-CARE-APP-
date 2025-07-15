import api from "./axios";

//Get all trainings
export const getTrainings = () => api.get("/trainings");