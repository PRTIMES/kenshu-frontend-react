import { setupServer } from 'msw/node';
import { RestHandler } from 'msw';

export const setupMockServer = (handlers: RestHandler[]) =>
  setupServer(...handlers);
