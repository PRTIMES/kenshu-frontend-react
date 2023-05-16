import { useListTasks } from "./generated";
import classNames from "./App.module.css";

export const App = () => {
  const { data, isFetched, error } = useListTasks();
  console.log(data);

  return <h1 className={classNames.heading}>Hello React!</h1>;
};
