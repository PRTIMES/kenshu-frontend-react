import { useMutation, useQueryClient } from '@tanstack/react-query';

const updateTaskTitle = ({
  taskId,
  title,
}: {
  taskId: string;
  title: string;
}) =>
  fetch(`http://localhost:8000/api/tasks/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title,
    }),
  });

export const useUpdateTaskTitleMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['updateTaskTitle'],
    mutationFn: updateTaskTitle,
    onSuccess: () => {
      queryClient.refetchQueries(['tasks']);
    },
  });

  return mutation;
};
