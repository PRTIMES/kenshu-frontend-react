import { useQuery } from '@tanstack/react-query';
import { Task } from '../types/Task';

const getTasks = async () => {
  const res: { tasks: Task[] } = await fetch(
    'http://localhost:8000/api/tasks',
  ).then((r) => r.json());
  return res;
};

export const useTasksQuery = () => {
  const query = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
    suspense: true,
  });

  return query;
};
