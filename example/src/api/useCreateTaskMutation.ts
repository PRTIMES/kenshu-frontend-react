import { useMutation } from '@tanstack/react-query';

const createTask = () =>
  fetch('http://localhost:8000/api/tasks', { method: 'POST' });

export const useCreateTaskMutation = () => {
  const mutation = useMutation({
    mutationKey: ['createTask'],
    mutationFn: createTask,
  });

  return mutation;
};
