import React, { useState } from 'react';

const TeamBuilder = () => {
    const [players, setPlayers] = useState([
        { name: 'Player 1', position: 'Forward' },
        { name: 'Player 2', position: 'Midfielder' },
        { name: 'Player 3', position: 'Defender' },
        // ...add more players here
    ]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);

    return (
        <div className="team-builder">
            {/* List of players on the right */}
            <div className="player-list">
                {players.map((player, index) => (
                    <div
                        key={index}
                        className="player"
                        draggable
                        onDragStart={() => console.log('dragging', player)}
                    >
                        {player.name} ({player.position})
                    </div>
                ))}
            </div>

            {/* Droppable components on the left */}
        </div>
    );
}

export default TeamBuilder;
