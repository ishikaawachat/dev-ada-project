import React, { useState } from 'react'
import './App.css';
import { Button } from "./components/Button.js"
import { ToggleButton } from "./components/ToggleButton.js";
import { Popup } from "./components/Popup.js";

function App() {
  const [buttonPop, setButtonPop] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
      <Button onClick={() => setButtonPop(true)}>Customize Your Recommendations</Button>
        <Popup trigger={buttonPop} setTrigger={setButtonPop}></Popup>
        <p>
          Blast to the Past! Pick a genre.
        </p>
        <ToggleButton />
        
        
      </header>
    </div>
  );
}

export default App;
