import { useEffect, useState } from 'react';
import { Card } from './components/Cards';
import './App.css';

import p1 from './assets/cards/p1.png';
import p2 from './assets/cards/p2.png';
import p3 from './assets/cards/p3.png';
import p4 from './assets/cards/p4.png';
import p5 from './assets/cards/p5.png';
import p6 from './assets/cards/p6.png';

const dummyData = [
  { src: p1, matched: false },
  { src: p2, matched: false },
  { src: p3, matched: false },
  { src: p4, matched: false },
  { src: p5, matched: false },
  { src: p6, matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const shuffleCards = () => {
    const shuffledCards = [...dummyData, ...dummyData]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne === choiceTwo) {
        setCards((prevCards) => {
          return prevCards.map((card) =>
            card.src === choiceOne ? { ...card, matched: true } : card
          );
        });
      }
      resetTurn();
    }
  }, [choiceOne, choiceTwo]);

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card card={card} key={card.id} handleChoice={handleChoice} />
        ))}
      </div>
    </div>
  );
}

export default App;
