import { useListTasks } from "./generated";
import classNames from "./App.module.css";

export const App = () => {
  const { data, isFetching, error } = useListTasks();
  console.log(data);

  if (isFetching) return <div>Now Loading...</div>;

  return (
    <main>
      <h1>Task list</h1>
      <ul>
        {data.data.tasks.map((task) => (
          <li>{task.title}</li>
        ))}
      </ul>
    </main>
  );
};
