import './App.css';
import Teamsheet from "./archive/Teamsheet";
import TeamBuilder from "./archive/TeamBuilder";
import PlayerList from "./archive/Draggable";
import Droppable from "./archive/Droppable";
import Example from "./dragndrop/DragnDropExample";


function App() {
  return (
    <div className="App">
        <Example />
      <PlayerList />
    </div>
  );
}

export default App;
