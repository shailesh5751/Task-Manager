import { useEffect, useState, FC } from 'react';
import { Spin, Empty, Pagination } from 'antd';
import { getTasks, Task } from '../services/taskApi';
import TaskCard from './TaskCard';

const PAGE_SIZE = 10;

interface TaskListProps {
    status?: string;
    refreshKey: number;
    onEdit: (task: Task) => void;
    onDelete?: () => void;
    search: string;
    sortBy: string;
    onStatusChange?: () => void;
}

const TaskList: FC<TaskListProps> = ({
    status,
    refreshKey,
    onEdit,
    onDelete,
    search,
    sortBy,
    onStatusChange
}) => {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setPage(1);
    }, [search, sortBy, status]);

    useEffect(() => {
        async function loadTasks() {
            setLoading(true);
            try {
                const resolvedSort =
                    sortBy === 'Sort by Date' || sortBy === 'createdAt' ? 'created_at' : sortBy === 'Sort by Priority' || sortBy === 'priority' ? 'priority' : 'created_at';

                const response = await getTasks({
                    page,
                    limit: PAGE_SIZE,
                    status: status || undefined,
                    search: search || undefined,
                    sortBy: resolvedSort,
                });
                setTasks(response.data.data);
                setTotal(response.data.total);
            } catch (err) {
                console.error('Error fetching tasks:', err);
                setTasks([]);
                setTotal(0);
            } finally {
                setLoading(false);
            }
        }

        loadTasks();
    }, [page, status, search, sortBy, refreshKey]);

    if (loading && tasks.length === 0) return <Spin />;

    if (!Array.isArray(tasks) || tasks.length === 0) {
        return <Empty />;
    }

    return (
        <>
            {tasks.map(task => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                />
            ))}

            {total > PAGE_SIZE && (
                <Pagination
                    current={page}
                    pageSize={PAGE_SIZE}
                    total={total}
                    onChange={setPage}
                    style={{ marginTop: 16, textAlign: 'center' }}
                />
            )}
        </>
    );
};

export default TaskList;
