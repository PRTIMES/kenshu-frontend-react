import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getAllData } from './fetcher'

export const queryClientGetAllData = new QueryClient(
  {
    defaultOptions: {
      queries: {
        queryFn: getAllData,
      },
    },
  }
);

