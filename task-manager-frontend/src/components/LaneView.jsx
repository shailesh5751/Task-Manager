import { Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import TaskLane from './TaskLane';
import { getTasks } from '../services/taskApi';

const STATUSES = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];

export default function LaneView({
    refreshKey,
    search,
    sortBy,
    onEdit,
    onDelete,
    onStatusChange,
}) {
    const [lanes, setLanes] = useState({});
    const PAGE_SIZE = 10;

    const [pages, setPages] = useState({
        PENDING: 1,
        IN_PROGRESS: 1,
        COMPLETED: 1,
    });

    const handlePageChange = (status, page) => {
        setPages(prev => ({ ...prev, [status]: page }));
    };

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

      const laneData = {};

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


    console.log('LaneView mounted');

    return (
        <Row gutter={16}>
            {STATUSES.map(status => (
                <Col span={8} key={status}>
                    <TaskLane
                        title={status.replace('_', ' ')}
                        tasks={lanes[status]?.tasks || []}
                        count={lanes[status]?.total || 0}
                        page={pages[status]}
                        onPageChange={(page) => handlePageChange(status, page)}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onStatusChange={onStatusChange}
                    />

                </Col>
            ))}
        </Row>
    );
}
