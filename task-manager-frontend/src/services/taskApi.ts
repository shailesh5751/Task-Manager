import axios, { AxiosResponse } from 'axios';

export interface Task {
    id: number;
    title: string;
    description?: string | null;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    due_date?: string | null;
    created_at: string;
    updated_at: string;
}

export interface TasksResponse {
    data: Task[];
    total: number;
}

export interface TaskCounts {
    pending: number;
    inProgress: number;
    completed: number;
}

export interface GetTasksParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    sortBy?: string;
}

const API = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getTasks = (params: GetTasksParams): Promise<AxiosResponse<TasksResponse>> =>
    API.get('/tasks', { params });

export const createTask = (data: Partial<Task>): Promise<AxiosResponse<Task>> =>
    API.post('/tasks', data);

export const updateTask = (id: number, data: Partial<Task>): Promise<AxiosResponse<Task>> =>
    API.put(`/tasks/${id}`, data);

export const deleteTask = (id: number): Promise<AxiosResponse<void>> =>
    API.delete(`/tasks/${id}`);

export const getTaskCounts = (): Promise<AxiosResponse<TaskCounts>> =>
    API.get('/tasks/counts');
