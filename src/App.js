import React from "react";
// import FlexBox2 from "./flexbox/FlexBox2";
import {DndContext, DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import './App.css';
import {v4} from 'uuid'

import TeamsheetDnd from "./TeamsheetDnd";

let myTeam = [
    { key: 1 , id: 1 , name: "John Doe"      , position: 1},
    { key: 2 , id: 2 , name: "Jane Doe"      , position: 2},
    { key: 3 , id: 3 , name: "Bob Smith"     , position: 3},
    { key: 4 , id: 4 , name: "Sara Johnson"  , position: 4},
    { key: 5 , id: 5 , name: "Tom Jackson"   , position: 5},
    { key: 6 , id: 6 , name: "Emily Davis"   , position: 6},
    { key: 7 , id: 7 , name: "Chris Lee"     , position: 7},
    { key: 8 , id: 8 , name: "Linda Brown"   , position: 8},
    { key: 9 , id: 9 , name: "Adam Garcia"   , position: 9},
    { key: 10, id: v4() , name: ""              , position: 0},
    { key: 11, id: v4() , name: ""              , position: 0},
    { key: 12, id: v4() , name: ""              , position: 0},
    { key: 13, id: v4() , name: ""              , position: 0},
    { key: 14, id: v4() , name: ""              , position: 0},
    { key: 15, id: 15, name: "Frank Robinson", position: 15},

    // { key:  10, id: 10, name: "Amy Patel"       , position: 10},
    // { key:  11, id: 11, name: "Benjamin Wright" , position: 11},
    // { key:  12, id: 12, name: "Catherine Martin", position: 12},
    // { key:  13, id: 13, name: "David Wilson"    , position: 13},
    // { key:  14, id: 14, name: "Elizabeth Turner", position: 14},
    // { key:  15, id: 15, name: "Frank Robinson"  , position: 15},
];
let myPanel = [
    { key: 16, id: 16, name: "Grace Walker"   , position: 0},
    { key: 17, id: 17, name: "Henry Kim"      , position: 0},
    { key: 18, id: 18, name: "Isabella Chen"  , position: 0},
    // { key: 19, id: 19, name: "Jacob Stewart"  , position: 0},
    // { key: 20, id: 20, name: "Katie Huang"    , position: 0},
    // { key: 21, id: 21, name: "Liam Ramirez"   , position: 0},
    // { key: 22, id: 22, name: "Mia Nguyen"     , position: 0},
    // { key: 23, id: 23, name: "Noah Phillips"  , position: 0},
    // { key: 24, id: 24, name: "Olivia Smith"   , position: 0},
    // { key: 25, id: 25, name: "Paula Davis"    , position: 0},
    // { key: 26, id: 26, name: "Quinn Green"    , position: 0},
    // { key: 27, id: 27, name: "Ryan Hernandez" , position: 0},
    // { key: 28, id: 28, name: "Sophia Lee"     , position: 0},
    // { key: 29, id: 29, name: "Tyler Rodriguez", position: 0},
    // { key: 30, id: 30, name: "Violet Patel"   , position: 0},
    // { key: 31, id: 31, name: "William Brown"  , position: 0},
    // { key: 32, id: 32, name: "Xavier Kim"     , position: 0},
    // { key: 33, id: 33, name: "Yara Gomez"     , position: 0},
    // { key: 34, id: 34, name: "Zoe Martinez"   , position: 0},
    // { key: 35, id: 35, name: "Alex Turner"    , position: 0},
    // { key: 36, id: 36, name: "Bella Davis"    , position: 0},
    // { key: 44, id: 44, name: "Jasmine Nguyen" , position: 0},
    // { key: 45, id: 45, name: "Kian Ramirez"   , position: 0},
    // { key: 46, id: 46, name: "Luna Smith"     , position: 0},
    // { key: 47, id: 47, name: "Max Green"      , position: 0},

]
let mySubs = [
    { key: 37, id: 37, name: "Charlie Lee"   , position: 0},
    { key: 38, id: 38, name: "Dylan Johnson" , position: 0},
    { key: 39, id: 39, name: "Ella Hernandez", position: 0},
    // { key: 40, id: 40, name: "Finn Robinson" , position: 0},
    // { key: 41, id: 41, name: "Georgia Wright", position: 0},
    // { key: 42, id: 42, name: "Hannah Chen"   , position: 0},
    // { key: 43, id: 43, name: "Ian Wilson"    , position: 0},
]

const Help = () => {
    console.log("Working")
}

const App = () => {
    return (
    <div className="App">
        <DndProvider backend={HTML5Backend}>
            <TeamsheetDnd myTeam={myTeam} myPanel={myPanel}  mySubs={mySubs} />
        </DndProvider>
    </div>
  );
}

export default App;
