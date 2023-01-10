import { describe, it, expect, vitest } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Card } from './Card';

const card = {
  src: 'abc',
  matched: true,
  id: 1,
};

const cardPorps = {
  card,
  key: 1,
  handleChoice: vitest.fn(),
  flipped: true,
  disabled: false,
  gameFinished: true,
};

const disabledCardProps = {
  ...cardPorps,
  flipped: false,
  disabled: true,
  gameFinished: false,
};

describe('Card', () => {
  it('should spin cards when game is finished', () => {
    render(<Card {...cardPorps} />);
    expect(screen.getByTestId('card-flipper')).toHaveClass('spin flipped');
  });

  it('should block onClick when disabled prop is true', () => {
    render(<Card {...disabledCardProps} />);
    fireEvent.click(screen.getByAltText('card back'));
    expect(disabledCardProps.handleChoice).not.toHaveBeenCalled();
  });
});
