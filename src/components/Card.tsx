import { useContext } from 'react';
import { SettingsContext } from '../store/settings-context';
import './Card.css';
import { CardType } from './Game';

type CardPropsType = {
  card: CardType;
  key: number;
  handleChoice: (card: CardType) => void;
  flipped: boolean;
  disabled: boolean;
  gameFinished: boolean;
};

export const Card = (props: CardPropsType) => {
  const settingsCtx = useContext(SettingsContext);

  const handleClick = () => {
    if (!props.disabled) {
      props.handleChoice(props.card);
    }
  };

  const flippedClassName = props.gameFinished
    ? 'spin flipped'
    : props.flipped
    ? 'flipped'
    : '';

  return (
    <div
      className={`card ${props.disabled ? 'disabled' : ''}`}
      data-testid={props.card.src}
    >
      <div data-testid="card-flipper" className={flippedClassName}>
        <img
          className="front"
          src={props.card.src}
          alt="card front"
          data-testid={`front${props.card.src}`}
        />
        <img
          className="back"
          src={`/images/${settingsCtx.theme}.png`}
          alt="card back"
          onClick={handleClick}
          data-testid={`back${props.card.src}`}
        />
      </div>
    </div>
  );
};
