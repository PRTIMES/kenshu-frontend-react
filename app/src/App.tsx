import { useListTasks } from "./generated";
import { style } from "@macaron-css/core";

export const App = () => {
  const { data, isFetching, error } = useListTasks();

  if (isFetching) return <div>Now Loading...</div>;

  return (
    <main>
      <h1 className={style({ color: "red" })}>Task list</h1>
      <ul>
        {data.data.tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </main>
  );
};
