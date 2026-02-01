import { Tabs, Input, Select, Space, TabsProps } from 'antd';
import { FC } from 'react';

interface TaskCounts {
    pending: number;
    inProgress: number;
    completed: number;
}

interface TaskFiltersProps {
    counts: TaskCounts;
    hideStatus?: boolean;
    onStatusChange?: (status?: string) => void;
    onSearch: (search: string) => void;
    sortBy: string;
    onSortChange: (sort: string) => void;
    search: string;
}

const TaskFilters: FC<TaskFiltersProps> = ({
    counts,
    hideStatus = false,
    onStatusChange,
    onSearch,
    sortBy,
    onSortChange,
    search
}) => {
    const items: TabsProps['items'] = [
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
    ];

    return (
        <>
            {!hideStatus && (
                <Tabs
                    onChange={(key) =>
                        onStatusChange?.(key === 'ALL' ? undefined : key)
                    }
                    items={items}
                />
            )}

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
};

export default TaskFilters;
