export type Status = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string | null;
  createdAt: string;
  updatedAt: string;
}
