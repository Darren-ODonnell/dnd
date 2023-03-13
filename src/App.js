import './App.css';

import FlexBox2 from "./flexbox/FlexBox2";
import DraggableList from "./dragndrop/DraggableList";

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
        {/*<GridComponent />?*/}
        {/*<GaelicFootballTeam />*/}
        {/*<GAAForm team={names}/>*/}
        {/*<DraggableList data={names} />*/}
        <FlexBox2/>
        {/*<Example data={names}/>*/}
    </div>
  );
}

export default App;
