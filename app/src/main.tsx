import ReactDOM from 'react-dom/client';
import { App } from './App';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
