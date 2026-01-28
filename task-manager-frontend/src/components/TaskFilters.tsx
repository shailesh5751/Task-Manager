import { Tabs, Input, Select, Space } from 'antd';
import { Status } from '../types/task';

export type StatusFilter = Status | 'ALL';

const isStatus = (value: string): value is Status =>
  value === 'PENDING' || value === 'IN_PROGRESS' || value === 'COMPLETED';

interface TaskCounts {
  pending: number;
  inProgress: number;
  completed: number;
}

interface TaskFiltersProps {
  counts: TaskCounts;
  hideStatus?: boolean;
  onStatusChange?: (tatus: Status | undefined) => void;
  onSearch: (title: string) => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  search: string;
}

export default function TaskFilters({
  counts,
  hideStatus = false,
  onStatusChange,
  onSearch,
  sortBy,
  onSortChange,
  search
}: TaskFiltersProps) {
  return (
    <>
      {!hideStatus && (
        <Tabs
          onChange={(key: string) => {
            if (!onStatusChange) return;

            if (key === 'ALL') {
              onStatusChange(undefined);
            } else if (isStatus(key)) {
              onStatusChange(key as Status);
            }
          }}
          items={[
            { key: 'ALL', label: 'All' },
            { key: 'PENDING', label: `Pending (${counts.pending || 0})` },
            {
              key: 'IN_PROGRESS',
              label: `In Progress (${counts.inProgress || 0})`,
            },
            {
              key: 'COMPLETED',
              label: `Completed (${counts.completed || 0})`,
            },
          ]}
        />)}

      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search tasks..."
          allowClear
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          style={{ width: 200 }}
        />

        <Select
          value={sortBy}
          onChange={onSortChange}
          style={{ width: 180 }}
        >
          <Select.Option value="createdAt">
            Sort by Date
          </Select.Option>
          <Select.Option value="priority">
            Sort by Priority
          </Select.Option>
        </Select>
      </Space>
    </>
  );
}
