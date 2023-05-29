import { TaskTitle } from './TaskTitle';
import { useTasksQuery } from '../../api/useTasksQuery';
import { useCreateTaskMutation } from '../../api/useCreateTaskMutation';
import { useFinishTaskMutation } from '../../api/useFinishTaskMutation';
import { useUnfinishTaskMutation } from '../../api/useUnfinishTaskMutation';

export const TopPage = () => {
  const tasksQuery = useTasksQuery();
  const createTaskMutation = useCreateTaskMutation();
  const finishTaskMutation = useFinishTaskMutation();
  const unfinishTaskMutation = useUnfinishTaskMutation();

  const onClickCreateTaskButton = async () => {
    // タスクを追加
    await createTaskMutation.mutateAsync();
    // タスク一覧を再取得
    tasksQuery.refetch();
  };

  const onClickFinishTaskButton = async (taskId: string) => {
    // タスクを完了
    await finishTaskMutation.mutateAsync(taskId);
    // タスク一覧を再取得
    tasksQuery.refetch();
  };

  const onClickUnfinishTaskButton = async (taskId: string) => {
    // タスクを未完了に戻す
    await unfinishTaskMutation.mutateAsync(taskId);
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
                  onClick={() => onClickFinishTaskButton(id)}
                  aria-label='完了する'
                  className='h-6 w-6 rounded-md border-2 border-stone-500'
                />
              ) : (
                <button
                  type='button'
                  onClick={() => onClickUnfinishTaskButton(id)}
                  aria-label='未完了に戻す'
                  className='h-6 w-6 rounded-md border-2 border-stone-500 bg-stone-500'
                />
              )}

              <TaskTitle id={id} title={title} finishedAt={finishedAt} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};
