import { Layout, Button, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import TaskFormModal from '../components/TaskFormModal';
import { deleteTask, getTaskCounts } from '../services/taskApi';

const { Header, Content } = Layout;

export default function TaskPage() {
    const [status, setStatus] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [editingTask, setEditingTask] = useState(null);
    const [counts, setCounts] = useState({});

    const handleDelete = async (id) => {
        await deleteTask(id);
        setRefreshKey(k => k + 1);
    };

    useEffect(() => {
        getTaskCounts().then(res => setCounts(res.data));
    }, [refreshKey]);

    return (
        <Layout>
            <Header style={{ color: 'white', fontSize: 20 }}>
                Task Manager
                <Button
                    type="primary"
                    style={{ float: 'right', margin: 15 }}
                    onClick={() => setModalOpen(true)}
                >
                    + Add Task
                </Button>
            </Header>

            <Content style={{ padding: 24 }}>
                <Tabs
                    onChange={(key) => setStatus(key === 'ALL' ? undefined : key)}
                    items={[
                        { key: 'ALL', label: 'All' },
                        { key: 'PENDING', label: `Pending (${counts.pending || 0})` },
                        { key: 'IN_PROGRESS', label: `In Progress (${counts.inProgress || 0})` },
                        { key: 'COMPLETED', label: `Completed (${counts.completed || 0})` },
                    ]}
                />


                <TaskList
                    status={status}
                    refreshKey={refreshKey}
                    onEdit={(task) => {
                        setEditingTask(task);
                        setModalOpen(true);
                    }}
                    onDelete={handleDelete}
                />

            </Content>

            <TaskFormModal
                open={modalOpen}
                task={editingTask}
                onClose={() => {
                    setModalOpen(false);
                    setEditingTask(null);
                }}
                onSuccess={() => setRefreshKey(k => k + 1)}
            />

        </Layout>
    );
}
