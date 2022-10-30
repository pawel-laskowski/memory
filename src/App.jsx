import { Game } from './components/Game';
import { SettingsProvider } from './store/settings-context';
import './App.css';

function App() {
  return (
    <SettingsProvider>
      <div className="App">
        <h1>Memory Game</h1>
        <Game />
      </div>
    </SettingsProvider>
  );
}

export default App;
