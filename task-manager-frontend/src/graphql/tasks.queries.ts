import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks(
    $page: Int
    $limit: Int
    $search: String
    $status: String
    $sortBy: String
  ) {
    getTasks(
      page: $page
      limit: $limit
      search: $search
      status: $status
      sortBy: $sortBy
    )
  }
`;

export const GET_TASK_COUNTS = gql`
  query TaskCounts {
    getTaskCounts
  }
`;

export const GET_TASK_BY_ID = gql`
  query GetTaskById($id: Int!) {
    Task_by_pk(id: $id) {
      id
      title
      description
      status
      priority
      due_date
      created_at
      updated_at
    }
  }
`;
