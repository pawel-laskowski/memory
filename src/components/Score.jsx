export const Score = (props) => {
  return (
    <div>
      <span>{props.rank}</span>
      <span>{props.name}</span>
      <span>{props.turns}</span>
      <span>{props.time}</span>
    </div>
  );
};
