export const randomCardNumbers = (
  availableCards: number,
  cardsAmount: number
) => {
  const cardNumbers: string[] = [];

  for (let index = 0; index < cardsAmount; ) {
    const newNumber = (Math.random() * availableCards + 1).toFixed();
    if (!cardNumbers.includes(newNumber)) {
      cardNumbers.push(newNumber);
      index++;
    }
  }

  return cardNumbers;
};
