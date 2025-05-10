import { rest } from 'msw';

export const handlers = [
  // Define a POST request handler
  rest.post('/your-url', (req, res, ctx) => {
    // You can also check request body, headers, etc. here
    return res(
      ctx.status(200),
      ctx.json({ message: 'Mock response' })
    );
  }),
];
