import { useCallback, useContext, useEffect, useState } from 'react';
import { Card } from './Card';
import { fetchCards } from '../helpers/cards-data';
import { SettingsContext } from '../store/settings-context';
import { Stats } from './Stats';
import { Loader } from '../UI/Loader';
import dayjs from 'dayjs';
import './Game.css';

export type CardType = {
  src: string;
  matched: boolean;
  id: number;
};

type GamePropsType = {
  closeGameHandler: () => void;
};

export const Game = (props: GamePropsType) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [turns, setTurns] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [choiceOne, setChoiceOne] = useState<CardType | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<CardType | null>(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const settingsCtx = useContext(SettingsContext);

  const prepareCards = async () => {
    const cards = await fetchCards(
      settingsCtx.difficultyLevel,
      settingsCtx.theme
    );
    const shuffledCards = [...cards, ...cards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setStartTime(dayjs().valueOf());
    setChoiceOne(null);
    setChoiceTwo(null);
    setGameFinished(false);
  };

  const handleChoice = (card: CardType) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  const handleWrongChoices = useCallback(() => {
    setTimeout(() => {
      resetTurn();
    }, 1000);
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          );
        });
        resetTurn();
      } else {
        handleWrongChoices();
      }
    }
  }, [choiceOne, choiceTwo, handleWrongChoices]);

  useEffect(() => {
    if (cards) {
      const allCardsMatched = cards.every((card) => card.matched === true);
      if (allCardsMatched) {
        setGameFinished(true);
      }
    }
  }, [cards]);

  useEffect(() => {
    prepareCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="game-container" data-testid="game">
      {cards.length > 0 ? (
        <div className={`card-grid card-grid--${settingsCtx.difficultyLevel}`}>
          {cards.map((card) => (
            <Card
              card={card}
              key={card.id}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
              gameFinished={gameFinished}
            />
          ))}
        </div>
      ) : (
        <Loader />
      )}
      {startTime && (
        <Stats
          turns={turns}
          startTime={startTime}
          gameFinished={gameFinished}
          closeGameHandler={props.closeGameHandler}
        />
      )}
    </div>
  );
};
