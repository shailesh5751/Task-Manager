import { useEffect, useState } from 'react';
import { Spin, Empty, Pagination } from 'antd';
import { getTasks } from '../services/taskApi';
import TaskCard from './TaskCard';

export default function TaskList({
  status,
  refreshKey,
  onEdit,
  onDelete,
  search,
  sortBy,
  onStatusChange
}) {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [search, sortBy, status]);


  useEffect(() => {
    setLoading(true);

    getTasks({
      status,
      page,
      limit: 10,
      search,
      sortBy,
    })
      .then(res => {
        if (Array.isArray(res.data)) {

          setTasks(res.data);
          setTotal(res.data.length);
        } else {

          setTasks(res.data.data || []);
          setTotal(res.data.total || 0);
        }
      })

      .finally(() => setLoading(false));
  }, [status, refreshKey, page, search, sortBy]);

  if (loading) return <Spin />;

  if (!Array.isArray(tasks) || tasks.length === 0) {
    return <Empty />;
  }


  return (
    <>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}

      <Pagination
        current={page}
        pageSize={10}
        total={total}
        onChange={setPage}
        style={{ marginTop: 16, textAlign: 'center' }}
      />
    </>
  );
}
