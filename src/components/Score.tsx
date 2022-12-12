import './Score.css';

export const Score = (props) => {
  return (
    <div className="single-score">
      <span>{props.rank}</span>
      <span>{props.name}</span>
      <span>{props.time}</span>
      <span>{props.turns}</span>
    </div>
  );
};
