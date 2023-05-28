import classNames from "./App.module.css";
import { StrictMode, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

// usequeryの非同期関数
const fetchList = () =>
  fetch("http://localhost:8000/api/tasks").then((res) => res.json());

const EditForm = ({ id, taskId, taskTitle, updateTask, setText }) => {
  if (id === taskId) {
    return (
      <StrictMode>
        <form onSubmit={(e) => updateTask(e, taskId)}>
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

  const updateMutation = useMutation({
    mutationFn: (taskId) => {
      return axios({
        method: "patch",
        url: `http://localhost:8000/api/tasks/${taskId}`,
        data: { title: text, finishedAt: now },
      });
    },
    onSuccess: () => {
      mutation.mutate();
    },
  });

  const updateTask = (e, taskId) => {
    e.preventDefault();
    setId(null);
    updateMutation.mutate(taskId);
  };

  //dataが入っているかの判定
  if (isLoading || !data) return <p>Loading...</p>;

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
        {/* データの表示 */}
        {data.tasks.map((task) => (
          <li className={classNames.title} key={task.id}>
            {task.title}
            <button
              className={classNames.updateButton}
              onClick={() => setId(task.id)}
            >
              {/* {updateText(task.id, task.title)} */}
              <EditForm
                id={id}
                taskId={task.id}
                taskTitle={task.title}
                setText={setText}
                updateTask={updateTask}
              />
              編集
            </button>
          </li>
        ))}
      </ul>
    </StrictMode>
  );
};
