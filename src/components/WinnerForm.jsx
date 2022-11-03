import { useRef, useState } from 'react';
import { Modal } from '../UI/Modal';
import './WinnerForm.css';

export const WinnerForm = (props) => {
  const nameRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const winnerName = nameRef.current.value.trim();
    if (winnerName.length > 0) {
      const winnerData = {
        name: winnerName,
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
        <p>Congratulations! You won the game!</p>
        <p>Please type your name to save your score.</p>
        <input className="winner-form__input" type="text" ref={nameRef} />
        <button>Confirm</button>
      </form>
      {isLoading && <p>Sending data...</p>}
      {error && <p>{error}</p>}
    </Modal>
  );
};
