import ReactDOM from 'react-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { CardType, Game } from './Game';
import { Level, SettingsContext, Theme } from '../store/settings-context';

// @ts-ignore
ReactDOM.createPortal = (node) => node;

vitest.mock('../helpers/random-numbers', () => ({
  randomCardNumbers: () => ['1', '2'],
}));

const mockSettingsContext = {
  theme: Theme.POKEMON,
  difficultyLevel: Level.CHILDISH,
  changeTheme: vitest.fn(),
  changeDifficultyLevel: vitest.fn(),
};

const renderGame = () => {
  render(
    <SettingsContext.Provider value={mockSettingsContext}>
      <Game closeGameHandler={vitest.fn()} />
    </SettingsContext.Provider>
  );
};

const getSrcMock = (index: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`;

describe('Game', () => {
  it('should remain cards visible after 1000 when valid choice is correct', async () => {
    vitest.useFakeTimers();
    renderGame();
    const backsOfFirstPair = await screen.findAllByTestId(
      `back${getSrcMock(1)}`
    );
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
    const backsOfFirstPair = await screen.findAllByTestId(
      `back${getSrcMock(1)}`
    );
    const backsOfSecondPair = await screen.findAllByTestId(
      `back${getSrcMock(2)}`
    );
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
    const backsOfFirstPair = await screen.findAllByTestId(
      `back${getSrcMock(1)}`
    );
    const backsOfSecondPair = await screen.findAllByTestId(
      `back${getSrcMock(2)}`
    );
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
    const backsOfFirstPair = await screen.findAllByTestId(
      `back${getSrcMock(1)}`
    );
    const backsOfSecondPair = await screen.findAllByTestId(
      `back${getSrcMock(2)}`
    );
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
    const backsOfFirstPair = await screen.findAllByTestId(
      `back${getSrcMock(1)}`
    );
    const backsOfSecondPair = await screen.findAllByTestId(
      `back${getSrcMock(2)}`
    );
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
