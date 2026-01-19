import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTasks = (params) =>
  API.get('/tasks', { params });

export const createTask = (data) =>
  API.post('/tasks', data);

export const updateTask = (id, data) =>
  API.put(`/tasks/${id}`, data);

export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);

export const getTaskCounts = () =>
  API.get('/tasks/counts');
