import { Game } from './components/Game';
import { SettingsProvider } from './store/settings-context';
import './App.css';
import { Scoreboard } from './components/Scoreboard';

function App() {
  return (
    <SettingsProvider>
      <div className="App">
        <h1>Memory Game</h1>
        <Game />
        <Scoreboard />
      </div>
    </SettingsProvider>
  );
}

export default App;
