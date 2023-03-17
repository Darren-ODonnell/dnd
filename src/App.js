import React, { useEffect, useState } from "react";
import FlexBox2 from "./flexbox/FlexBox2";
import TeamsheetContainer from "./muigrid/VariableGrid";
import {DndContext, DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import './App.css';
import { v4 } from 'uuid';

const myTeam = [
    { key: 1 , id: 1 , name: "John Doe"      , position: 1},
    { key: 2 , id: 2 , name: "Jane Doe"      , position: 2},
    { key: 3 , id: 3 , name: "Bob Smith"     , position: 3},
    { key: 4 , id: 4 , name: "Sara Johnson"  , position: 4},
    { key: 5 , id: 5 , name: "Tom Jackson"   , position: 5},
    { key: 6 , id: 6 , name: "Emily Davis"   , position: 6},
    { key: 7 , id: 7 , name: "Chris Lee"     , position: 7},
    { key: 8 , id: 8 , name: "Linda Brown"   , position: 8},
    { key: 9 , id: 9 , name: "Adam Garcia"   , position: 9},
    { key: 10, id: 0 , name: ""              , position: 0},
    { key: 11, id: 0 , name: ""              , position: 0},
    { key: 12, id: 0 , name: ""              , position: 0},
    { key: 13, id: 0 , name: ""              , position: 0},
    { key: 14, id: 0 , name: ""              , position: 0},
    { key: 15, id: 15, name: "Frank Robinson", position: 15},

    // { key:  10, id: 10, name: "Amy Patel"       , position: 10},
    // { key:  11, id: 11, name: "Benjamin Wright" , position: 11},
    // { key:  12, id: 12, name: "Catherine Martin", position: 12},
    // { key:  13, id: 13, name: "David Wilson"    , position: 13},
    // { key:  14, id: 14, name: "Elizabeth Turner", position: 14},
    // { key:  15, id: 15, name: "Frank Robinson"  , position: 15},
];
const myPanel = [
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
const mySubs = [
    { key: 37, id: 37, name: "Charlie Lee"   , position: 0},
    { key: 38, id: 38, name: "Dylan Johnson" , position: 0},
    { key: 39, id: 39, name: "Ella Hernandez", position: 0},
    // { key: 40, id: 40, name: "Finn Robinson" , position: 0},
    // { key: 41, id: 41, name: "Georgia Wright", position: 0},
    // { key: 42, id: 42, name: "Hannah Chen"   , position: 0},
    // { key: 43, id: 43, name: "Ian Wilson"    , position: 0},
]

const emptyPlayer =  { key: v4(), id: 0, name: "" , position: 0}


function App() {
    const [panel, setPanel] = useState(myPanel );
    const [subs , setSubs]  = useState(mySubs  );
    const [team , setTeam]  = useState(myTeam  );

    // console.log("Panel: " + JSON.stringify(panel))
    // console.log("Team: "  + JSON.stringify(team))
    // console.log("Subs: "  + JSON.stringify(subs))

    const listAdd = (destIndex, setList, player, dest) => {
        if(dest==="Team") {
            player.position = destIndex+1
            player.key = destIndex+1
            setList(prevState => {
                const newArray = [ ...prevState ]
                newArray[ destIndex ] = player
                return newArray
            })
        } else {
            if(player.id!==undefined) {
                player.position = 0
                setList( prevState => {
                    const newArray = [ ...prevState ]
                    newArray.splice( destIndex, 0, player )
                    return newArray
                })
            }
        }
    }
    const listRemove = (sourceIndex, setList, sourceId, destId, source) => {
        if(source==="Team") {
            setList(prevArray => {
                const newArray = [...prevArray]; // make a copy of the previous array
                const p = newArray[sourceIndex]
                p.id = 0
                p.name = ""
                p.position = 0
                p.positionName = ""
                newArray[sourceIndex] = p; // set the object at the index to an empty object
                return newArray; // return the new array to update the state
            });
        }else {
            setList( prevState => {
                const newArray = [ ...prevState ]
                newArray.splice( sourceIndex, 1 )
                return newArray
            } )

        }
    }
    const resetTeamPlayer = (destPlayer, player) => {
        destPlayer.key = player.key
        destPlayer.position = player.position
        destPlayer.position = 0
        destPlayer.key = v4()
        destPlayer.positionName = ""
        return destPlayer
    }

    const resetPlayer = (destPlayer, player) => {

        return destPlayer
    }

    const switchPlayers = (destPlayer, player) => {
        setTeam(prevState => {
            const array = [...prevState]
            array[destPlayer.key-1] = player
            array[player.key-1] = destPlayer
            return array
        })
    };
    const insertPlayer = (player, destIndex, sourceIndex, setList) => {
        setList(prevState => {
            const array = [...prevState]
            array.splice(sourceIndex, 1) // remove the item at sourceIndex
            array.splice(destIndex, 0, player) // insert at destIndex
            const filteredList = array.filter(item => item.name !== ""); // remove any empty cells
            const uniqueList = [...new Set(filteredList)]; // remove any duplicates
            console.log("List: "+ JSON.stringify(uniqueList))
            return uniqueList

        })
    };

    const onDrop = (box , id,  sc, player, destPlayer)  => {
        const dest = whatTableIsId(team, panel, subs, id)
        const sourc = whatTableIsId(team, panel, subs, player.id)
        const destination =  whereIsId(team, panel, subs,id)
        const source = whereIsId(team, panel, subs,player.id)
        console.log("Source: "+source+" id: "+JSON.stringify(player))
        console.log("Destination: "+destination+" player: "+JSON.stringify(dest.find(p => p.id === id)))
        const sourceIndex = findIndex(sourc, player.id)
        const destIndex = findIndex(dest, id)
        const destKeyIndex = destPlayer.key

        console.log("Source: "+source+" id: "+JSON.stringify(player))
        console.log("Destination: "+destination+" player: "+JSON.stringify(dest.find(p => p.id === id)))
        // being dropped onto
        switch(destination) {
            case "Panel":
                if (source === "Subs")    {
                    listRemove(sourceIndex, setSubs, player.id, id, "Subs")
                    listAdd(destIndex, setPanel, player, "Panel")
                }
                if (source === "Team") {
                    listRemove(sourceIndex, setTeam, player.id, id, "Team")
                    listAdd(destIndex, setPanel, player, "Panel")
                }
                if(source==="Panel") {
                    // move up/down within the list
                    insertPlayer( player, destIndex, sourceIndex, setPanel)
                }
                break
            case "Team":
                if ( source === "Panel")    {
                    // tidyup some attribs in player
                    destPlayer = resetTeamPlayer(destPlayer, player)
                    listRemove(sourceIndex, setPanel, player.id , id      , "Panel") // remove from Panel
                    listAdd(destKeyIndex-1, setTeam, player, "Team") // add to team
                }
                if ( source === "Subs")  {
                    destPlayer = resetTeamPlayer(destPlayer, player)
                    listRemove(sourceIndex, setSubs, player.id , id     , "Subs")
                    listAdd(destKeyIndex-1, setTeam, player, "Team")
                }
                if(source=== "Team") {
                    switchPlayers(destPlayer, player)
                }
                break
            case "Subs":
                if (source === "Panel")    {
                    listRemove(sourceIndex, setPanel, player.id, id,"Panel")
                    listAdd(destIndex, setSubs, player, "Subs")
                }
                if (source === "Team")     {
                    listRemove(sourceIndex, setTeam,  player.id, id,"Team")
                    listAdd(destIndex, setSubs, player, "Subs")
                }
                if(source === "Subs") {
                    // move up/down within the list
                    insertPlayer( player, destIndex, sourceIndex, setSubs)
                }
                break
        }

    }

    const checkIfIdExists = (array, id) => {
        return array.some(item => item.id === id)
    }
    const whatTableIsId = (team, panel, subs, id) => {
        if(checkIfIdExists(team, id))    return team
        if(checkIfIdExists(subs, id))    return subs
        if(checkIfIdExists(panel, id))   return panel
    }
    const whereIsId = (team, panel, subs,id) => {
        if(checkIfIdExists(team, id))   return "Team"
        if(checkIfIdExists(subs, id))   return "Subs"
        if(checkIfIdExists(panel, id))  return "Panel"
    }
    const findIndex = (array, id) => {
        return array.findIndex(sub => sub.id === id)
    }
    const findKeyIndex = (array, key) => {
        return array.findIndex(sub => sub.key === key)
    }

    return (
    <div className="App">
        <DndProvider backend={HTML5Backend}>
            <TeamsheetContainer panel={[...panel]} team={[...team]} subs={[...subs]} onDrop={onDrop}/>
        </DndProvider>
    </div>
  );
}

export default App;
