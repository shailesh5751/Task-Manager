import { Card, Button, Popconfirm, Space, Select, Tag } from 'antd';
import { useMutation } from '@apollo/client/react';
import { UPDATE_TASK, DELETE_TASK } from '../graphql/tasks.actions';
import dayjs from 'dayjs';
import { GET_TASKS, GET_TASK_COUNTS } from '../graphql/tasks.queries';
import { Task } from '../services/taskApi';
import { FC } from 'react';

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete?: (taskId: number) => void;
    onStatusChange?: (taskId: number, status: string) => void;
}

const TaskCard: FC<TaskCardProps> = ({ task, onEdit, onDelete, onStatusChange }) => {
    const [updateTaskMutation] = useMutation(UPDATE_TASK, {
        refetchQueries: [{ query: GET_TASKS },{ query: GET_TASK_COUNTS }],
    });

    const [deleteTaskMutation] = useMutation(DELETE_TASK, {
        refetchQueries: [{ query: GET_TASKS }],
    });

    const isOverdue =
        task.due_date &&
        task.status !== 'COMPLETED' &&
        dayjs(task.due_date).isBefore(dayjs());

    const handleStatusChange = async (value: string) => {
        await updateTaskMutation({
            variables: {
                id: task.id,
                input: { status: value },
            },
        });
        onStatusChange?.(task.id, value);
    };

    const handleDelete = async () => {
        await deleteTaskMutation({
            variables: { id: task.id },
        });
        onDelete?.(task.id);
    };

    return (
        <Card
            style={{
                height:180,
                marginBottom: 16,
                borderLeft: isOverdue ? '4px solid red' : '4px solid transparent',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{task.title}</strong>

                <Select
                    value={task.status}
                    size="small"
                    style={{ width: 140 }}
                    onChange={handleStatusChange}
                >
                    <Select.Option value="PENDING">PENDING</Select.Option>
                    <Select.Option value="IN_PROGRESS">IN_PROGRESS</Select.Option>
                    <Select.Option value="COMPLETED">COMPLETED</Select.Option>
                </Select>
            </div>

            <div style={{ marginTop: 8 }}>
                <strong>Priority:</strong> {task.priority}
            </div>

            <div style={{ marginTop: 4, color: '#555' }}>
                Created: {dayjs(task.created_at).format('MMM DD, YYYY')}
            </div>

            {task.due_date && (
                <div style={{ color: isOverdue ? 'red' : '#555' }}>
                    Due: {dayjs(task.due_date).format('MMM DD, YYYY')}
                    {isOverdue && (
                        <Tag style={{ marginLeft: 10 }} color="red">
                            Overdue
                        </Tag>
                    )}
                </div>
            )}

            <Space style={{ marginTop: 12 }}>
                <Button type="link" onClick={() => onEdit(task)}>
                    Edit
                </Button>

                <Popconfirm
                    title="Delete Task?"
                    description={`Are you sure you want to delete "${task.title}"?`}
                    onConfirm={handleDelete}
                >
                    <Button type="link" danger>
                        Delete
                    </Button>
                </Popconfirm>
            </Space>
        </Card>
    );
};

export default TaskCard;
