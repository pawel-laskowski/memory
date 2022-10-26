const randomCardNumbers = (availableCards, cardsAmount) => {
  const cardNumbers = [];

  for (let index = 0; index < cardsAmount; ) {
    const newNumber = (Math.random() * availableCards).toFixed();
    if (!cardNumbers.includes(newNumber)) {
      cardNumbers.push(newNumber);
      index++;
    } else {
      return;
    }
  }

  return cardNumbers;
};

export const prepareCards = async (cardsAmount, theme) => {
  let preparedCards;
  let availableCards;

  switch (theme) {
    case 'pokemon':
      availableCards = 905;
      break;
    case 'rickAndMorty':
      availableCards = 183;
      break;
    default:
      availableCards = 0;
  }

  if (theme === 'pokemon') {
    preparedCards = randomCardNumbers(availableCards, cardsAmount).map(
      (number) => ({
        src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`,
        matched: false,
      })
    );
  } else if (theme === 'rickAndMorty') {
    preparedCards = randomCardNumbers(availableCards, cardsAmount).map(
      (number) => ({
        src: `https://rickandmortyapi.com/api/character/avatar/${number}.jpeg`,
        matched: false,
      })
    );
  } else if (theme === 'kitties') {
    await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=${cardsAmount}&api_key=${
        import.meta.env
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        preparedCards = data.map((kitti) => ({
          src: kitti.url,
          matched: false,
        }));
      });
  }

  return preparedCards;
};
