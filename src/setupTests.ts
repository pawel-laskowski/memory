/// <reference types="vitest/globals" />
import 'whatwg-fetch';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { server } from './utils/test-server';
import { afterAll, afterEach, beforeAll } from 'vitest';
import ReactDOM from 'react-dom';

// @ts-ignore
ReactDOM.createPortal = (node) => node;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
