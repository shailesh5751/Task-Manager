import axios from 'axios';
import { Priority, Status, Task } from '../types/task';

export interface TaskListResponse {
  data: Task[];
  total: number;
}

export interface TaskCounts {
  pending: number;
  inProgress: number;
  completed: number;
}

export interface GetTasksParams {
  status?: Status;
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
}

export interface TaskPayload {
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  dueDate?: string | null;
}

const API = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTasks = (params: GetTasksParams) =>
  API.get<TaskListResponse>('/tasks', { params });

export const createTask = (data: TaskPayload) =>
  API.post<Task>('/tasks', data);

export const updateTask = (
  id: number,
  data: Partial<TaskPayload>
) =>
  API.put<Task>(`/tasks/${id}`, data);

export const deleteTask = (id: number) =>
  API.delete(`/tasks/${id}`);

export const getTaskCounts = () =>
  API.get('/tasks/counts');
