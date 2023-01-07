import ReactDOM from 'react-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Scoreboard } from './Scoreboard';

// @ts-ignore
ReactDOM.createPortal = (node) => node;

describe('Scoreboard', () => {
  it('should render best scores for chosen difficulty level after clicking on span', async () => {
    render(<Scoreboard onClose={() => {}} />);
    const normalLevelSpan = screen.getByText('Normal');
    expect(normalLevelSpan).not.toHaveClass('scoreboard__level--active');
    fireEvent.click(normalLevelSpan);
    expect(normalLevelSpan).toHaveClass('scoreboard__level--active');
    const normalPlayer = await screen.findByText('PlayerNormal');
    expect(normalPlayer).toBeInTheDocument();
  });
});