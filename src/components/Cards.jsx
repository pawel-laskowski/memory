import './Card.css';

import back from '../assets/cards/back.png';

export const Card = (props) => {
  const handeClick = () => {
    props.handleChoice(props.card.src);
  };
  return (
    <div className="card">
      <img src={props.card.src} alt="card front" />
      <img src={back} alt="card back" onClick={handeClick} />
    </div>
  );
};
