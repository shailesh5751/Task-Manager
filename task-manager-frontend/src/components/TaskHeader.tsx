import { Layout, Button, Switch, Space } from 'antd';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const { Header } = Layout;
type ViewMode = 'list' | 'lane';

export interface TaskHeaderProps {
  onAdd: () => void;
  view: ViewMode;
  setView: (view: ViewMode) => void;
}

export default function TaskHeader({ onAdd, view, setView }: TaskHeaderProps) {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <Header
      style={{
        background: darkMode ? '#001529' : '#1677ff',
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
          aria-label="Toggle dark mode"
          checked={darkMode}
          onChange={setDarkMode}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
        />
      </Space>
    </Header>
  );
}
