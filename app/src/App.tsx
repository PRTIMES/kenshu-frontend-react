import classNames from "./App.module.css";
import { StrictMode } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchList = () =>
  fetch("http://localhost:8000/api/tasks").then((res) => res.json());

export const App = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchList,
  });

  if (isLoading || !data) return <p>Loading...</p>;

  return (
    <StrictMode>
      <ul className={classNames.heading}>
        {data.tasks.map((task) => (
          <li className={classNames.title} key={task.id}>
            {task.title}
          </li>
        ))}
      </ul>
    </StrictMode>
  );
};
