import './Card.css';

import back from '../assets/cards/back.png';

export const Card = (props) => {
  const handleClick = () => {
    if (!props.disabled) {
      props.handleChoice(props.card);
    }
  };
  return (
    <div className="card">
      <div className={props.flipped ? 'flipped' : ''}>
        <img className="front" src={props.card.src} alt="card front" />
        <img
          className="back"
          src={back}
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};
