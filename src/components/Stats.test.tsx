import { describe, it, expect } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';

import ReactDOM from 'react-dom';
import { Stats } from './Stats';
import dayjs from 'dayjs';

// @ts-ignore
ReactDOM.createPortal = (node) => node;

const finishedGameStatsProps = {
  turns: 5,
  startTime: 10,
  gameFinished: true,
  closeGameHandler: () => {},
};

const activeGametatsProps = {
  turns: 123,
  startTime: dayjs().subtract(3, 'minute').valueOf(),
  gameFinished: false,
  closeGameHandler: () => {},
};

describe('Stats', () => {
  it('should open WinnerForm when gameFinished prop is true', () => {
    vitest.useFakeTimers();
    render(<Stats {...finishedGameStatsProps} />);
    act(() => {
      vitest.runOnlyPendingTimers();
    });
    expect(screen.getByTestId('winner-form')).toBeInTheDocument();
    vitest.runAllTimers();
  });

  it('should display correct turns and game time', () => {
    vitest.useFakeTimers();
    render(<Stats {...activeGametatsProps} />);
    act(() => {
      vitest.runOnlyPendingTimers();
    });
    const turns = screen.getByTestId('turns');
    const gameTime = screen.getByTestId('game-time');
    expect(turns).toHaveTextContent('Turns: 123');
    // ERROR
    expect(gameTime).toHaveTextContent('Game time: 03 minutes 00 seconds');
    vitest.runAllTimers();
  });
});
