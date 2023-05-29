import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTasksQuery } from './useTasksQuery';

const deleteTask = (id: string) =>
  fetch(`http://localhost:8000/api/tasks/${id}`, { method: 'DELETE' });

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['deleteTask'],
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.refetchQueries(['tasks']);
    },
  });

  return mutation;
};
