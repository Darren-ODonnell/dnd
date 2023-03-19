import React, {useEffect, useState} from "react";
import TeamsheetContainer from "./muigrid/VariableGrid";
import { DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import './App.css';
import { v4 } from 'uuid';

// export const checkGW = (panel, team, subs, id, str) => {
//     console.log("Grace Walker in Panel ? " + str + " - " + JSON.stringify(panel.find( obj => obj.id === id )))
//     console.log("Grace Walker in Team  ? " + str + " - " + JSON.stringify(team.find(  obj => obj.id === id )))
//     console.log("Grace Walker in Subs  ? " + str + " - " + JSON.stringify(subs.find(  obj => obj.id === id )))
// }

const TeamsheetDnd = ({myTeam, myPanel, mySubs}) =>{
    const [panel, setPanel] = useState( myPanel );
    const [subs , setSubs]  = useState( mySubs );
    const [team , setTeam]  = useState( myTeam );

    useEffect(()=> {
        console.log("State Changed - Panel")
    },[panel])
    useEffect(()=> {
        console.log("State Changed - Team")
    },[team])
    useEffect(()=> {
        console.log("State Changed - Subs")
    },[subs])

    // checkGW(panel, team, subs, 16, "TeamsheetDnD")

    const listAdd = (destIndex, setList, player, dest) => {
        if(dest === "Team") {
            player.position = destIndex+1
            player.key = destIndex+1
            setTeam(prevState => {
                const newArray = [ ...prevState ]
                newArray[ destIndex ] = player
                return newArray
            })
        } else {
            if(player.id!==undefined) {
                player.position = 0
                setList(prevState => {
                    const newArray = [ ...prevState ]
                    newArray[ destIndex ] = player
                    return newArray
                })
            }
        }
    }
    const listRemove2 = (id) => {
        setPanel(prevState => {
            const newArray = prevState.filter(p => p.id !== id)
            return newArray
        })
        setSubs(prevState => {
            const newArray = prevState.filter(p => p.id !== id)
            return newArray
        })
        setTeam(prevState => {
            const newArray = [...prevState]
            const p = newArray.filter(play => play.id === id)
            if (p.name !== undefined && p.name !== "") {
                p.name = ""
                p.id = 0
            }
            return newArray
        })
    }

    const removeDuplicates = (array) => {
        return [...new Set(array.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
    }

    const listRemove = (sourceIndex, setList, sourceId, destId, source) => {
        setTeam(prevState => {
            const newArray = [...prevState]
            const p = newArray.filter(play => play.id === sourceId)
            if(p.name === undefined || p.name ==="") {

            } else {
                p.id = 0
                p.name = ""
                p.position = 0
                p.positionName = ""
                newArray[sourceIndex] = p; // set the object at the index to an empty object
                return newArray; // return the new array to update the state
            }
        })

        setPanel(prevState => {
            const newArray = prevState.filter(p => p.id !== sourceId)
            return newArray
        })

        setSubs( prevState => {
            const newArray = prevState.filter(p => p.id !== sourceId)
            return newArray
        })

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
    const insertPlayer2 = (player, destIndex, sourceIndex, setList) => {
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

    function removeFromAll(sourceIndex, id, id2) {
        setSubs(prevState=> {
            const array = [...prevState]
            const filteredArray = array.filter(item=>item.id!=id)
            return filteredArray
        })
        setPanel(prevState=> {
            const array = [...prevState]
            const filteredArray = array.filter(item=>item.id!=id)
            return filteredArray
        })
        setTeam(prevState=> {
            const array = [...prevState]
            const filteredArray = array.filter(item=>item.id!=id)
            return filteredArray
        })
    }

    // Team-Team
    const swapPositions = (id1, id2) => {
        // switch Key numbers and save
        setTeam(prevState => {
            const array = [...prevState]
            let index1 = array.findIndex(p => p.id === id1)
            let index2 = array.findIndex(p => p.id === id2)
            const temp = array[index1]
            array[index1].key = array[index2].key
            array[index1].position = array[index2].position
            array[index2].key = temp.key
            array[index2].position = temp.position
            array.sort((a,b) => a.key - b.key)
            return array
        })
    }
    // Panel-Team or Subs-Team
    const swapPlayers = ( id, destId ) => {
        const [sourceIdx, setSource, source] = getPlayer(id)
        const [destIdx, setDest, dest] = getPlayer(destId)
        let temp = source[sourceIdx]
        let destPlayer = dest[destIdx]

        setTeam(prevState => {
            const array = [...prevState]
            // update source player with Team Player key and position
            temp.key = destPlayer.name
            temp.position = destPlayer.position
            temp.positionName = destPlayer.positionName
            array.splice(destIdx, 1, temp)
            return array
        })
        setSource(prevState => {
            const array = [...prevState]
            if (destPlayer.name.length > 0) {
                destPlayer.key = v4()
                destPlayer.position = 0
                destPlayer.posiationName = ""
                array.splice(destIdx, 1, destPlayer)
            } else {
                array.splice(destIdx, 1)
            }
        })
    }
    // Panel-Subs or Subs-Panel
    const movePlayer = ( destId, sourceId ) => {

        let [sourceIdx, setSource, source] = getPlayer(sourceId)
        let [destIdx, setDest, dest] = getPlayer(destId)

        const temp = source[sourceIdx]
        // move sourcePlayer to Dest at destIdx
        // delete sourcePlayer from source
        setDest(prevState => {
            const array  = [...prevState]
            array.splice(destIdx, 0, temp)
            return array
        })
        setSource(prevState => {
            let array = prevState.filter(p => p.id !== sourceId)
            array = removeDuplicates(array)
            return array
        })
    }
    // Team-Panel or Team-Subs
    const moveTeamPlayer = (id, destId) => {
        const sourceIdx = team.findIndex(p => p.id = id)
        const [destIdx, setDest, dest] = getPlayer(id)
        const temp = team[sourceIdx]
        setTeam( prevState => {
            const array = [...prevState]
            array.splice(destId, 1, )
            array[sourceIdx].id=v4()
            array[sourceIdx].name = ""
            return array
        })
        setDest( prevState => {
            const array = [...prevState ]
            temp.key = v4()
            temp.position = 0
            array.splice(destId, 0, temp)
            return array
        })
    }
    // Panel-Panel or Subs-Subs
    const insertPlayer = (id, destId) => {
        const [sourceIdx, setSourceList, source] = getPlayer(id)
        const [destIdx, setDestList, dest] = getPlayer(destId)
        const player = source[sourceIdx]
        setDestList(prevState => {
            const array = [...prevState]
            array.splice(sourceIdx,1)
            array.splice(destIdx,0,player)
            return array
        })
    }

    // Panel-Panel or Subs-Subs
    const insertPlayerIdx = (sourceIdx, destIdx, setDestList) => {
        // const {sourceIdx, setSourceList, source} = getPlayer(id)
        // const {destIdx, setDestList, dest} = getPlayer(destId)

        const player = source[sourceIdx]
        setDestList(prevState => {
            const array = [...prevState]
            array.splice(sourceIdx,1)
            array.splice(destIdx,0,player)
            return array
        })
    }

    const getPlayer = (id) => {

        const idx1 = panel.findIndex(p => p.id === id)
        const idx2 = subs.findIndex(p => p.id === id)
        const idx3 = team.findIndex(p => p.id === id)

        console.log("Idx1: " + idx1)
        console.log("Idx2: " + idx2)
        console.log("Idx3: " + idx3)

        if (idx1 >= 0) {
            return [idx1, setPanel, panel]
        }
        if (idx2 >= 0) {
            return [idx2, setSubs, subs]
        }
        if (idx3 >= 0) {
            return [idx3, setTeam, team]
        }
    }

    const onDrop = (box , destId, source, sourcePlayer, destPlayer)  => {

        const [sourceIdx, setSourceList, sourceList] = getPlayer(sourcePlayer.id)
        const [destIdx, setDestList, destList]       = getPlayer(destId)

        // don't move around empty objects
        if (sourcePlayer.name === undefined || sourcePlayer.name === "") return


        if (destList === subs) {
            if (sourceList === panel) movePlayer(    destId, sourcePlayer.id)
            if (sourceList === subs)  insertPlayer(  destId, sourcePlayer.id)
            if (sourceList === team)  swapPlayers(   destId, sourcePlayer.id)

        } else if (destList === panel) {
            if (sourceList === panel) insertPlayer(  destId, sourcePlayer.id)
            if (sourceList === subs)  movePlayer(    destId, sourcePlayer.id)
            if (sourceList === team)  swapPlayers(   destId, sourcePlayer.id)

        } else if (destList === team) {
            if (sourceList === panel) swapPlayers(   destId, sourcePlayer.id)
            if (sourceList === subs)  swapPlayers(   destId, sourcePlayer.id)
            if (sourceList === team)  swapPositions( destId, sourcePlayer.id)
        }

        // const dest = whatTableIsId(team, panel, subs, id)
        // const sourc = whatTableIsId(team, panel, subs, player.id)
        // const destination =  whereIsId(team, panel, subs,id)
        // const sc = whereIsId(team, panel, subs,player.id)
        // const sourceIndex = findIndex(sourc, player.id)
        // const destIndex = findIndex(dest, id)
        // const destKeyIndex = destPlayer.key
        // switch(destination) {
        //     case "Panel":
        //         if (sc === "Subs")    {
        //             // from player from subs before adding to panel
        //             // listRemove(sourceIndex, setSubs, player.id, id, "Subs")
        //             listRemove2( player.id )
        //
        //             // add player to panel
        //             listAdd(destIndex, setPanel, player, "Panel")
        //         }
        //         if (sc === "Team") {
        //             // remove player from team before adding to panel
        //             // listRemove(sourceIndex, setTeam, player.id, id, "Team")
        //             listRemove2( player.id )
        //             // add player to panel
        //             listAdd(destIndex, setPanel, player, "Panel")
        //         }
        //         if (sc === "Panel") {
        //             // move up/down within the list
        //             insertPlayer( player, destIndex, sourceIndex, setPanel)
        //         }
        //         break
        //     case "Team":
        //         if ( sc === "Panel")    {
        //             // move position and key values over to new player
        //             destPlayer = resetTeamPlayer(destPlayer, player)
        //             listRemove2( player.id )
        //
        //             // listRemove(sourceIndex, setPanel, player.id , id , "Panel") // remove from Panel
        //             listAdd(destKeyIndex-1, setTeam, player, "Team") // add to team
        //         }
        //         if ( sc === "Subs")  {
        //
        //             destPlayer = resetTeamPlayer(destPlayer, player)
        //             listRemove2( player.id )
        //
        //             // listRemove(sourceIndex, setSubs, player.id , id  , "Subs")
        //             listAdd(destKeyIndex-1, setTeam, player, "Team")
        //         }
        //         if (sc === "Team") {
        //             switchPlayers(destPlayer, player)
        //         }
        //         break
        //     case "Subs":
        //         if (sc === "Panel")    {
        //             listRemove2( player.id )
        //             // listRemove(sourceIndex, setPanel, player.id, id,"Panel")
        //             listAdd(destIndex, setSubs, player, "Subs")
        //         }
        //         if (sc === "Team")     {
        //             // listRemove(sourceIndex, setTeam,  player.id, id,"Team")
        //             listRemove2( player.id )
        //
        //             listAdd(destIndex, setSubs, player, "Subs")
        //         }
        //         if (sc === "Subs") {
        //             // move up/down within the list
        //             insertPlayer( player, destIndex, sourceIndex, setSubs)
        //         }
        //         break
        // }

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
            <TeamsheetContainer panel={panel} team={team} subs={subs} onDrop={onDrop}/>
        </DndProvider>
    </div>
  );
}

export default TeamsheetDnd;
