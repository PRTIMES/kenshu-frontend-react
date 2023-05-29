import { useQuery } from '@tanstack/react-query';

type Task = {
  id: string;
  title: string;
  createdAt: string;
  finishedAt: null | string;
};

const getTasks = async () => {
  const res: { tasks: Task[] } = await fetch('http://localhost:8000/api/tasks').then((r) => r.json());
  return res;
};

export const TopPage = () => {
  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
    suspense: true,
  });

  return (
    <ul>
      {tasksQuery.data.tasks.map(({ id, title }) => (
        <li key={id}>
          <p>{title}</p>
        </li>
      ))}
    </ul>
  );
};
