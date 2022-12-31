/// <reference types="vitest/globals" />
import 'whatwg-fetch';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { server } from './utils/test-server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
