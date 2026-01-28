import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import TaskHeader from '../components/TaskHeader';
import TaskFilters from '../components/TaskFilters';
import TaskList from '../components/TaskList';
import TaskFormModal from '../components/TaskFormModal';
import { deleteTask, getTaskCounts, updateTask } from '../services/taskApi';
import useDebounce from '../hooks/useDebounce';
import LaneView from '../components/LaneView';
import { Status, Task } from '../types/task';

const { Content } = Layout;

type ViewMode = 'list' | 'lane';

interface TaskCounts {
  pending: number;
  inProgress: number;
  completed: number;
}

export default function TaskPage() {
  const [status, setStatus] = useState<Status | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [counts, setCounts] = useState<TaskCounts>({
    pending: 0,
    inProgress: 0,
    completed: 0,
  });
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 500);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [view, setView] = useState<ViewMode>('list');

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setRefreshKey(k => k + 1);
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleQuickStatusChange = async (id: number, status: Status) => {
    if (!id || !status) return;
    await updateTask(id, { status });
    setRefreshKey(k => k + 1);
  };

  useEffect(() => {
    getTaskCounts().then((res) => setCounts(res.data));
  }, [refreshKey]);

  return (
    <Layout>
      <TaskHeader onAdd={() => setModalOpen(true)}
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
            hideStatus   // NEW FLAG
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
            onDelete={handleDelete}
            onStatusChange={handleQuickStatusChange}
          />
        )}

        {view === 'lane' && (
          <LaneView
            refreshKey={refreshKey}
            search={debouncedSearch}
            sortBy={sortBy}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleQuickStatusChange}
          />
        )}


      </Content>
      <TaskFormModal
        open={modalOpen}
        task={editingTask || undefined}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        onSuccess={() => setRefreshKey((k) => k + 1)}
      />
    </Layout>
  );
}
