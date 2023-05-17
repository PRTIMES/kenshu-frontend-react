import ReactDOM from "react-dom/client";
import { App } from "./App";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Axios from "axios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      staleTime: Infinity,
    },
  },
});
Axios.defaults.baseURL = "http://localhost:8000";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
