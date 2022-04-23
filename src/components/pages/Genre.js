import React from 'react';
import '../../App.css';
import { ToggleButton } from "./components/ToggleButton.js";

function Genre() {
    return (
    <div className="pick-genre">
      <header className="pick-header">
        <p>
          Blast to the Past! Pick a genre.
        </p>
        <ToggleButton />
        
      </header>
    </div>
    );
}

export default Genre;