import classNames from "./App.module.css";
import { StrictMode, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

// usequeryの非同期関数
const fetchList = () =>
  fetch("http://localhost:8000/api/tasks").then((res) => res.json());

export const App = () => {
  const queryClient = useQueryClient();
  const [id, setId] = useState("");
  const [text, setText] = useState("");
  const now = new Date();

  // データ取得
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchList,
  });

  ///　ボタンが押されたらリクエスト送信
  const mutation = useMutation({
    mutationFn: () => {
      return axios.post("http://localhost:8000/api/tasks");
    },
    onSuccess: () => {
      queryClient.refetchQueries(["tasks"]);
    },
  });
  //dataが入っているかの判定
  if (isLoading || !data) return <p>Loading...</p>;

  const updateTask = (e, taskId) => {
    e.preventDefault();
    setId(null);
    axios({
      method: "patch",
      url: `http://localhost:8000/api/tasks/${taskId}`,
      data: { title: text, finishedAt: now },
    }).then(() => {
      mutation.mutate();
    });
  };

  const updateText = (taskId, taskTitle) => {
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

  return (
    <StrictMode>
      {/* タスクの追加ボタン */}
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
              {updateText(task.id, task.title)}
              編集
            </button>
          </li>
        ))}
      </ul>
    </StrictMode>
  );
};
