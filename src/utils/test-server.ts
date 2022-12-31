import { rest } from 'msw';
import { setupServer } from 'msw/node';

const Scores = [
  {
    difficultyLevel: 'childish',
    gameTime: 5000,
    name: 'PlayerChild',
    turns: 5,
  },
  {
    difficultyLevel: 'normal',
    gameTime: 50000,
    name: 'PlayerNormal',
    turns: 10,
  },
  {
    difficultyLevel: 'insane',
    gameTime: 500000,
    name: 'PlayerInsane',
    turns: 15,
  },
];

const handlers = [
  rest.get(import.meta.env.VITE_FIREBASE_URL, (req, res, ctx) => {
    return res(ctx.json(Scores));
  }),

  rest.post(import.meta.env.VITE_FIREBASE_URL, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

export const server = setupServer(...handlers);
