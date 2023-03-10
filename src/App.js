import './App.css';
import Teamsheet from "./archive/Teamsheet";
import TeamBuilder from "./archive/TeamBuilder";
import PlayerList from "./archive/Draggable";
import Droppable from "./archive/Droppable";
import Example from "./dragndrop/DragnDropExample";
const names = [
    "John Smith",
    "Emma Johnson",
    "Michael Davis",
    "Sarah Williams",
    "William Brown",
    "Olivia Wilson",
    "James Garcia",
    "Ava Rodriguez",
    "David Martinez",
    "Sophia Anderson",
    "Joseph Taylor",
    "Emily Jackson",
    "Christopher White",
    "Isabella Harris",
    "Matthew Martin",
];

function App() {
  return (
    <div className="App">
        <Example />
      <PlayerList />
    </div>
  );
}

export default App;
