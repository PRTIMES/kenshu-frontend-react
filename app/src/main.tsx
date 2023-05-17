import ReactDOM from 'react-dom/client';
import { App } from './App';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './styles/global.css';
import Axios from "axios";

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
Axios.defaults.baseURL = "http://localhost:8000";

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
