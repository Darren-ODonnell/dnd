import './App.css';

import FlexBox2 from "./flexbox/FlexBox2";
import DraggableList from "./dragndrop/DraggableList";
import VariableGrid from "./muigrid/VariableGrid";
import React from "react";
import TeamsheetContainer from "./muigrid/VariableGrid";
import {DndContext, DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

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
        {/*<FlexBox2/>*/}
        {/*<VariableGrid/>*/}
        <DndProvider backend={HTML5Backend}>
                <TeamsheetContainer />

        </DndProvider>
        {/*<Example data={names}/>*/}
    </div>
  );
}

export default App;
