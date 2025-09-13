import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const postAPI = {
  getAllPosts: () => api.get("/posts"),

  getPost: (id) => api.get(`/posts/${id}`),

  createPost: (postData) => api.post("/posts", postData),

  updatePost: (id, postData) => api.put(`/posts/${id}`, postData),

  deletePost: (id) => api.delete(`/posts/${id}`),
};

export default api;
