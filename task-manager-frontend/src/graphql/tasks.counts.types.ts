export interface TaskCountsData {
  pending: {
    aggregate: {
      count: number;
    };
  };
  inProgress: {
    aggregate: {
      count: number;
    };
  };
  completed: {
    aggregate: {
      count: number;
    };
  };
}
