import { useEffect, useState } from 'react';
import { Spin, Empty } from 'antd';
import { getTasks } from '../services/taskApi';
import TaskCard from './TaskCard';

export default function TaskList({ status, refreshKey, onEdit, onDelete }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTasks({ status })
      .then(res => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.data ?? [];

        setTasks(data);
      })
      .finally(() => setLoading(false));
  }, [status, refreshKey]);

  if (loading) return <Spin />;

  if (!tasks || tasks.length === 0) return <Empty />;

  return tasks.map(task => (
    <TaskCard
      key={task.id}
      task={task}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ));
}
