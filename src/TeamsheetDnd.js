import React, {useEffect, useState} from "react";
import TeamsheetContainer from "./muigrid/VariableGrid";
import { DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import './App.css';
import { v4 } from 'uuid';

const show     = ( m,v ) => { console.log(m + v)}
const showJson = ( {m,v} ) => { console.log(m + JSON.stringify( v ))}
export const showList = ( m,v ) => { console.log(m + v.map(m => {return "("+m.key+")(" + m.id + ") "+ m.name + " "}))}

const TeamsheetDnd = ({myTeam, myPanel, mySubs}) =>{
    const [panel, setPanel] = useState( myPanel );
    const [subs , setSubs]  = useState( mySubs );
    const [team , setTeam]  = useState( myTeam );


    // useEffect(() => {  showList("Panel: " ,panel) }, [panel]);
    // useEffect(() => {  showList("Subs: "  ,subs)  }, [subs] );
    // useEffect(() => {  showList("Team: "  ,team)  }, [team] );

    const findPlayer = (id) => {
        const idx1 = panel.findIndex(p => p.id === id)
        const idx2 = subs.findIndex(p => p.id === id)
        const idx3 = team.findIndex(p => p.id === id)

        if (idx1 >= 0) {
            console.log("id: "+id+" | Found in Panel at index: "+idx1)
            return [idx1, setPanel, panel[idx1], 'panel']
        }
        if (idx2 >= 0) {
            console.log("id: "+id+" | Found in Subs at index: "+idx2)
            return [idx2, setSubs, subs[idx2], 'subs']
        }
        if (idx3 >= 0) {
            console.log("id: "+id+" | Found in Team at index: "+idx3)
            return [idx3, setTeam, team[idx3], 'team']
        }
    }
    // const findPlayer2 = (id) => {
    //     const idx1 = panel.findIndex(p => p.id === id)
    //     const idx2 = subs.findIndex(p => p.id === id)
    //     const idx3 = team.findIndex(p => p.id === id)
    //
    //     if (idx1 >= 0) {
    //         // console.log("id: "+id+" | Found in Panel at index: "+idx1)
    //         return [idx1, setPanel, panel[idx1], 'panel']
    //     }
    //     if (idx2 >= 0) {
    //         // console.log("id: "+id+" | Found in Subs at index: "+idx2)
    //         return [idx2, setSubs, subs[idx2], 'subs']
    //     }
    //     if (idx3 >= 0) {
    //         // console.log("id: "+id+" | Found in Team at index: "+idx3)
    //         return [idx3, setTeam, team[idx3], 'team']
    //     }
    // }
    const findPlayerArray = (id) => {
        // show({m:"findPlayer: ", v:findPlayer})
        const [index, setFunction, player, parent] = findPlayer(id);

        if (parent === 'panel') {
            return [index, setFunction, player, parent, panel];
        } else if (parent === 'subs') {
            return [index, setFunction, player, parent, subs];
        } else if (parent === 'team') {
            return [index, setFunction, player, parent, team];
        } else {
            return [null, null, null, null, null];
        }
    };

    // Team-Team
    const swapPositions = (sourceIdx, destIdx, setSource, setDest, sourceId, destId, source2, dest2) => {
        // const swapPositions = (sourceId, destId) => {
        // const [sourceIdx, setSource, sourcePlayer2, parent1, source] = findPlayerArray(sourceId)
        // const [destIdx  , setDest  , destPlayer2 , parent2, dest]   = findPlayerArray(destId)
        // if (sourceId === destId) {
        //     console.log('source and destination are the same player');
        //     return;
        // }
        // if (source === dest) {
        //     console.log('source and destination are the same');
        //     console.log("SourceIdx: " + sourceIdx + " DestIdx: "+destIdx)
        // }

        showList("Panel: " , panel)
        const idxS1 = panel.findIndex(p=>p.id === sourceId)
        const idxS2 = subs.findIndex(p=>p.id === sourceId)
        const idxS3 = team.findIndex(p=>p.id === sourceId)
        const idxD1 = panel.findIndex(p=>p.id === destId)
        const idxD2 = subs.findIndex(p=>p.id === destId)
        const idxD3 = team.findIndex(p=>p.id === destId)
        const source = idxS1 >= 0 ? panel : (idxS2 >= 0 ? subs : team)
        const dest = idxD1 >= 0 ? panel : (idxD2 >= 0 ? subs : team)

        const sourcePlayer = source[sourceIdx];
        const tempSource = { ...sourcePlayer };
        const destPlayer = dest[destIdx];
        const tempDest = { ...destPlayer };

        showList("Source: " , source)

        console.log("SourceIdx: " +sourceIdx+ " SourceId: " + sourceId)
        console.log("DestIdx: " +destIdx+ " DestId: " + destId)

        // copy data from destPlayer to sourcePlayer
        sourcePlayer.key          = destPlayer.key;
        sourcePlayer.id          = destPlayer.id;

        sourcePlayer.position     = destPlayer.position;
        sourcePlayer.positionName = destPlayer.positionName;
        sourcePlayer.name         = destPlayer.name;

        // copy data from sourcePlayer to destPlayer
        destPlayer.key            = tempSource.key;
        destPlayer.id             = tempSource.id;
        destPlayer.position       = tempSource.position;
        destPlayer.positionName   = tempSource.positionName;
        destPlayer.name           = tempSource.name;

        // create copies of the source and dest arrays to avoid modifying them directly
        const newSource = [...source];

        // swap the players in their respective arrays
        newSource[sourceIdx] = tempDest;
        newSource[destIdx] = tempSource;

        // update the state with the new arrays
        showList("NewSource: " , newSource)
        setSource(newSource);
    };
    const swapPositions2 = (sourceIdx, destIdx, setSource, setDest, sourceId, destId, source, dest) => {
        // get players and add as temp to allow a swap of values

        if (sourceId === destId) {
            console.log('source and destination are the same player');
            return;
        }

        const sourcePlayer = source[sourceIdx] ;
        const temp = { ...sourcePlayer};
        const destPlayer = dest[destIdx];

        console.log('sourceIdx:', sourceIdx);
        console.log('destIdx:', destIdx);
        console.log('source:', source);
        console.log('dest:', dest);
        console.log('sourcePlayer:', sourcePlayer);
        console.log('temp:', temp);
        console.log('destPlayer:', destPlayer);

        const tempSource = { ...sourcePlayer };
        const tempDest = { ...destPlayer };


        // copy data from destPlayer to temp
        sourcePlayer.key = destPlayer.key;
        sourcePlayer.position = destPlayer.position;
        sourcePlayer.positionName = destPlayer.positionName;

        // copy data from sourcePlayer to destPlayer
        destPlayer.key = temp.key;
        destPlayer.position = temp.position;
        destPlayer.positionName = temp.positionName;
        // swap the players in their respective arrays
        setSource(prevState => {
            const newArray = [...prevState];
            newArray[sourceIdx] = tempDest;
            newArray.sort((a, b) => a.key - b.key);
            return newArray;
        });

        setDest(prevState => {
            const newArray = [...prevState];
            newArray[destIdx] = tempSource;
            newArray.sort((a, b) => a.key - b.key);
            return newArray;
        });





        // update state
        // setSource((prevState) => {
        //     const array = [...prevState];
        //     array[destIdx] = destPlayer;
        //     array[sourceIdx] = sourcePlayer;
        //     array.sort((a, b) => a.key - b.key);
        //     return array
        // })
    }
    // Panel-Team or Subs-Team
    const swapPlayers = (sourceIdx, destIdx, setSource, setDest, sourceId, destId, source, dest) => {
        let playerNameEmpty = false;

        const sourcePlayer = { ...source[sourceIdx] };
        const destPlayer = { ...dest[destIdx] };


        // grab the positional data from the destination player position
        sourcePlayer.key = destPlayer.key;
        sourcePlayer.position = destPlayer.position;
        sourcePlayer.positionName = destPlayer.positionName;

        // if team player name is not empty then switch Source and Dest
        if (destPlayer.name.length > 0) {
            destPlayer.key = v4();
            destPlayer.position = 0;
            destPlayer.positionName = "";
        } else {
            playerNameEmpty = true;
        }

        setDest((prevState) => {
            const array = [...prevState];
            array[destIdx] = sourcePlayer;
            return array;
        });

        setSource((prevState) => {
            const array = [...prevState];
            if (playerNameEmpty) {
                array.splice(sourceIdx, 1);
            } else {
                array[sourceIdx] = { ...destPlayer };
            }
            return array;
        });
    };
    // Panel-Subs or Subs-Panel
    const movePlayer = (     sourceIdx,destIdx, setSource,setDest, sourceId,destId, source,dest) => {

        const temp = source[sourceIdx];

        // Move sourcePlayer to dest at destIdx
        // Delete sourcePlayer from source
        setDest(prevState => {
            const array = [...prevState];
            array.splice(destIdx, 0, temp);
            return array;
        });

        setSource(prevState => {
            const array = [...prevState];
            array.splice(sourceIdx, 1);
            // array = removeDuplicates(array)
            return array;
        });
    };
    // Team-Panel or Team-Subs
    const moveTeamPlayer = ( sourceIdx,destIdx, setSource,setDest, sourceId,destId, source,dest) => {
        setSource(prevSource => {
            const temp = { ...prevSource[sourceIdx] };
            temp.id = v4();
            temp.name = "";
            return [
                ...prevSource.slice(0, sourceIdx),
                temp,
                ...prevSource.slice(sourceIdx + 1)
            ];
        });
        setDest(prevDest => {
            const player = { ...prevDest[destIdx] };
            player.key = v4();
            player.position = 0;
            player.positionName = "";
            return [
                ...prevDest.slice(0, destIdx),
                player,
                ...prevDest.slice(destIdx + 1)
            ];
        });

    }

    const swapTwoPlayers = (array, index1, index2) => {
        const newArray = [...array];
        const temp = newArray[index1];
        newArray[index1] = newArray[index2];
        newArray[index2] = temp;
        return newArray;
    };


    const onDropContainer = (droppedBoxId, droppedBoxIndex, droppedBoxType, container) => {
        // using boxIndex get the player id
        // copy the player to end of panel array
        // how to determine where the drop occurred


        if(container==="panel") {




        } else { // must be "subs"

        }





    }



    const onDrop = (box , destId, item , sourceIndex)  => {
        const sourceId = item.player.id
        const [sourceIdx, setSource, sourcePlayer, sourceType] = findPlayer(sourceId)
        const [destIdx  , setDest  , destPlayer2 , destType]   = findPlayer(destId)

        const source = sourceType === 'panel' ? panel: (sourceType === 'subs' ? subs: team);
        let dest     = destType   === 'panel' ? panel: (destType   === 'subs' ? subs: team);

        // don't move around empty objects
        if (sourcePlayer.name === undefined || sourcePlayer.name === "") return


        if (dest === subs) {
            if (source === panel) movePlayer(    sourceIdx,destIdx, setPanel,setSubs,  sourcePlayer.id,destId, panel,subs)
            if (source === subs)  swapPositions( sourceIndex,destIdx, setSubs,setSubs,   sourcePlayer.id,destId, subs,subs )
            if (source === team)  moveTeamPlayer(sourceIdx,destIdx, setTeam,setSubs,   sourcePlayer.id,destId, team,subs )

        } else if (dest === panel) {
                swapPositions( sourceIndex,destIdx, setPanel,setPanel,   sourcePlayer.id,destId, panel,panel )
            if (source === subs)  movePlayer(    sourceIdx,destIdx, setSubs,setPanel,  sourcePlayer.id,destId, subs,panel )
            if (source === team)  moveTeamPlayer(sourceIdx,destIdx, setTeam,setPanel,  sourcePlayer.id,destId, team,panel )

        } else if (dest === team) {
            if (source === panel) swapPlayers(   sourceIdx,destIdx, setPanel,setTeam,  sourcePlayer.id,destId, panel,team)
            if (source === subs)  swapPlayers(   sourceIdx,destIdx, setSubs,setTeam,   sourcePlayer.id,destId, subs,team )
            if (source === team)  swapPositions( sourceIdx,destIdx, setTeam,setTeam,   sourcePlayer.id,destId, team,team )
        }
    }
    return (
    <div className="App">

        <DndProvider backend={HTML5Backend}>
            <TeamsheetContainer panel={panel} team={team} subs={subs} onDrop={onDrop} onDropContainer={onDropContainer}/>
        </DndProvider>
    </div>
  );
}

export default TeamsheetDnd;
