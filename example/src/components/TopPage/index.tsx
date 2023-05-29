import { useMutation, useQuery } from '@tanstack/react-query';
import { cn } from '../../lib/cn';

type Task = {
  id: string;
  title: string;
  createdAt: string;
  finishedAt: null | string;
};

const getTasks = async () => {
  const res: { tasks: Task[] } = await fetch(
    'http://localhost:8000/api/tasks',
  ).then((r) => r.json());
  return res;
};

const createTask = () =>
  fetch('http://localhost:8000/api/tasks', { method: 'POST' });

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
    <main className='min-h-screen bg-stone-50 px-2 pt-8'>
      <div className='mx-auto flex max-w-3xl flex-col gap-4 rounded-lg bg-white p-5 shadow-md'>
        <header className='flex items-center justify-between'>
          <h1 className='text-lg font-bold'>TODO リスト</h1>

          <button
            type='button'
            className='rounded-lg bg-orange-500 px-2 py-1 text-sm text-white hover:bg-orange-400'
            onClick={onClickCreateTaskButton}
          >
            タスクを追加
          </button>
        </header>

        <ul className='grid list-none gap-4'>
          {tasksQuery.data.tasks.map(({ id, title, finishedAt }) => (
            <li key={id} className='flex items-center gap-4'>
              {finishedAt === null ? (
                <button
                  type='button'
                  onClick={() => alert('unimplemented')}
                  aria-label='完了する'
                  className='h-6 w-6 rounded-md border-2 border-stone-500'
                />
              ) : (
                <button
                  type='button'
                  onClick={() => alert('unimplemented')}
                  aria-label='未完了に戻す'
                  className='h-6 w-6 rounded-md border-2 border-stone-500 bg-stone-500'
                />
              )}
              <p
                className={cn({
                  'text-stone-400 line-through': finishedAt !== null,
                })}
              >
                {title}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};
