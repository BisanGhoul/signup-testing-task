import { rest } from 'msw';

export const handlers = [
  // Define a POST request handler
  rest.post('/your-url', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'Mock response' })
    );
  }),
];
