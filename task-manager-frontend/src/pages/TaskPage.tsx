import { Layout } from 'antd';
import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import TaskHeader from '../components/TaskHeader';
import TaskFilters from '../components/TaskFilters';
import TaskList from '../components/TaskList';
import TaskFormModal from '../components/TaskFormModal';
import { GET_TASK_COUNTS } from '../graphql/tasks.queries';
import useDebounce from '../hooks/useDebounce';
import LaneView from '../components/LaneView';
import { Task } from '../services/taskApi';

const { Content } = Layout;

interface TaskCountsResponse {
    getTaskCounts: {
        pending: number;
        inProgress: number;
        completed: number;
    };
}

export default function TaskPage() {
    const [status, setStatus] = useState<string>();
    const [modalOpen, setModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);
    const [sortBy, setSortBy] = useState('Sort by Date');
    const [view, setView] = useState<'list' | 'lane'>('list');

    const { data: countsData } = useQuery<TaskCountsResponse>(GET_TASK_COUNTS, {
        fetchPolicy: 'cache-and-network',
    });

    const counts = countsData?.getTaskCounts || {
        pending: 0,
        inProgress: 0,
        completed: 0,
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setModalOpen(true);
    };
    
    const handleSuccess = () => {
        setRefreshKey(k => k + 1);
        setEditingTask(null);
    };

    return (
        <Layout>
            <TaskHeader
                onAdd={() => setModalOpen(true)}
                view={view}
                setView={setView}
            />

            <Content style={{ padding: 24 }}>
                {view === 'list' && (
                    <TaskFilters
                        counts={counts}
                        onStatusChange={setStatus}
                        onSearch={setSearch}
                        search={search}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                    />
                )}

                {view === 'lane' && (
                    <TaskFilters
                        counts={counts}
                        hideStatus
                        onSearch={setSearch}
                        search={search}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                    />
                )}

                {view === 'list' && (
                    <TaskList
                        status={status}
                        refreshKey={refreshKey}
                        search={debouncedSearch}
                        sortBy={sortBy}
                        onEdit={handleEdit}
                        onDelete={handleSuccess}
                        onStatusChange={handleSuccess}
                    />
                )}

                {view === 'lane' && (
                    <LaneView
                        refreshKey={refreshKey}
                        search={debouncedSearch}
                        sortBy={sortBy}
                        onEdit={handleEdit}
                        onDelete={handleSuccess}
                        onStatusChange={handleSuccess}
                    />
                )}

                <TaskFormModal
                    open={modalOpen}
                    onClose={() => {
                        setModalOpen(false);
                        setEditingTask(null);
                    }}
                    onSuccess={handleSuccess}
                    task={editingTask}
                />
            </Content>
        </Layout>
    );
}
