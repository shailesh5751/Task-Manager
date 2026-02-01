import { Layout, Button, Switch, Space } from 'antd';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FC } from 'react';

const { Header } = Layout;

interface TaskHeaderProps {
    onAdd: () => void;
    view: 'list' | 'lane';
    setView: (view: 'list' | 'lane') => void;
}

const TaskHeader: FC<TaskHeaderProps> = ({ onAdd, view, setView }) => {
    const themeContext = useContext(ThemeContext);
    const darkMode = themeContext?.darkMode ?? false;
    const setDarkMode = themeContext?.setDarkMode ?? (() => { });

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
};

export default TaskHeader;
