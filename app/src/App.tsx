import { Suspense } from 'react';
import { Tasks } from './components/Tasks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { k } from '@kuma-ui/core';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <k.main maxWidth={500} mx='auto' pt={32}>
        <Suspense fallback={<p>loading!!</p>}>
          <Tasks />
        </Suspense>
      </k.main>
    </QueryClientProvider>
  );
};
