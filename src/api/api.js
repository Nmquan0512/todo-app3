import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

export const getTasks = async () => {
  const res = await axios.get(`${API_URL}/todos?_limit=10`);
  return res.data;
};

export const getTask = async (id) => {
  const res = await axios.get(`${API_URL}/todos/${id}`);
  return res.data;
};

export const createTask = async (task) => {
  const res = await axios.post(`${API_URL}/todos`, task);
  return res.data;
};

export const updateTask = async (id, task) => {
  const res = await axios.put(`${API_URL}/todos/${id}`, task);
  return res.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/todos/${id}`);
};
