
import api from "./axios";

//get all workers profiles
export const getAllWorkers = () => api.get("/workers");

//get single worker
export const getWorkerById = (userId) => api.get(`/workers/user/${userId}`);

//create worker profile
export const createWorkerProfile = (data,token) =>
    api.post("/workers",data,{
        headers: {
            Authorization: `Bearer ${token}`
        },
    }); 