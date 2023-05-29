import { useMutation } from '@tanstack/react-query';

const unfinishTask = (taskId: string) =>
  fetch(`http://localhost:8000/api/tasks/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      finishedAt: null,
    }),
  });

export const useUnfinishTaskMutation = () => {
  const mutation = useMutation({
    mutationKey: ['unfinishTask'],
    mutationFn: unfinishTask,
  });

  return mutation;
};
