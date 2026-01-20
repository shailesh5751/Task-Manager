import { Layout, Button, Switch, Space } from 'antd';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const { Header } = Layout;

export default function TaskHeader({ onAdd, view, setView }) {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <Header
      style={{
        color: 'white',
        fontSize: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span>Task Manager</span>

      <Space>
        <Button onClick={() => setView(view === 'list' ? 'lane' : 'list')}>
          {view === 'list' ? 'Lane View' : 'List View'}
        </Button>

        <Button type="primary" onClick={onAdd}>
          + Add Task
        </Button>

        <Switch
          checked={darkMode}
          onChange={setDarkMode}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
        />
      </Space>
    </Header>
  );
}
