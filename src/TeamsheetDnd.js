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
    //
    // const listAdd = (destIndex, setList, player, dest) => {
    //     if(dest === "Team") {
    //         player.position = destIndex+1
    //         player.key = destIndex+1
    //         setTeam(prevState => {
    //             const newArray = [ ...prevState ]
    //             newArray[ destIndex ] = player
    //             return newArray
    //         })
    //     } else {
    //         if(player.id!==undefined) {
    //             player.position = 0
    //             setList(prevState => {
    //                 const newArray = [ ...prevState ]
    //                 newArray[ destIndex ] = player
    //                 return newArray
    //             })
    //         }
    //     }
    // }
    // const listRemove2 = (id) => {
    //     setPanel(prevState => {
    //         const newArray = prevState.filter(p => p.id !== id)
    //         return newArray
    //     })
    //     setSubs(prevState => {
    //         const newArray = prevState.filter(p => p.id !== id)
    //         return newArray
    //     })
    //     setTeam(prevState => {
    //         const newArray = [...prevState]
    //         const p = newArray.filter(play => play.id === id)
    //         if (p.name !== undefined && p.name !== "") {
    //             p.name = ""
    //             p.id = 0
    //         }
    //         return newArray
    //     })
    // }

    const removeDuplicates = (array) => {
        return [...new Set(array.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));
    }

    // const listRemove = (sourceIndex, setList, sourceId, destId, source) => {
    //     setTeam(prevState => {
    //         const newArray = [...prevState]
    //         const p = newArray.filter(play => play.id === sourceId)
    //         if(p.name === undefined || p.name ==="") {
    //
    //         } else {
    //             p.id = 0
    //             p.name = ""
    //             p.position = 0
    //             p.positionName = ""
    //             newArray[sourceIndex] = p; // set the object at the index to an empty object
    //             return newArray; // return the new array to update the state
    //         }
    //     })
    //
    //     setPanel(prevState => {
    //         const newArray = prevState.filter(p => p.id !== sourceId)
    //         return newArray
    //     })
    //
    //     setSubs( prevState => {
    //         const newArray = prevState.filter(p => p.id !== sourceId)
    //         return newArray
    //     })
    //
    // }
    // const resetTeamPlayer = (destPlayer, player) => {
    //     destPlayer.key = player.key
    //     destPlayer.position = player.position
    //     destPlayer.position = 0
    //     destPlayer.key = v4()
    //     destPlayer.positionName = ""
    //     return destPlayer
    // }
    // const resetPlayer = (destPlayer, player) => {
    //
    //     return destPlayer
    // }
    // const switchPlayers = (destPlayer, player) => {
    //     setTeam(prevState => {
    //         const array = [...prevState]
    //         array[destPlayer.key-1] = player
    //         array[player.key-1] = destPlayer
    //         return array
    //     })
    // };
    // const insertPlayer2 = (player, destIndex, sourceIndex, setList) => {
    //     setList(prevState => {
    //         const array = [...prevState]
    //         array.splice(sourceIndex, 1) // remove the item at sourceIndex
    //         array.splice(destIndex, 0, player) // insert at destIndex
    //         const filteredList = array.filter(item => item.name !== ""); // remove any empty cells
    //         const uniqueList = [...new Set(filteredList)]; // remove any duplicates
    //         console.log("List: "+ JSON.stringify(uniqueList))
    //         return uniqueList
    //
    //     })
    // };

    // function removeFromAll(sourceIndex, id, id2) {
    //     setSubs(prevState=> {
    //         const array = [...prevState]
    //         const filteredArray = array.filter(item=>item.id!=id)
    //         return filteredArray
    //     })
    //     setPanel(prevState=> {
    //         const array = [...prevState]
    //         const filteredArray = array.filter(item=>item.id!=id)
    //         return filteredArray
    //     })
    //     setTeam(prevState=> {
    //         const array = [...prevState]
    //         const filteredArray = array.filter(item=>item.id!=id)
    //         return filteredArray
    //     })
    // }

    // Team-Team
    const swapPositions = (sourceIdx, setSource,destIdx, destId, setDest, sourceId, setTeam, setPanel, source, dest) => {
        // switch Key numbers and save
        setTeam(prevState => {
            const array = [...prevState]

            const temp = array[sourceIdx]
            array[sourceIdx].key = array[destIdx].key
            array[sourceIdx].position = array[destIdx].position
            array[destIdx].key = temp.key
            array[destIdx].position = temp.position
            array.sort((a,b) => a.key - b.key)
            return array
        })
    }
    // Panel-Team or Subs-Team
    const swapPlayers = ( sourceIdx, setSource,destIdx, destId, setDest, sourceId, setTeam, setPanel, source, dest ) => {

        let temp = source[sourceIdx]
        let destPlayer = dest[destIdx]

        setTeam(prevState => {
            const array = [...prevState]
            // update source player with Team Player key and position
            temp.key = destPlayer.key
            temp.position = destPlayer.position
            temp.positionName = destPlayer.positionName
            array.splice(destIdx, 1, temp)
            return array
        })
        setSource(prevState => {
            const array = [...prevState]
            if (destPlayer.name.length > 0) {
                destPlayer.key = destPlayer.key
                destPlayer.position = 0
                destPlayer.posiationName = ""
                array.splice(destIdx, 1, destPlayer)
            } else {
                array.splice(destIdx, 1)
            }
            return array
        })
    }
    // Panel-Subs or Subs-Panel
    const movePlayer = ( sourceIdx, setSource,destIdx, destId, setDest, sourceId, setTeam, setPanel, source, dest ) => {

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
    const moveTeamPlayer = (sourceIdx, setSource,destIdx, destId, setDest, sourceId, setTeam, setPanel, source, dest) => {

        const temp = team[sourceIdx]
        setTeam( prevState => {
            const array = [...prevState]
            array[sourceIdx].id=v4()
            array[sourceIdx].name = ""
            return array
        })
        setDest( prevState => {
            const array = [...prevState ]
            temp.key = v4()
            temp.position = 0
            array.splice(destIdx, 0, temp)
            return array
        })
    }
    // Panel-Panel or Subs-Subs


    const insertPlayer = (sourceIdx, setSource,destIdx, destId, setDest, sourceId, setTeam, setPanel, source, dest) => {

        const player = source[sourceIdx]
        setDest(prevState => {
            const array = [...prevState]
            array.splice(sourceIdx,1)
            const [destIdx]   = getPlayer2(dest,   destId)
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
            return [idx1, setPanel, panel[idx1], panel]
        }
        if (idx2 >= 0) {
            return [idx2, setSubs, subs[idx2], subs]
        }
        if (idx3 >= 0) {
            return [idx3, setTeam, team[idx3], team]
        }
    }

    const getPlayer2 = (list, id) => {
        return list.findIndex(p => p.id === id)
    }

    const getSet = (dest) => {
        if (dest === panel) return setPanel
        if (dest === subs) return setSubs
        if (dest === team) return setTeam
    }


    const onDrop = (box , destId, sourceId,  destPlayer, dest)  => {
        const [sourceIdx, setSource, sourcePlayer, source] = getPlayer(sourceId)
        const destIdx = getPlayer2(dest, destId)
        const setDest = getSet(dest)

        // const [sourceIdx, setSourceList, sourceList] = getPlayer2(source, sourcePlayer.id)
        // const [destIdx, setDestList, destList]       = getPlayer2(dest, destPlayer.id)

        // don't move around empty objects
        if (sourcePlayer.name === undefined || sourcePlayer.name === "") return

        if (dest === subs) {
            if (source === panel) movePlayer(    sourceIdx, setSource,destIdx, destId, setDest, sourcePlayer.id, setSubs, setPanel, source, dest)
            if (source === subs)  insertPlayer(  sourceIdx, setSource,destIdx, destId, setDest, sourcePlayer.id, setSubs, setSubs, source,  dest)
            if (source === team)  movePlayer(   sourceIdx, setSource,destIdx, destId, setDest, sourcePlayer.id, setSubs, setTeam, source,  dest)

        } else if (dest === panel) {
            if (source === panel) insertPlayer(  sourceIdx, setSource,destIdx, destId, setDest, sourcePlayer.id, setPanel, setPanel, source, dest)
            if (source === subs)  movePlayer(    sourceIdx, setSource,destIdx, destId, setDest, sourcePlayer.id, setPanel, setSubs, source,  dest)
            if (source === team)  movePlayer(   sourceIdx, setSource,destIdx, destId, setDest, sourcePlayer.id, setPanel, setTeam, source,  dest)

        } else if (dest === team) {
            if (source === panel) swapPlayers(   sourceIdx, setSource,destIdx, destId, setDest, sourcePlayer.id, setTeam, setPanel, source, dest)
            if (source === subs)  swapPlayers(   sourceIdx, setSource,destIdx, destId, setDest, sourcePlayer.id, setTeam, setSubs, source,  dest)
            if (source === team)  swapPositions( sourceIdx, setSource,destIdx, destId, setDest, sourcePlayer.id, setTeam, setTeam, source,  dest)
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
