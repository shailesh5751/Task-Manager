import { Card, Pagination } from 'antd';
import TaskCard from './TaskCard';

const PAGE_SIZE = 10;

export default function TaskLane({
  title,
  tasks = [],
  count = 0,
  page = 1,
  onPageChange,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  return (
    <Card
      title={`${title} (${count})`}
      styles={{
        body: {
          padding: 8,
          maxHeight: 700,
          overflowY: 'auto',
        },
      }}
    >
      {tasks.length === 0 && (
        <div style={{ textAlign: 'center', color: '#888', padding: 16 }}>
          No tasks
        </div>
      )}

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}

      {count > PAGE_SIZE && (
        <Pagination
          size="small"
          current={page}
          pageSize={PAGE_SIZE}
          total={count}
          onChange={onPageChange}
          style={{ marginTop: 12, textAlign: 'center' }}
        />
      )}
    </Card>
  );
}
