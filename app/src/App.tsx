import { Suspense } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useListTasks,
  getListTasksQueryOptions,
  getListTasksQueryKey,
  useCreateTask,
} from "./generated";
import { style } from "@macaron-css/core";
import { Button } from "./Button";

const TodoList = () => {
  const { data } = useListTasks();

  return (
    <ul className={style({ marginTop: "25px", paddingLeft: "0" })}>
      {data.data.tasks.map((task) => (
        <li
          className={style({
            padding: "15px",
            borderBottom: "1px solid #EBEBEB",
            listStyle: "none",
          })}
          key={task.id}
        >
          {task.title}
        </li>
      ))}
    </ul>
  );
};

const createTask = async (mutate) => {
  // const { queryKey, queryFn } = getListTasksQueryOptions();
  // console.log(queryKey, queryFn);
  // await queryClient.prefetchQuery({ queryKey, queryFn });

  const res = await mutate();
  console.log(res);
};

export const App = () => {
  const queryClient = useQueryClient();
  const { queryKey } = getListTasksQueryOptions();

  const { mutate } = useCreateTask({
    mutation: {
      onSuccess: (result) => {
        queryClient.setQueryData(getListTasksQueryKey(), (prevState: any) => {
          const prevTaskList = prevState.data.tasks;
          const nextState = {
            ...prevState,
            data: { tasks: [...prevTaskList, result.data.task] },
          };

          return nextState;
        });
      },
    },
  });

  return (
    <main
      className={style({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#F8F8F8",
      })}
    >
      <div
        className={style({
          width: "40%",
          border: "1px solid #EBEBEB",
          backgroundColor: "#FFFFFF",
          borderRadius: "3px",
        })}
      >
        <h1
          className={style({
            fontSize: "20px",
            fontWeight: "bold",
            paddingBottom: "15px",
            borderBottom: "1px solid #EBEBEB",
            padding: "15px",
          })}
        >
          Todo List
        </h1>
        <Button
          color="netoral"
          size="small"
          className={style({ marginLeft: "15px" })}
          onClick={(e) => {
            e.preventDefault();
            mutate();
          }}
        >
          Create ToDo
        </Button>
        <Suspense fallback={<div>Now Loading...</div>}>
          <TodoList />
        </Suspense>
      </div>
    </main>
  );
};
