import { useMutation } from '@tanstack/react-query';

const deleteTask = (id: string) =>
  fetch(`http://localhost:8000/api/tasks/${id}`, { method: 'DELETE' });

export const useDeleteTaskMutation = () => {
  const mutation = useMutation({
    mutationKey: ['deleteTask'],
    mutationFn: deleteTask,
  });

  return mutation;
};
