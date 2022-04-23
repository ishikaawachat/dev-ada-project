
import './App.css';
import { Button } from "./components/Button.js";
import { ToggleButton } from "./components/ToggleButton.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Blast to the Past! Pick a genre.
        </p>
        <ToggleButton />
        
        
      </header>
    </div>
  );
}

export default App;
