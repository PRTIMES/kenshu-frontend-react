import { useMutation } from '@tanstack/react-query';

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
  const mutation = useMutation({
    mutationKey: ['updateTaskTitle'],
    mutationFn: updateTaskTitle,
  });

  return mutation;
};
