import React from "react";

const players = [
    { id: 1, name: "John Smith", position: "Forward" },
    { id: 2, name: "Mary Johnson", position: "Midfielder" },
    { id: 3, name: "James Williams", position: "Defender" },
    { id: 4, name: "Elizabeth Brown", position: "Goalkeeper" },
    { id: 5, name: "David Garcia", position: "Forward" },
    { id: 6, name: "Sarah Lee", position: "Midfielder" },
    { id: 7, name: "Michael Martin", position: "Defender" },
    { id: 8, name: "Emily Davis", position: "Goalkeeper" },
    { id: 9, name: "Christopher Rodriguez", position: "Forward" },
    { id: 10, name: "Ashley Martinez", position: "Midfielder" },
    { id: 11, name: "Matthew Hernandez", position: "Defender" },
    { id: 12, name: "Samantha Lopez", position: "Goalkeeper" },
    { id: 13, name: "Joshua Gonzalez", position: "Forward" },
    { id: 14, name: "Amanda Taylor", position: "Midfielder" },
    { id: 15, name: "Kevin Phillips", position: "Defender" },
];

function PlayerList() {
    return (
        <div className="player-list">
            {players.map((player) => (
                <div
                    key={player.id}
                    className="player"
                    draggable="true"
                    onDragStart={(event) =>
                        event.dataTransfer.setData("text/plain", JSON.stringify(player))
                    }
                >
                    <h3>{player.name}</h3>
                    <p>Position: {player.position}</p>
                </div>
            ))}
        </div>
    );
}

export default PlayerList;
