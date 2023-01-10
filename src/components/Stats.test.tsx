import { describe, expect, it, vitest } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { Stats } from './Stats';
import dayjs from 'dayjs';

const finishedGameStatsProps = {
  turns: 5,
  startTime: 10,
  gameFinished: true,
  closeGameHandler: () => {},
};

const activeGameStatsProps = {
  turns: 123,
  startTime: dayjs(0).subtract(3, 'minute').valueOf(),
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
    vitest.setSystemTime(0);
    render(<Stats {...activeGameStatsProps} />);
    act(() => {
      vitest.advanceTimersByTime(5000);
    });
    const turns = screen.getByTestId('turns');
    const gameTime = screen.getByTestId('game-time');
    expect(turns).toHaveTextContent('Turns: 123');
    expect(gameTime).toHaveTextContent('Game time: 03 minutes 05 seconds');
  });
});
