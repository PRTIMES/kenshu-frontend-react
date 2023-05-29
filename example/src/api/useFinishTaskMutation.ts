import { useMutation } from '@tanstack/react-query';

const finishTask = (taskId: string) =>
  fetch(`http://localhost:8000/api/tasks/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      finishedAt: new Date().toISOString(),
    }),
  });

export const useFinishTaskMutation = () => {
  const mutation = useMutation({
    mutationKey: ['finishTask'],
    mutationFn: finishTask,
  });

  return mutation;
};
