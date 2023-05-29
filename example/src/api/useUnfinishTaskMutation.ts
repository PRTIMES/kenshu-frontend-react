import { useMutation, useQueryClient } from '@tanstack/react-query';

const unfinishTask = (taskId: string) =>
  fetch(`http://localhost:8000/api/tasks/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      finishedAt: null,
    }),
  });

export const useUnfinishTaskMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['unfinishTask'],
    mutationFn: unfinishTask,
    onSuccess: () => {
      queryClient.refetchQueries(['tasks']);
    },
  });

  return mutation;
};
