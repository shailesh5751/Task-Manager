import { Card, Empty } from 'antd';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import TaskCard from './TaskCard';
import { Task } from '../services/taskApi';

const ITEM_HEIGHT =200;
const LIST_HEIGHT = 700;
const LIST_WIDTH = 500;

interface TaskLaneProps {
    title: string;
    tasks: Task[];
    count: number;
    onEdit: (task: Task) => void;
    onDelete?: (taskId: number) => void;
    onStatusChange?: (taskId: number, status: string) => void;
}

const TaskLane = ({
    title,
    tasks,
    count,
    onEdit,
    onDelete,
    onStatusChange,
}: TaskLaneProps) => {
    const Row = ({ index, style }: ListChildComponentProps) => {
        const task = tasks[index];
        if (!task) return null;

        return (
            <div style={style}>
                <TaskCard
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                />
            </div>
        );
    };

    return (
        <Card
            title={`${title} (${count})`}
        >
            {tasks.length === 0 ? (
                <Empty />
            ) : (
                <List
                    height={LIST_HEIGHT}
                    width={LIST_WIDTH}
                    itemCount={tasks.length}
                    itemSize={ITEM_HEIGHT}
                    overscanCount={3}
                >
                    {Row}
                </List>
            )}
        </Card>
    );
};

export default TaskLane;