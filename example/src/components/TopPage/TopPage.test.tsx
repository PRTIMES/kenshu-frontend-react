import { PropsWithChildren, Suspense } from 'react';
import { TopPage } from '.';
import { act, render, waitFor, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setupMockServer } from '../../__tests__/msw';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';

const mockHandlers = [
  rest.get('http://localhost:8000/api/tasks', (_, res, ctx) =>
    res(
      ctx.json({
        tasks: [
          {
            id: '1',
            title: 'Get up',
            createdAt: '2021-01-01T00:00:00.000Z',
            finishedAt: '2021-01-01T00:00:00.000Z',
          },
          {
            id: '2',
            title: 'Eat breakfast',
            createdAt: '2021-01-01T00:00:00.000Z',
            finishedAt: null,
          },
          {
            id: '3',
            title: 'Go to school',
            createdAt: '2021-01-01T00:00:00.000Z',
            finishedAt: null,
          },
        ],
      }),
    ),
  ),
];

const mockServer = setupMockServer(mockHandlers);

const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={new QueryClient()}>
    <Suspense fallback={<p>loading</p>}>{children}</Suspense>
  </QueryClientProvider>
);

describe('TopPage', () => {
  beforeAll(() => void mockServer.listen());
  afterEach(() => void mockServer.resetHandlers());
  afterAll(() => void mockServer.close());

  it('HTML とスタイルが変わらないこと', async () => {
    const { queryByText, asFragment } = render(<TopPage />, { wrapper });
    await waitFor(() => expect(queryByText('loading')).toBeNull());

    expect(asFragment()).toMatchSnapshot();
  });

  it('タスクが表示されていること', async () => {
    const { queryByText, getByRole } = render(<TopPage />, {
      wrapper,
    });
    await waitFor(() => expect(queryByText('loading')).toBeNull());

    expect(getByRole('list')).toBeDefined();
    expect(within(getByRole('list')).getByText('Get up')).toBeDefined();
  });

  it('タスクの作成ボタンが表示されていること', async () => {
    const { queryByText, getByRole } = render(<TopPage />, { wrapper });
    await waitFor(() => expect(queryByText('loading')).toBeNull());

    expect(getByRole('button', { name: 'タスクを追加' })).toBeDefined();
  });

  it('タスクの削除ボタンが表示されていること', async () => {
    const { queryByText, getAllByRole } = render(<TopPage />, { wrapper });
    await waitFor(() => expect(queryByText('loading')).toBeNull());

    expect(getAllByRole('button', { name: '削除' })).toHaveLength(3);
  });

  it('タスクのタイトルをクリックすると編集フォームが表示されること', async () => {
    const { queryByText, getByRole } = render(<TopPage />, { wrapper });
    await waitFor(() => expect(queryByText('loading')).toBeNull());

    await act(() =>
      userEvent.click(
        getByRole('button', { name: 'Get up のタイトルを編集する' }),
      ),
    );
    expect(getByRole('textbox')).toHaveValue('Get up');
  });
});
