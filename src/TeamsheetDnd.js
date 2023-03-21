import React, {useEffect, useState} from "react";
import TeamsheetContainer from "./muigrid/VariableGrid";
import { DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import './App.css';
import { v4 } from 'uuid';

const TeamsheetDnd = ({myTeam, myPanel, mySubs}) =>{
    const [panel, setPanel] = useState( myPanel );
    const [subs , setSubs]  = useState( mySubs );
    const [team , setTeam]  = useState( myTeam );

    useEffect(() => {
        console.log("Panel: useEffect() - " + panel.map(m => {return m.name + " - "}))

    }, [panel]);

    const findId = (id) => {
        return panel.findIndex(p=>p.id===17)
    }

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

    const findPlayerArray = (id) => {
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
    const swapPositions = (sourceIdx, destIdx, setSource, setDest, sourceId, destId, source, dest) => {
        // get players and add as temp to allow a swap of values

        const sourcePlayer = source[sourceIdx] ;
        const temp = { ...sourcePlayer};
        const destPlayer = dest[destIdx];

        // copy data from destPlayer to temp
        sourcePlayer.key = destPlayer.key;
        sourcePlayer.position = destPlayer.position;
        sourcePlayer.positionName = destPlayer.positionName;

        // copy data from sourcePlayer to destPlayer
        destPlayer.key = temp.key;
        destPlayer.position = temp.position;
        destPlayer.positionName = temp.positionName;

        // update state
        setSource((prevState) => {
            const array = [...prevState];
            array[destIdx] = destPlayer;
            array[sourceIdx] = sourcePlayer;
            array.sort((a, b) => a.key - b.key);
            return array
        })
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

    // Panel-Panel or Subs-Subs
    // const insertPlayer = (sourceIdx, destIdx, setSource, setDest, sourceId, destId, source, dest) => {
    //     const player = source[sourceIdx] ;
    //     setDest((prevState) => {
    //         const array = [...prevState];
    //         array.splice(sourceIdx, 1);
    //         array.splice(destIdx, 0, player); // Use destIdx directly instead of calling getPlayer2
    //         return array;
    //     });
    // };

    // const insertPlayer = (sourceIdx, destIdx, setSource, setDest, sourceId, destId, source, dest) => {
    //     console.log('sourceIdx:', sourceIdx);
    //     console.log('destIdx:', destIdx);
    //     console.log('source:', source);
    //     console.log('dest:', dest);
    //
    //     const player = source[sourceIdx];
    //
    //     setDest((prevState) => {
    //         const array = [...prevState];
    //         array.splice(sourceIdx, 1);
    //         array.splice(destIdx, 0, player); // Use destIdx directly instead of calling getPlayer2
    //         return array;
    //     });
    // };
    const insertPlayer = (sourceIdx, destIdx, setSource, setDest, sourceId, destId, source, dest) => {
        if(Math.abs(sourceIdx - destIdx) <=1) {
            console.log("Source: "+sourceIdx+ " , Dest: "+ destIdx)
            return
        }
        const sourcePlayer = dest[sourceIdx]
        const destPlayer = dest[destIdx]

        const source1 = ((setDest === setPanel) ? 'panel' : (setDest === setSubs ? 'subs': 'team'))

        setPanel((prevState) => {
            const array = [...prevState]
            if(sourceIdx < destIdx) {
                array.splice(destIdx,0,sourcePlayer)
                array.splice(sourceIdx,1)
            } else {
                array.splice(destIdx,0,sourcePlayer)
                array.splice(sourceIdx+1,1)
            }
            return array
        })

        //
        // setDest((prevState) => {
        //     const array = [...prevState];
        //     array.splice(sourceIdx, 1);
        //     array.splice(destIdx, 0, player); // Use destIdx directly instead of calling getPlayer2
        //     return array;
        // });

    };






    // Panel-Panel or Subs-Subs
    // const insertPlayer = (sourceIdx, destIdx, setSource, setDest, sourceId, destId, source, dest) => {
    //     const player = { ...source[sourceIdx] };
    //     setDest((prevState) => {
    //         const array = [...prevState];
    //         array.splice(sourceIdx, 1);
    //         const destIdx = getPlayer2(dest, destId);
    //         array.splice(destIdx, 0, player);
    //         return array;
    //     });
    // };

    // const getPlayer2 = (list, id) => {
    //     return list.findIndex((p) => p.id === id);
    // };

    const getSet = (dest) => {
        if (dest === panel) return setPanel
        if (dest === subs) return setSubs
        if (dest === team) return setTeam
    }

    const onDrop = (box , destId, item,  destPlayer, destType2)  => {
        const sourceId = item.player.id

        const [sourceIdx, setSource, sourcePlayer, sourceType] = findPlayer(sourceId)
        const [destIdx, setDest, destPlayer2, destType] = findPlayer(destId)

        const source = sourceType === 'panel' ? panel: (sourceType === 'subs' ? subs: team);
        let dest   = destType   === 'panel' ? panel: (destType   === 'subs' ? subs: team);

        if (!destPlayer) { dest = source; }

        console.log("Panel: OnDrop() - idx " + findId(17) +" - " + panel.map(m => {return m.name + " - "}))

        // don't move around empty objects
        if (sourcePlayer.name === undefined || sourcePlayer.name === "") return

        if (dest === subs) {
            if (source === panel) movePlayer(    sourceIdx,destIdx, setPanel,setSubs,  sourcePlayer.id,destId, panel,subs)
            if (source === subs)  swapPositions(  sourceIdx,destIdx, setSubs,setSubs,   sourcePlayer.id,destId, subs,subs)
            if (source === team)  moveTeamPlayer(sourceIdx,destIdx, setTeam,setSubs,   sourcePlayer.id,destId, team,subs)

        } else if (dest === panel) {
            if (source === panel) swapPositions(  sourceIdx,destIdx, setPanel,setPanel, sourcePlayer.id,destId, panel,panel)
            if (source === subs)  movePlayer(    sourceIdx,destIdx, setSubs,setPanel,  sourcePlayer.id,destId, subs,panel)
            if (source === team)  moveTeamPlayer(sourceIdx,destIdx, setTeam,setPanel,  sourcePlayer.id,destId, team,panel)

        } else if (dest === team) {
            if (source === panel) swapPlayers(   sourceIdx,destIdx, setPanel,setTeam,  sourcePlayer.id,destId, panel,team)
            if (source === subs)  swapPlayers(   sourceIdx,destIdx, setSubs,setTeam,   sourcePlayer.id,destId, subs,team)
            if (source === team)  swapPositions( sourceIdx,destIdx, setTeam,setTeam,   sourcePlayer.id,destId, team,team)
        }
    }

    console.log("Parent: render()  - idx " + findId(17) +" - " + + panel.map(m => {return m.name + " - "}))
    return (

    <div className="App">

        <DndProvider backend={HTML5Backend}>
            <TeamsheetContainer panel={panel} team={team} subs={subs} onDrop={onDrop} findPlayerArray={findPlayerArray}/>
        </DndProvider>
    </div>
  );
}

export default TeamsheetDnd;
