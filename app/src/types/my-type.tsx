export type Task = {
  id: string
  title: string
  createdAt: string
  finishedAt: string | null
}

export type stringToVoid = (param: string) => void;
export type stringToString = (param: string) => string;
