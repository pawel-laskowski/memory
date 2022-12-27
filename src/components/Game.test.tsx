import ReactDOM from 'react-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { CardType, Game } from './Game';

// @ts-ignore
ReactDOM.createPortal = (node) => node;

vitest.mock(
  '../helpers/cards-data',
  (): { prepareCards: () => Omit<CardType, 'id'>[] } => ({
    prepareCards: () => [
      { src: '1', matched: false },
      { src: '2', matched: false },
    ],
  })
);

const renderGame = () => {
  render(<Game closeGameHandler={vitest.fn()} />);
};

describe('Game', () => {
  it('should remain cards visible after 1000 when valid choice is correct', async () => {
    vitest.useFakeTimers();
    renderGame();
    const backsOfFirstPair = await screen.findAllByTestId('back1');
    backsOfFirstPair.forEach((card) => {
      fireEvent.click(card);
    });

    const cards = await screen.findAllByTestId('card-flipper');
    let flippedCards = 0;
    cards.forEach((card) => {
      if (card.className === 'flipped') {
        flippedCards++;
      }
    });

    expect(flippedCards).toEqual(2);

    act(() => {
      vitest.advanceTimersByTime(2000);
    });

    const newCards = await screen.findAllByTestId('card-flipper');
    flippedCards = 0;
    newCards.forEach((card) => {
      if (card.className === 'flipped') {
        flippedCards++;
      }
    });

    expect(flippedCards).toEqual(2);
  });

  it('should hide cards after wrong choices', async () => {
    vitest.useFakeTimers();
    renderGame();
    const backsOfFirstPair = await screen.findAllByTestId('back1');
    const backsOfSecondPair = await screen.findAllByTestId('back2');
    fireEvent.click(backsOfFirstPair[0]);
    fireEvent.click(backsOfSecondPair[0]);

    const cards = await screen.findAllByTestId('card-flipper');
    let flippedCards = 0;
    cards.forEach((card) => {
      if (card.className === 'flipped') {
        flippedCards++;
      }
    });

    expect(flippedCards).toEqual(2);

    act(() => {
      vitest.advanceTimersByTime(2000);
    });

    const newCards = await screen.findAllByTestId('card-flipper');
    flippedCards = 0;
    newCards.forEach((card) => {
      if (card.className === 'flipped') {
        flippedCards++;
      }
    });

    expect(flippedCards).toEqual(0);
  });

  it('should disable cards for 1000 after make wrong choices', async () => {
    vitest.useFakeTimers();
    renderGame();
    const backsOfFirstPair = await screen.findAllByTestId('back1');
    const backsOfSecondPair = await screen.findAllByTestId('back2');
    fireEvent.click(backsOfFirstPair[0]);
    fireEvent.click(backsOfSecondPair[0]);

    const cards = await screen.findAllByTestId('card-flipper');
    let flippedCards = 0;
    cards.forEach((card) => {
      if (card.className === 'flipped') {
        flippedCards++;
      }
    });

    expect(flippedCards).toEqual(2);

    act(() => {
      vitest.advanceTimersByTime(500);
    });

    fireEvent.click(backsOfSecondPair[1]);

    const newCards = await screen.findAllByTestId('card-flipper');
    flippedCards = 0;
    newCards.forEach((card) => {
      if (card.className === 'flipped') {
        flippedCards++;
      }
    });

    expect(flippedCards).toEqual(2);
  });

  it("shouldn't disable cards after making proper choices", async () => {
    vitest.useFakeTimers();
    renderGame();
    const backsOfFirstPair = await screen.findAllByTestId('back1');
    const backsOfSecondPair = await screen.findAllByTestId('back2');
    fireEvent.click(backsOfFirstPair[0]);
    fireEvent.click(backsOfFirstPair[1]);

    const cards = await screen.findAllByTestId('card-flipper');
    let flippedCards = 0;
    cards.forEach((card) => {
      if (card.className === 'flipped') {
        flippedCards++;
      }
    });

    expect(flippedCards).toEqual(2);

    act(() => {
      vitest.advanceTimersByTime(500);
    });

    fireEvent.click(backsOfSecondPair[0]);

    const newCards = await screen.findAllByTestId('card-flipper');
    flippedCards = 0;
    newCards.forEach((card) => {
      if (card.className === 'flipped') {
        flippedCards++;
      }
    });

    expect(flippedCards).toEqual(3);
  });

  it('should set game as finished when all cards matched', async () => {
    vitest.useFakeTimers();
    renderGame();
    const backsOfFirstPair = await screen.findAllByTestId('back1');
    const backsOfSecondPair = await screen.findAllByTestId('back2');
    fireEvent.click(backsOfFirstPair[0]);
    fireEvent.click(backsOfFirstPair[1]);
    fireEvent.click(backsOfSecondPair[0]);
    fireEvent.click(backsOfSecondPair[1]);

    act(() => {
      vitest.advanceTimersByTime(2500);
    });

    const winnerForm = await screen.findByTestId('winner-form');
    expect(winnerForm).toBeInTheDocument();
  });
});
