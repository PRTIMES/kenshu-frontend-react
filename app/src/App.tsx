import classNames from "./App.module.css";
import { StrictMode, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

const fetchList = () =>
  fetch("http://localhost:8000/api/tasks").then((res) => res.json());

export const App = () => {
  const queryClient = useQueryClient();
  const [id, setId] = useState("");
  const [text, setText] = useState("");
  const now = new Date();

  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchList,
  });

  const mutation = useMutation({
    mutationFn: () => {
      return axios.post("http://localhost:8000/api/tasks");
    },
    onSuccess: () => {
      queryClient.refetchQueries(["tasks"]);
    },
  });

  if (isLoading || !data) return <p>Loading...</p>;

  const updateTask = (taskId) => {
    axios({
      method: "patch",
      url: `http://localhost:8000/api/tasks/${taskId}`,
      data: { title: text, finishedAt: now },
    });
  };

  const updateText = (taskId, taskTitle) => {
    if (id === taskId) {
      return (
        <StrictMode>
          <form onSubmit={updateTask(taskId)}>
            <input
              type="text"
              placeholder={taskTitle}
              onChange={(event) => setText(event.target.value)}
            ></input>
          </form>
        </StrictMode>
      );
    }
  };

  return (
    <StrictMode>
      <ul className={classNames.heading}>
        <button
          className={classNames.button}
          onClick={() => {
            mutation.mutate();
          }}
        >
          タスクの追加
        </button>
        {data.tasks.map((task) => (
          <li className={classNames.title} key={task.id}>
            {task.title}
            <button
              className={classNames.updateButton}
              onClick={() => setId(task.id)}
            >
              {updateText(task.id, task.title)}
              編集
            </button>
          </li>
        ))}
      </ul>
    </StrictMode>
  );
};
