import api from "./axios";
//create review
export const createReview = (data,token) => 
    api.post("/reviews",data, {
        headers: {Authorization: `Bearer ${token}`}
    });

//get reviews for a user
export const getReviewsForUser = (userId) => 
    api.get(`/reviews/target/${userId}`);