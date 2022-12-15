import { Level, Theme } from '../store/settings-context';

const randomCardNumbers = (availableCards: number, cardsAmount: number) => {
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

export const prepareCards = async (difficultyLevel: Level, theme: Theme) => {
  let preparedCards;
  let availableCards;
  let cardsAmount;

  switch (difficultyLevel) {
    case 'childish':
      cardsAmount = 3;
      break;
    case 'normal':
      cardsAmount = 8;
      break;
    case 'insane':
      cardsAmount = 20;
      break;
    default:
      cardsAmount = 0;
  }

  switch (theme) {
    case 'pokemon':
      availableCards = 904;
      break;
    case 'rickAndMorty':
      availableCards = 825;
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
        import.meta.env.VITE_CATAPI_KEY
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
