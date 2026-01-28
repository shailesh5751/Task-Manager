import { useEffect, useState, CSSProperties, JSX } from 'react';
import { Spin, Empty } from 'antd';
import { FixedSizeList as List } from 'react-window';
import { getTasks } from '../services/taskApi';
import TaskCard from './TaskCard';
import { Status, Task } from '../types/task';

const LIST_HEIGHT = 700;
const ITEM_HEIGHT = 200;
const LIST_WIDTH = 1700;

interface TaskListProps {
  status?: Status;
  refreshKey: number;
  search: string;
  sortBy: string;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onStatusChange: (taskId: number, status: Status) => void;
}

export default function TaskList({
  status,
  refreshKey,
  search,
  sortBy,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskListProps): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch tasks
  useEffect(() => {
    setLoading(true);
    getTasks({ status, search, sortBy, limit: 1000 })
      .then(res => setTasks(res.data?.data ?? []))
      .finally(() => setLoading(false));
  }, [status, refreshKey, search, sortBy]);

  // Guards (VERY IMPORTANT)
  if (loading) return <Spin />;
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return <Empty />;
  }

  // Row renderer (react-window calls this many times)
  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: CSSProperties;
  }): JSX.Element => {
    const task = tasks[index];

    // react-window may ask for out-of-range rows (overscan)
    if (!task || tasks.length===0) {
      return <div style={style} />;
    }
    return (
      <div style={style}>
        <TaskCard
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      </div>
    );
  };

  return (
    <List
      height={LIST_HEIGHT}
      width={LIST_WIDTH}
      itemCount={tasks.length}
      itemSize={ITEM_HEIGHT}
    >
      {Row}
    </List>
  );
}
