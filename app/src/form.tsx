import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createTask } from "./fetcher.tsx";
import { SlNote } from "react-icons/sl";

export const Form = () => {
  const [inputText, setInputText] = useState<string>("");
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value);
    console.log("text was changed", inputText);
  }

  const mutation = useMutation({
    mutationFn: createTask
  });
  const handleSubmit = (): void => {
    console.log("form was submitted");
    mutation.mutate();
  }

  return (
    <form className="my-[3%] mx-[3%]">
      <input
        name="task-title"
        placeholder="enter your task"
        value={inputText}
        className="border-2 px-[3%] py-[1%] text-lg w-[500px] my-[1%]  border-comment rounded-md"
        onChange={(e) => { handleInput(e) }}
      />
      <button
        type="submit"
        className="ml-[3%] bg-orange text-lg text-white px-[3%] py-[1%] rounded-md"
        onClick={() => { handleSubmit() }}
      >
        create!
      </button>
    </form>
  )
};

