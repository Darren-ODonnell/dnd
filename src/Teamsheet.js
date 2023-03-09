import { useState } from "react";
import './Teamsheet.css'

function Teamsheet() {
    const [team, setTeam] = useState([
        {
            id: 1,
            name: "John Doe",
            position: "forwards",
        },
        {
            id: 2,
            name: "Jane Doe",
            position: "midfielders",
        },
        {
            id: 3,
            name: "Bob Smith",
            position: "defenders",
        },
        {
            id: 4,
            name: "Alice Smith",
            position: "goalkeepers",
        },
    ]);

    const handleDragStart = (e, player) => {
        e.dataTransfer.setData("playerId", player.id);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, position) => {
        const playerId = e.dataTransfer.getData("playerId");
        const playerIndex = team.findIndex((player) => player.id === playerId);
        if (playerIndex !== -1) {
            const newTeam = [...team];
            newTeam[playerIndex].position = position;
            setTeam(newTeam);
        }
    };

    console.log(team); // Debugging code

    return (
        <div>
            <div className="field">
                <div className="label">Forwards</div>
                <div
                    className="position"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "forwards")}
                >
                    {team
                        .filter((player) => player.position === "forwards")
                        .map((player) => (
                            <div
                                key={player.id}
                                className="player"
                                draggable
                                onDragStart={(e) => handleDragStart(e, player)}
                            >
                                {player.name}
                            </div>
                        ))}
                </div>
            </div>
            <div className="field">
                <div className="label">Midfielders</div>
                <div
                    className="position"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "midfielders")}
                >
                    {team
                        .filter((player) => player.position === "midfielders")
                        .map((player) => (
                            <div
                                key={player.id}
                                className="player"
                                draggable
                                onDragStart={(e) => handleDragStart(e, player)}
                            >
                                {player.name}
                            </div>
                        ))}
                </div>
            </div>
            <div className="field">
                <div className="label">Defenders</div>
                <div
                    className="position"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "defenders")}
                >
                    {team
                        .filter((player) => player.position === "defenders")
                        .map((player) => (
                            <div
                                key={player.id}
                                className="player"
                                draggable
                                onDragStart={(e) => handleDragStart(e, player)}
                            >
                                {player.name}
                            </div>
                        ))}
                </div>
            </div>
            <div className="field">
                <div className="label">Goalkeepers</div>
                <div
                    className="position"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "goalkeepers")}
                >
                    {team
                        .filter((player) => player.position === "goalkeepers")
                        .map((player) => (
                            <div
                                key={player.id}
                                className="player"
                                draggable
                                key={player.id}
                                className="player"
                                draggable
                                onDragStart={(e) => handleDragStart(e, player)}
                            >
                                {player.name}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Teamsheet;