import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { config } from './axios-config.tsx'
import { Task } from './types/my-type.tsx';

const fetcher = async () => {
  const { data } = await axios.get(
    'http://127.0.0.1:8000/api/tasks',
    config
  )
  return data;
};

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        queryFn: fetcher,
      },
    },
  }
);

const TodoApp = () => {
  const { data: tasks, isLoading, isError, error } = useQuery({ queryKey: ['/posts'] });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    console.log(error)
    return <div>Error fetching tasks</div>;
  }
  const taskTyped: Task[] = tasks["tasks"].map((task) => {
    return {
      id: task.id,
      title: task.title,
      createdAt: task.createdAt,
      finishedAt: task.finishedAt
    }
  })
  console.log(taskTyped)
  return (
    <div>
      <h1>Hello TypeScript!</h1>
      <ul>
        {taskTyped.map((task, key) => {
          return (
            <li key={key}>
              <h3>{task.title}</h3>
              <p>{task.createdAt}</p>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <TodoApp />
  </QueryClientProvider>
);

export default App;
