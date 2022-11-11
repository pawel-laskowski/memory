import { useContext } from 'react';
import { SettingsContext } from '../store/settings-context';
import './Card.css';

export const Card = (props) => {
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
    <div className="card">
      <div className={flippedClassName}>
        <img className="front" src={props.card.src} alt="card front" />
        <img
          className="back"
          src={`/images/${settingsCtx.theme}.png`}
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};
