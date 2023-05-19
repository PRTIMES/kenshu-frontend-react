import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Task } from './types/my-type.tsx';
import { getAllData } from './fetcher.tsx';
import { queryClientGetAllData } from './query-client.tsx';

const TodoApp = () => {
  const { data: tasks, isLoading, isError, error } = useQuery({ queryKey: [] });
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
  <QueryClientProvider client={queryClientGetAllData}>
    <TodoApp />
  </QueryClientProvider>
);

export default App;
