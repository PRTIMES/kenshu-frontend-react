import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getAllData, createTask } from './fetcher'

export const queryClientGetAllData = new QueryClient(
  {
    defaultOptions: {
      queries: {
        queryFn: getAllData,
      },
    },
  }
);
