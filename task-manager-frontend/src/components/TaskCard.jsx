import { Card, Button, Popconfirm, Space } from 'antd';
import dayjs from 'dayjs';

export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <Card style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <strong>{task.title}</strong>
        <span>[{task.status}]</span>
      </div>

      <div style={{ marginTop: 8 }}>
        <strong>Priority:</strong> {task.priority}
      </div>

      <div style={{ marginTop: 4, color: '#555' }}>
        Created: {dayjs(task.createdAt).format('MMM DD, YYYY')}
      </div>

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
