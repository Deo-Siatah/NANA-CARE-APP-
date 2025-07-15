import api from "./axios";

//Register
export const register = (data) => api.post("/auth/signup",data);

//login
export const login = (data) => api.post("/auth/login",data);

//Get current user profile
export  const getUserProfile = (id,token) => 
    api.get(`/users/profile/${id}`,{
        headers: {Authorization: `Bearer ${token}`}
    });