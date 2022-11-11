import { useContext, useEffect, useState } from 'react';
import { Card } from './Card';
import { prepareCards } from '../helpers/cards-data';
import { SettingsContext } from '../store/settings-context';
import { Stats } from './Stats';
import { Loader } from '../UI/Loader';

import moment from 'moment';
import './Game.css';

export const Game = (props) => {
  const [cards, setCards] = useState(null);
  const [turns, setTurns] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const settingsCtx = useContext(SettingsContext);

  const shuffleCards = async () => {
    const cards = await prepareCards(
      settingsCtx.difficultyLevel,
      settingsCtx.theme
    );
    const shuffledCards = [...cards, ...cards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
    setStartTime(moment().valueOf());
    setChoiceOne(null);
    setChoiceTwo(null);
    setGameFinished(false);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

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
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards) {
      const allCardsMatched = cards.every((card) => card.matched === true);
      if (allCardsMatched) {
        setGameFinished(true);
      }
    }
  }, [cards]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="game-container">
      {cards ? (
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
