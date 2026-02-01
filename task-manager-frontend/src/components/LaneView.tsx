import { Row, Col } from 'antd';
import { useEffect, useState, FC } from 'react';
import TaskLane from './TaskLane';
import { getTasks } from '../services/taskApi';
import { Task } from '../services/taskApi';

const STATUSES = ['PENDING', 'IN_PROGRESS', 'COMPLETED'] as const;
const PAGE_SIZE = 1000;

interface LaneData {
    tasks: Task[];
    total: number;
}

interface LanesState {
    [key: string]: LaneData;
}

interface PagesState {
    PENDING: number;
    IN_PROGRESS: number;
    COMPLETED: number;
}

interface LaneViewProps {
    refreshKey: number;
    search: string;
    sortBy: string;
    onEdit: (task: Task) => void;
    onDelete?: () => void;
    onStatusChange?: () => void;
}

const LaneView: FC<LaneViewProps> = ({
    refreshKey,
    search,
    sortBy,
    onEdit,
    onDelete,
    onStatusChange,
}) => {
    const [lanes, setLanes] = useState<LanesState>({
        PENDING: { tasks: [], total: 0 },
        IN_PROGRESS: { tasks: [], total: 0 },
        COMPLETED: { tasks: [], total: 0 },
    });

    const [pages, setPages] = useState<PagesState>({
        PENDING: 1,
        IN_PROGRESS: 1,
        COMPLETED: 1,
    });

    useEffect(() => {
        setPages({
            PENDING: 1,
            IN_PROGRESS: 1,
            COMPLETED: 1,
        });
    }, [search, sortBy]);

    useEffect(() => {
        async function loadLanes() {
            try {
                const responses = await Promise.all(
                    STATUSES.map((status) =>
                        getTasks({
                            status,
                            page: pages[status],
                            limit: PAGE_SIZE,
                            search,
                            sortBy,
                        })
                    )
                );

                const laneData: LanesState = {};

                STATUSES.forEach((status, index) => {
                    laneData[status] = {
                        tasks: responses[index]?.data?.data || [],
                        total: responses[index]?.data?.total || 0,
                    };
                });

                setLanes(laneData);
            } catch (err) {
                console.error('LaneView fetch error:', err);
            }
        }

        loadLanes();
    }, [refreshKey, search, sortBy, pages]);

    return (
        <Row gutter={16}>
            {STATUSES.map(status => (
                <Col span={8} key={status}>
                    <TaskLane
                        title={status.replace('_', ' ')}
                        tasks={lanes[status]?.tasks || []}
                        count={lanes[status]?.total || 0}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onStatusChange={onStatusChange}
                    />
                </Col>
            ))}
        </Row>
    );
};

export default LaneView;
