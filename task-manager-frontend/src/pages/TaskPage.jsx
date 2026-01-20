import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import TaskHeader from '../components/TaskHeader';
import TaskFilters from '../components/TaskFilters';
import TaskList from '../components/TaskList';
import TaskFormModal from '../components/TaskFormModal';
import { deleteTask, getTaskCounts, updateTask } from '../services/taskApi';
import useDebounce from '../hooks/useDebounce';
import LaneView from '../components/LaneView';

const { Content } = Layout;

export default function TaskPage() {
  const [status, setStatus] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingTask, setEditingTask] = useState(null);
  const [counts, setCounts] = useState({});
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [sortBy, setSortBy] = useState('createdAt');
  const [view, setView] = useState('list');

  const handleDelete = async (id) => {
    await deleteTask(id);
    setRefreshKey((k) => k + 1);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleQuickStatusChange = async (id, status) => {
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
            status={status}
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
        task={editingTask}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        onSuccess={() => setRefreshKey((k) => k + 1)}
      />
    </Layout>
  );
}
