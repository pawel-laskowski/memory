import { useContext, useEffect, useState } from 'react';
import { Card } from './components/Card';
import { prepareCards } from './helpers/cards-data';

import './App.css';
import { SettingsModal } from './components/SettingsModal';
import { SettingsContext } from './store/settings-context';

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const settingsCtx = useContext(SettingsContext);

  const shuffleCards = async () => {
    console.log(settingsCtx);
    const cards = await prepareCards(
      settingsCtx.difficultyLevel,
      settingsCtx.theme
    );
    const shuffledCards = [...cards, ...cards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
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

  // useEffect(() => {
  //   shuffleCards();
  // }, []);

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <SettingsModal />
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>turns: {turns}</p>
    </div>
  );
}

export default App;
