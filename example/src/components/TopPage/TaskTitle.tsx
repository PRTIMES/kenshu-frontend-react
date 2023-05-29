import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { cn } from '../../lib/cn';
import { useTasksQuery } from '../../api/useTasksQuery';
import { useUpdateTaskTitleMutation } from '../../api/useUpdateTaskTitleMutation';

type Props = {
  id: string;
  title: string;
  finishedAt: string | null;
};

export const TaskTitle = ({ id, title, finishedAt }: Props) => {
  const tasksQuery = useTasksQuery();
  const updateTaskTitleMutation = useUpdateTaskTitleMutation();

  const [isEditing, setIsEditing] = useState(false);
  const onClickTitle = () => setIsEditing(true);

  const [fieldValue, setFieldValue] = useState(title);
  const onChange = (({ target: { value } }) =>
    setFieldValue(value)) satisfies ChangeEventHandler<HTMLInputElement>;

  const onSubmit = (async (e) => {
    e.preventDefault();

    await updateTaskTitleMutation.mutateAsync({
      taskId: id,
      title: fieldValue,
    });
    setIsEditing(false);
    void tasksQuery.refetch();
  }) satisfies FormEventHandler;

  return (
    <>
      {isEditing ? (
        <form onSubmit={onSubmit}>
          <input
            type='text'
            value={fieldValue}
            onChange={onChange}
            className='rounded-md border p-2'
          />
        </form>
      ) : (
        <button
          className={cn({
            'text-stone-400 line-through': finishedAt !== null,
          })}
          onClick={onClickTitle}
        >
          {title}
        </button>
      )}
    </>
  );
};
