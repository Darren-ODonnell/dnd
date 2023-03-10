import React from "react";

function Draggable(props) {
    const handleDragStart = (e) => {
        // Set the data transfer object with the player data
        e.dataTransfer.setData("text/plain", props.player);
    };

    return (
        <div
            className="draggable"
            draggable="true"
            onDragStart={handleDragStart}
        >
            {props.player}
        </div>
    );
}

function PlayerList(props) {
    const players = ["Player 1", "Player 2", "Player 3"];

    return (
        <div className="player-list">
            {players.map((player) => (
                <Draggable key={player} player={player} />
            ))}
        </div>
    );
}

export default PlayerList;
