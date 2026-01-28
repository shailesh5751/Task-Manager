import { Modal, Form, Input, Select, DatePicker } from 'antd';
import { createTask, updateTask } from '../services/taskApi';
import { useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { App } from 'antd';
import { Priority, Status, Task } from '../types/task';

const { TextArea } = Input;

interface TaskFormValues {
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  dueDate?: Dayjs | null;
}

export type TaskFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  task?: Task;
}

export default function TaskFormModal({
  open,
  onClose,
  onSuccess,
  task, // undefined for Add, object for Edit
}: TaskFormModalProps) {
  const [form] = Form.useForm<TaskFormValues>();
  const isEdit = !!task;

  const { message } = App.useApp();

  useEffect(() => {
    if (!open) return;

    if (task) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate ? dayjs(task.dueDate) : null,
      });
    } else {
      form.resetFields();
    }
  }, [task, open, form]);


  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        ...values,
        dueDate: values.dueDate
          ? values.dueDate.toISOString()
          : null,
      };

      if (task) {
        await updateTask(task.id, payload);
        message.success('Task updated successfully');
      } else {
        await createTask(payload);
        message.success('Task created successfully');
      }

      onSuccess();
      onClose();
    } catch (err) {
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
      <Form layout="vertical" form={form} initialValues={{
        priority: 'MEDIUM',
        status: 'PENDING',
      }}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true }]}
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

        <Form.Item label="Due Date" name="dueDate">
          <DatePicker style={{ width: '100%' }}
            disabledDate={(current) =>
              current && current.isBefore(dayjs().startOf('day'))
            } />
        </Form.Item>

      </Form>
    </Modal>
  );
}
