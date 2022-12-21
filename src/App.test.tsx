import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom';

import { App } from './App';

// @ts-ignore
ReactDOM.createPortal = (node) => node;

const renderApp = () => {
  render(<App></App>);
};

describe('App', () => {
  it('should show Scoreboard when trophy is clicked', () => {
    renderApp();
    fireEvent.click(screen.getByAltText('trophy'));
    expect(screen.getByText('Best players')).toBeInTheDocument();
  });

  it('should hide Scoreboard when onClose is clicked', () => {
    renderApp();
    fireEvent.click(screen.getByAltText('trophy'));
    const scoreboardHeader = screen.getByText('Best players');
    fireEvent.click(screen.getByText('Close'));
    expect(scoreboardHeader).not.toBeInTheDocument();
  });

  it("should show Settings when 'Start New Game' button is clicked", () => {
    renderApp();
    fireEvent.click(screen.getByText('Start New Game'));
    expect(screen.getByTestId('settings')).toBeInTheDocument();
  });

  it('should hide Settings when onClose is clicked', () => {
    renderApp();
    fireEvent.click(screen.getByText('Start New Game'));
    const settings = screen.getByTestId('settings');
    fireEvent.click(screen.getByTestId('backdrop'));
    expect(settings).not.toBeInTheDocument();
  });

  it("should show Game when 'Start Game!' button in settings modal is clicked", () => {
    renderApp();
    //open settings modal
    fireEvent.click(screen.getByText('Start New Game'));
    // select theme and difficulty level
    fireEvent.click(screen.getByAltText('pokemon'));
    fireEvent.click(screen.getByText('Normal'));

    fireEvent.click(screen.getByText('Start Game!'));

    const game = screen.getByTestId('game');
    expect(game).toBeInTheDocument();

    //open settings modal
    fireEvent.click(screen.getByText('Start New Game'));
    expect(game).not.toBeInTheDocument();
  });

  it('should hide Game after open settings modal', () => {
    renderApp();
    //open settings modal
    fireEvent.click(screen.getByText('Start New Game'));
    // select theme and difficulty level
    fireEvent.click(screen.getByAltText('pokemon'));
    fireEvent.click(screen.getByText('Normal'));
    fireEvent.click(screen.getByText('Start Game!'));
    const game = screen.getByTestId('game');

    //reopen settings modal
    fireEvent.click(screen.getByText('Start New Game'));
    expect(game).not.toBeInTheDocument();
  });
});
