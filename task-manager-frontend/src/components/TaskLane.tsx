import { Card } from 'antd';
import { FixedSizeList as List } from 'react-window';
import TaskCard from './TaskCard';
import { Task, Status } from '../types/task';
import { CSSProperties, JSX } from 'react';

const LANE_HEIGHT = 700;
const ITEM_HEIGHT = 200;
const LANE_WIDTH = 550;

interface TaskLaneProps {
  title: string;
  status: Status;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onStatusChange: (taskId: number, status: Status) => void;
}

export default function TaskLane({
  title,
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskLaneProps): JSX.Element {
  // Empty lane guard
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return (
      <Card title={title} styles={{ body: { padding: 16 } }}>
        No tasks
      </Card>
    );
  }

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: CSSProperties;
  }): JSX.Element => {
    const task = tasks[index];

    if (!task) {
      return <div style={style} />;
    }

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
    <Card title={`${title} (${tasks.length})`} styles={{ body: { padding: 0 } }}>
      <List
        height={LANE_HEIGHT}
        width={LANE_WIDTH}
        itemCount={tasks.length}
        itemSize={ITEM_HEIGHT}
      >
        {Row}
      </List>
    </Card>
  );
}
