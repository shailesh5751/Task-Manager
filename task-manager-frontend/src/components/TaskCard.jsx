import { Card, Button, Popconfirm, Space, Select, Tag } from 'antd';
import dayjs from 'dayjs';

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const isOverdue =
    task.dueDate &&
    task.status !== 'COMPLETED' &&
    dayjs(task.dueDate).isBefore(dayjs());
  return (
    <Card style={{ marginBottom: 16, borderLeft: isOverdue ? '4px solid red' : '4px solid transparent', }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <strong>{task.title}</strong>

        <Select
          value={task.status}
          size="small"
          style={{ width: 140 }}
          onChange={(value) => onStatusChange(task.id, value)}
        >
          <Select.Option value="PENDING">PENDING</Select.Option>
          <Select.Option value="IN_PROGRESS">IN_PROGRESS</Select.Option>
          <Select.Option value="COMPLETED">COMPLETED</Select.Option>
        </Select>

        {/* <span>[{task.status}]</span> */}
      </div>

      <div style={{ marginTop: 8 }}>
        <strong>Priority:</strong> {task.priority}
      </div>

      <div style={{ marginTop: 4, color: '#555' }}>
        Created: {dayjs(task.createdAt).format('MMM DD, YYYY')}
      </div>

      {task.dueDate && (
        <div style={{color: isOverdue ? 'red' : '#555' }}>
          Due: {dayjs(task.dueDate).format('MMM DD, YYYY')}
          {isOverdue && <Tag style={{marginLeft:10}} color="red">Overdue</Tag>}
        </div>
      )}

      <Space style={{ marginTop: 12 }}>
        <Button type="link" onClick={() => onEdit(task)}>
          Edit
        </Button>

        <Popconfirm
          title="Delete Task?"
          description={`Are you sure you want to delete "${task.title}"?`}
          onConfirm={() => onDelete(task.id)}
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      </Space>
    </Card>
  );
}
