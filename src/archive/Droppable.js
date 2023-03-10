import React, { useState } from "react";

function Droppable(props) {
    const [player, setPlayer] = useState(null);

    const handleDrop = (e) => {
        e.preventDefault();

        // Get the player data from the data transfer object
        const playerData = e.dataTransfer.getData("text/plain");

        // Set the player state
        setPlayer(playerData);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };
    function TeamPosition(props) {
        return (
            <div className="TeamPosition"
                 onDragOver={(event) => { event.preventDefault(); }}
                 onDrop={(event) => { props.onDrop(event, props.position); }}>
                {props.player ? props.player.name : "Empty"}
            </div>
        );
    }

    return (
        <div
            className="droppable"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            {player ? (
                <div>{player}</div>
            ) : (
                <div className="placeholder">Drop player here</div>
            )}
        </div>
    );
}

export default Droppable;
