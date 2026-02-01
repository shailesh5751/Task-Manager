import { Modal, Form, Input, Select, DatePicker } from 'antd';
import { useApolloClient } from '@apollo/client/react';
import { GET_TASKS } from '../graphql/tasks.queries';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { App } from 'antd';
import axios from 'axios';
import { Task } from '../services/taskApi';
import { FC } from 'react';

const { TextArea } = Input;

interface TaskFormModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    task?: Task | null;
}

const TaskFormModal: FC<TaskFormModalProps> = ({ open, onClose, onSuccess, task }) => {
    const [form] = Form.useForm<any>();
    const isEdit = !!task;
    const { message } = App.useApp();
    const client = useApolloClient();
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

    useEffect(() => {
        if (!open) return;

        if (task) {
            form.setFieldsValue({
                ...task,
                due_date: task.due_date ? dayjs(task.due_date) : null,
            });
        } else {
            form.resetFields();
        }
    }, [task, open, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            const payload = {
                title: values.title,
                description: values.description || null,
                priority: values.priority,
                status: values.status,
                due_date: values.due_date ? values.due_date.toISOString() : null,
            };

            if (isEdit && task) {
                await axios.put(`${backendUrl}/tasks/${task.id}`, payload);
                message.success('Task updated successfully');
            } else {
                await axios.post(`${backendUrl}/tasks`, payload);
                message.success('Task created successfully');
            }
            // Refetch tasks from Hasura after mutation
            client.refetchQueries({ include: [GET_TASKS] });

            onSuccess();
            onClose();
        } catch (err) {
            console.error('Error:', err);
            message.error('Operation failed');
        }
    };

    return (
        <Modal
            title={isEdit ? 'Edit Task' : 'Add New Task'}
            open={open}
            onCancel={onClose}
            onOk={handleSubmit}
            okText={isEdit ? 'Update Task' : 'Save Task'}
        >
            <Form
                layout="vertical"
                form={form}
                initialValues={{
                    priority: 'MEDIUM',
                    status: 'PENDING',
                }}
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter title' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Description" name="description">
                    <TextArea rows={3} />
                </Form.Item>

                <Form.Item label="Priority" name="priority">
                    <Select>
                        <Select.Option value="LOW">LOW</Select.Option>
                        <Select.Option value="MEDIUM">MEDIUM</Select.Option>
                        <Select.Option value="HIGH">HIGH</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Status" name="status">
                    <Select>
                        <Select.Option value="PENDING">PENDING</Select.Option>
                        <Select.Option value="IN_PROGRESS">IN_PROGRESS</Select.Option>
                        <Select.Option value="COMPLETED">COMPLETED</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Due Date" name="due_date">
                    <DatePicker
                        style={{ width: '100%' }}
                        disabledDate={(current) =>
                            current && current.isBefore(dayjs().startOf('day'))
                        }
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TaskFormModal;
