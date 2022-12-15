import './Score.css';
import { ScoreForDisplayType } from './Scoreboard';

interface ScorePropsType extends ScoreForDisplayType {
  key: number;
}

export const Score = (props: ScorePropsType) => {
  return (
    <div className="single-score">
      <span>{props.rank}</span>
      <span>{props.name}</span>
      <span>{props.time}</span>
      <span>{props.turns}</span>
    </div>
  );
};
