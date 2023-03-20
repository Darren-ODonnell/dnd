// Panel to Team (team player exists)
const swapPlayers = (    sourceIdx,destIdx, setSource,setDest, sourceId,destId, source,dest) => {
    let playerNameEmpty = false;

    const sourcePlayer = { ...source[ sourceIdx ] }
    const temp         = { ...destPlayer }
    const destPlayer   = { ...dest[ destIdx ] }


    // if team player name is not empty then switch Source and Dest
    if(destPlayer.name.length > 0) {
        let [sourceP, destP] = swap(sourcePlayer, destPlayer)
        destP.key = source.key
        destP.position = sourceP.position
        destP.positionName = sourceP.positionName
        sourceP.key = v4()
        source.position = 0
        source.positionName = ""

    } else {
        playerNameEmpty = true
    }

    const swap = (source, destination) => {
        const temp = {...source}
        const newSource = {...destination}
        const newDest = {...temp}
        return [newSource, newDest]
    }

}