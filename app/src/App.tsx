import classNames from "./App.module.css";
import { StrictMode } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

// usequeryの非同期関数
const fetchList = () =>
  fetch("http://localhost:8000/api/tasks").then((res) => res.json());

export const App = () => {
  const queryClient = useQueryClient();

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
  });

  const Refetch = async () => {
    await queryClient.refetchQueries();
  };

  //dataが入っているかの判定
  if (isLoading || !data) return <p>Loading...</p>;
  return (
    <StrictMode>
      {/* タスクの追加ボタン */}
      <ul className={classNames.heading}>
        <button
          className={classNames.button}
          onClick={() => {
            Refetch;
            mutation.mutate();
          }}
        >
          タスクの追加
        </button>
        {/* データの表示 */}
        {data.tasks.map((task) => (
          <li className={classNames.title} key={task.id}>
            {task.title}
          </li>
        ))}
      </ul>
    </StrictMode>
  );
};
