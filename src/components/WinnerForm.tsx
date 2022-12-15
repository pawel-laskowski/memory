import { useState } from 'react';
import { Level } from '../store/settings-context';
import { Modal } from '../UI/Modal';
import './WinnerForm.css';

type WinnerFormPropsType = {
  gameTime: number;
  difficultyLevel: Level;
  turns: number;
  onClose: () => void;
};

export const WinnerForm = (props: WinnerFormPropsType) => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nameInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const winnerName = e.target.value.trim();
    if (winnerName.length < 13) {
      setName(winnerName);
    } else {
      setError("Your typed name can't have more than 12 characters.");
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.length > 0) {
      const winnerData = {
        name: name,
        difficultyLevel: props.difficultyLevel,
        gameTime: props.gameTime,
        turns: props.turns,
      };

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(import.meta.env.VITE_FIREBASE_URL, {
          method: 'POST',
          body: JSON.stringify(winnerData),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Request failed!');
        }
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);

      props.onClose();
    } else {
      setError('Please type your name');
    }
  };

  return (
    <Modal onClose={props.onClose}>
      <form onSubmit={submitHandler} className="winner-form">
        <h3>Congratulations! You won the game!</h3>
        <p>Please type your name to save your score.</p>
        <input
          className="winner-form__input"
          type="text"
          value={name}
          onChange={nameInputChangeHandler}
        />
        {error && <p className="error">{error}</p>}
        <button>Confirm</button>
        {isLoading && <p>Sending data...</p>}
      </form>
    </Modal>
  );
};
