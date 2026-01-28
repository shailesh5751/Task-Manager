import { Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import TaskLane from './TaskLane';
import { getTasks } from '../services/taskApi';
import { Status, Task } from '../types/task';

const STATUSES: Status[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];

interface LaneData {
  tasks: Task[];
}

type LaneState = Partial<Record<Status, LaneData>>;

interface LaneViewProps {
  refreshKey: number;
  search: string;
  sortBy: string;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onStatusChange: (taskId: number, status: Status) => void;
}

export default function LaneView({
  refreshKey,
  search,
  sortBy,
  onEdit,
  onDelete,
  onStatusChange,
}: LaneViewProps) {
  const [lanes, setLanes] = useState<LaneState>({});

  useEffect(() => {
    async function loadLanes() {
      const responses = await Promise.all(
        STATUSES.map(status =>
          getTasks({ status, search, sortBy, limit: 1000 })
        )
      );

      const next: LaneState = {};
      STATUSES.forEach((status, i) => {
        next[status] = { tasks: responses[i].data.data ?? [] };
      });

      setLanes(next);
    }

    loadLanes();
  }, [refreshKey, search, sortBy]);

  return (
    <Row gutter={16}>
      {STATUSES.map(status => (
        <Col span={8} key={status}>
          <TaskLane
            title={status.replace('_', ' ')}
            status={status}
            tasks={lanes[status]?.tasks ?? []}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        </Col>
      ))}
    </Row>
  );
}
