
import './App.css';
import { Button } from "./components/Button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Blast to the Past! Pick a genre.
        </p>
        <div className="button-row">
          <Button>Action</Button>
          <Button>Adventure</Button>
          <Button>Animation</Button>
          <Button>Children's</Button>
          <Button>Comedy</Button>
        </div>
        <div className="button-row">
          <Button>Crime</Button>
          <Button>Documentary</Button>
          <Button>Drama</Button>
          <Button>Fantasy</Button>
          <Button>Film-Noir</Button>
        </div>
        <div className="button-row">
          <Button>Horror</Button>
          <Button>Musical</Button>
          <Button>Mystery</Button>
          <Button>Romance</Button>
          <Button>Sci-Fi</Button>
        </div>
        <div className="button-row">
          <Button>Thriller</Button>
          <Button>War</Button>
          <Button>Western</Button>
          <Button>Other</Button>
        </div>
        
      </header>
    </div>
  );
}

export default App;
