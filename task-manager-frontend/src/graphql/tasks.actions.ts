import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation CreateTask($input: json) {
    createTask(input: $input)
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: Int!, $input: json) {
    updateTask(id: $id, input: $input)
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id)
  }
`;
