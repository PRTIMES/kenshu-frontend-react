import { Suspense } from "react";
import { useListTasks } from "./generated";
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

export const App = () => {
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
