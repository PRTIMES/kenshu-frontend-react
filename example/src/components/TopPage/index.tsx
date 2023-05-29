import { useMutation, useQuery } from '@tanstack/react-query';

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

const createTask = () => fetch('http://localhost:8000/api/tasks', { method: 'POST' });

export const TopPage = () => {
  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
    suspense: true,
  });

  const createTaskMutation = useMutation({
    mutationKey: ['createTask'],
    mutationFn: createTask,
  });

  const onClickCreateTaskButton = async () => {
    // タスクを追加
    await createTaskMutation.mutateAsync();
    // タスク一覧を再取得
    tasksQuery.refetch();
  };

  return (
    <ul>
      <button type='button' onClick={onClickCreateTaskButton}>
        タスクを追加
      </button>

      {tasksQuery.data.tasks.map(({ id, title }) => (
        <li key={id}>
          <p>{title}</p>
        </li>
      ))}
    </ul>
  );
};
