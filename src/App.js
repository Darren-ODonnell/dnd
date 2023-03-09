import './App.css';
import Teamsheet from "./Teamsheet";
import TeamBuilder from "./TeamBuilder";
import PlayerList from "./Draggable";
import Droppable from "./Droppable";


function App() {
  return (
    <div className="App">
        <Droppable />
      <PlayerList />
    </div>
  );
}

export default App;
