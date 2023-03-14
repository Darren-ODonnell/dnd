import './App.css';

import FlexBox2 from "./flexbox/FlexBox2";
import DraggableList from "./dragndrop/DraggableList";
import VariableGrid from "./muigrid/VariableGrid";
import React from "react";
import TeamsheetContainer from "./muigrid/VariableGrid";
import {DndContext, DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


const team = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "Bob Smith" },
    { id: 4, name: "Sara Johnson" },
    { id: 5, name: "Tom Jackson" },
    { id: 6, name: "Emily Davis" },
    { id: 7, name: "Chris Lee" },
    { id: 8, name: "Linda Brown" },
    { id: 9, name: "Adam Garcia" },
    { id: 10, name: "Amy Patel" },
    { id: 11, name: "Benjamin Wright" },
    { id: 12, name: "Catherine Martin" },
    { id: 13, name: "David Wilson" },
    { id: 14, name: "Elizabeth Turner" },
    { id: 15, name: "Frank Robinson" },
];

const panel = [

    { id: 16, name: "Grace Walker" },
    { id: 17, name: "Henry Kim" },
    { id: 18, name: "Isabella Chen" },
    { id: 19, name: "Jacob Stewart" },
    { id: 20, name: "Katie Huang" },
    { id: 21, name: "Liam Ramirez" },
    { id: 22, name: "Mia Nguyen" },
    { id: 23, name: "Noah Phillips" },
    { id: 24, name: "Olivia Smith" },
    { id: 25, name: "Paula Davis" },
    { id: 26, name: "Quinn Green" },
    { id: 27, name: "Ryan Hernandez" },
    { id: 28, name: "Sophia Lee" },
    { id: 29, name: "Tyler Rodriguez" },
    { id: 30, name: "Violet Patel" },
    { id: 31, name: "William Brown" },
    { id: 32, name: "Xavier Kim" },
    { id: 33, name: "Yara Gomez" },
    { id: 34, name: "Zoe Martinez" },
    { id: 35, name: "Alex Turner" },
    { id: 36, name: "Bella Davis" },

]

const subs = [
    { id: 37, name: "Charlie Lee" },
    { id: 38, name: "Dylan Johnson" },
    { id: 39, name: "Ella Hernandez" },
    { id: 40, name: "Finn Robinson" },
    { id: 41, name: "Georgia Wright" },
    { id: 42, name: "Hannah Chen" },
    { id: 43, name: "Ian Wilson" },
    { id: 44, name: "Jasmine Nguyen" },
    { id: 45, name: "Kian Ramirez" },
    { id: 46, name: "Luna Smith" },
    { id: 47, name: "Max Green" },

]

const onDrop = (box , id)  => console.log("Dropped box: ", box, " ID: ", id)

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
                <TeamsheetContainer panel={panel} team={team} subs={subs} onDrop={onDrop}/>

        </DndProvider>
        {/*<Example data={names}/>*/}
    </div>
  );
}

export default App;
