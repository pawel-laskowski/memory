import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Settings } from './Settings';
import { SettingsProvider } from '../store/settings-context';

// @ts-ignore
ReactDOM.createPortal = (node) => node;

const settingsProps = {
  onClose: vitest.fn(),
  startGameHandler: vitest.fn(),
  closeSettingsHandler: vitest.fn(),
};

const renderSettings = () => {
  render(
    <SettingsProvider>
      <Settings {...settingsProps} />
    </SettingsProvider>
  );
};

describe('Settings', () => {
  it("should display error message when them isn't chosen and 'Start Game!' was clicked", () => {
    renderSettings();
    const insaneLevelButton = screen.getByText('Insane');
    fireEvent.click(insaneLevelButton);
    fireEvent.click(screen.getByText('Start Game!'));

    const errorMessage = screen.getByText(
      'Please select your theme and difficulty level!'
    );

    expect(insaneLevelButton).toHaveClass('active');
    expect(errorMessage).toBeInTheDocument();
  });
  it("should display error message when difficulty level isn't chosen and 'Start Game!' was clicked", () => {
    renderSettings();
    const pokemonThemeImg = screen.getByAltText('pokemon');
    fireEvent.click(pokemonThemeImg);
    fireEvent.click(screen.getByText('Start Game!'));

    const errorMessage = screen.getByText(
      'Please select your theme and difficulty level!'
    );

    expect(errorMessage).toBeInTheDocument();
  });
  it("should fire 'startGameHandler' and 'closeSettingsHandler' when theme and difficulty level are chosen and 'Start Game!' was clicked", () => {
    renderSettings();
    fireEvent.click(screen.getByAltText('kitties'));
    fireEvent.click(screen.getByText('Childish'));
    fireEvent.click(screen.getByText('Start Game!'));

    expect(settingsProps.startGameHandler).toHaveBeenCalled();
    expect(settingsProps.closeSettingsHandler).toHaveBeenCalled();
  });
});
