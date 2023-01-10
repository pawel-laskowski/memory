import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '../utils/test-utils';
import { Scoreboard } from './Scoreboard';

const renderScoreboard = () => {
  render(<Scoreboard onClose={() => {}} />);
};

describe('Scoreboard', () => {
  it('should render best scores for chosen difficulty level after clicking on span', async () => {
    renderScoreboard();
    const normalLevelSpan = screen.getByText('Normal');
    expect(normalLevelSpan).not.toHaveClass('scoreboard__level--active');
    fireEvent.click(normalLevelSpan);
    expect(normalLevelSpan).toHaveClass('scoreboard__level--active');
    const normalPlayer = await screen.findByText('PlayerNormal');
    expect(normalPlayer).toBeInTheDocument();
  });
});
