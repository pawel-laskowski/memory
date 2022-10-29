import { useContext, useEffect, useState } from 'react';
import { Card } from './components/Card';
import { prepareCards } from './helpers/cards-data';
import { Settings } from './components/Settings';
import { SettingsContext } from './store/settings-context';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const settingsCtx = useContext(SettingsContext);
  const [openSettings, setOpenSettings] = useState(false);

  const openSettingsHandler = () => {
    setOpenSettings(true);
  };
  const closeSettingsHandler = () => {
    setOpenSettings(false);
  };

  const shuffleCards = async () => {
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
    closeSettingsHandler();
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

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={openSettingsHandler}>New Game</button>
      {openSettings && (
        <Settings onClose={closeSettingsHandler} shuffleCards={shuffleCards} />
      )}
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
