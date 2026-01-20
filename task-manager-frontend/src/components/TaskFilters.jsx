import { Tabs, Input, Select, Space } from 'antd';

export default function TaskFilters({
  counts,
  hideStatus=false,
  onStatusChange,
  onSearch,
  sortBy,
  onSortChange,
  search
}) {
  return (
    <>
    {!hideStatus&&(
      <Tabs
        onChange={(key) =>
          onStatusChange(key === 'ALL' ? undefined : key)
        }
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
