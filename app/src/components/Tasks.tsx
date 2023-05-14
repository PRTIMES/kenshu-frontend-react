import { k } from '@kuma-ui/core';
import { useQuery } from '@tanstack/react-query';

const getTasks = async () => {
  const res: { tasks: Task[] } = await fetch('http://localhost:8000/api/tasks').then((r) => r.json());
  await new Promise((r) => setTimeout(r, 1000));
  return res;
};

export const Tasks = () => {
  const { data, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
    suspense: true,
  });

  if (error) return <div>failed to load</div>;

  return (
    <k.ul>
      {data.tasks.map(({ id, title }) => (
        <k.li key={id}>
          <p>{title}</p>
        </k.li>
      ))}
    </k.ul>
  );
};
