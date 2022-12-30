import ReactDOM from 'react-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { WinnerForm } from './WinnerForm';
import { Level } from '../store/settings-context';
import { userEvent } from '../utils/test-utils';

// @ts-ignore
ReactDOM.createPortal = (node) => node;

const winnerFormProps = {
  gameTime: 500,
  difficultyLevel: Level.NORMAL,
  turns: 10,
  onClose: vitest.fn(),
};

const renderWinnerForm = () => {
  render(<WinnerForm {...winnerFormProps} />);
};

describe('WinnerForm', () => {
  it('should display error message when entered name is longer than 12 characters', async () => {
    renderWinnerForm();
    const nameInput = screen.getByRole('textbox');
    userEvent.type(nameInput, 'morethan12characters');
    const errorMessage = await screen.findByText(
      "Your typed name can't have more than 12 characters."
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("should display error message when 'Confirm' is clicked and name input is empty", () => {
    renderWinnerForm();
    fireEvent.click(screen.getByText('Confirm'));
    const errorMessage = screen.getByText('Please type your name');
    expect(errorMessage).toBeInTheDocument();
  });

  it("should start sending data when name is typed and 'Confirm' button was clicked", async () => {
    renderWinnerForm();
    const nameInput = screen.getByRole('textbox');

    fireEvent.change(nameInput, { target: { value: 'Name' } });

    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(winnerFormProps.onClose).toHaveBeenCalled();
    });
  });
});
