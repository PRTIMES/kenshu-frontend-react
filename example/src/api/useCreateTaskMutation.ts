import { useMutation, useQueryClient } from '@tanstack/react-query';

const createTask = () =>
  fetch('http://localhost:8000/api/tasks', { method: 'POST' });

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['createTask'],
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.refetchQueries(['tasks']);
    },
  });

  return mutation;
};
