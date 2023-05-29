import { useMutation, useQueryClient } from '@tanstack/react-query';

const finishTask = (taskId: string) =>
  fetch(`http://localhost:8000/api/tasks/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      finishedAt: new Date().toISOString(),
    }),
  });

export const useFinishTaskMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['finishTask'],
    mutationFn: finishTask,
    onSuccess: () => {
      queryClient.refetchQueries(['tasks']);
    },
  });

  return mutation;
};
