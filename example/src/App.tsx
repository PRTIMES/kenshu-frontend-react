import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { TopPage } from './components/TopPage';
import { Suspense } from 'react';
import './styles/global.css';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<p aria-busy='true'>loading...</p>}>
        <TopPage />
      </Suspense>
    </QueryClientProvider>
  );
};
