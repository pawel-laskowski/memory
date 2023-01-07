import './Score.css';
import { ScoreForDisplayType } from './Scoreboard';

interface ScorePropsType extends ScoreForDisplayType {
  key: number;
}

const formatRank = (index: number) => {
  let suffix;
  switch (index) {
    case 1:
      suffix = 'st';
      break;
    case 2:
      suffix = 'nd';
      break;
    case 3:
      suffix = 'rd';
      break;
    default:
      suffix = 'th';
  }

  return index + suffix;
};

export const Score = (props: ScorePropsType) => {
  return (
    <div className="single-score">
      <span>{formatRank(props.rank)}</span>
      <span>{props.name}</span>
      <span>{props.time}</span>
      <span>{props.turns}</span>
    </div>
  );
};
