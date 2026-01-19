import { Modal, Form, Input, Select, message } from 'antd';
import { createTask, updateTask } from '../services/taskApi';
import { useEffect } from 'react';

const { TextArea } = Input;

export default function TaskFormModal({
  open,
  onClose,
  onSuccess,
  task, // undefined for Add, object for Edit
}) {
  const [form] = Form.useForm();
  const isEdit = !!task;

  useEffect(() => {
    if (!open) return;

    if (task) {
      form.setFieldsValue(task);
    } else {
      form.resetFields();
    }
  }, [task, open, form]);


  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (isEdit) {
        await updateTask(task.id, values);
        message.success('Task updated successfully');
      } else {
        await createTask(values);
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
      </Form>
    </Modal>
  );
}
