import React, { useState } from 'react';

const GAAForm = (props) => {
    const [players, setPlayers] = useState(props.team);

    const [substitutes, setSubstitutes] = useState([]);

    const handlePlayerSelection = (index) => {
        const selectedPlayer = players[index];
        if (selectedPlayer.position) {
            // Remove the player from the current position
            const currentPositions = selectedPlayer.position.split('-');
            currentPositions.forEach((position) => {
                const playerIndex = getPositionIndex(position);
                players[playerIndex].position = null;
            });
        }

        // Add the player to the selected position
        const selectedPositions = ['F', 'FB', 'HB', 'MF'].slice(0, selectedPlayer.position.includes('H') ? 3 : 2);
        let newPosition = '';
        for (let i = 0; i < selectedPositions.length; i++) {
            const positionIndex = getPositionIndex(selectedPositions[i]);
            if (players[positionIndex].position === null) {
                newPosition += selectedPositions[i];
                players[positionIndex].position = newPosition;
                break;
            } else {
                newPosition += players[positionIndex].position;
            }
        }

        // Update the players state
        setPlayers([...players]);
    };

    const handleSubstituteSelection = (index) => {
        const selectedSubstitute = substitutes[index];
        if (selectedSubstitute.position) {
            // Remove the substitute from the current position
            const positionIndex = getPositionIndex(selectedSubstitute.position);
            players[positionIndex].position = null;
        }

        // Add the substitute to the first available position
        const selectedPositions = ['F', 'FB', 'HB', 'MF'];
        let newPosition = '';
        for (let i = 0; i < selectedPositions.length; i++) {
            const positionIndex = getPositionIndex(selectedPositions[i]);
            if (players[positionIndex].position === null) {
                newPosition = selectedPositions[i];
                players[positionIndex].position = newPosition;
                break;
            }
        }

        // Update the substitutes state
        setSubstitutes([
            ...substitutes.slice(0, index),
            {...selectedSubstitute, position: newPosition},
            ...substitutes.slice(index + 1),
        ]);

        // Update the players state
        setPlayers([...players]);
    };

    const getPositionIndex = (position) => {
        switch (position) {
            case 'K':
                return 0;
            case 'FB1':
                return 1;
            case 'FB2':
                return 2;
            case 'FB3':
                return 3;
            case 'HB1':
                return 4;
            case 'HB2':
                return 5;
            case 'HB3':
                return 6;
            case 'MF1':
                return 7;
            case 'MF2':
                return 8;
            case 'HF1':
                return 9;
            case 'HF2':
                return 10;
            case 'HF3':
                return 11;
            case 'FF1':
                return 12;
            case 'FF2':
                return 13;
            case 'FF3':
                return 14;
            default:
                return -1;
        }
    };


    return (
        <div className="gaa-form">
            <div className="gaa-form__players">
                <h3>Players:</h3>
                <ul>
                    {players.map((player, index) => (
                        <li key={index} onClick={() => this.handlePlayerSelection(index)}>
                            {player.name} ({player.position || 'U'})
                        </li>
                    ))}
                </ul>
            </div>
            <div className="gaa-form__substitutes">
                <h3>Substitutes:</h3>
                <ul>
                    {substitutes.map((substitute, index) => (
                        <li key={index} onClick={() => this.handleSubstituteSelection(index)}>
                            {substitute.name} ({substitute.position || 'U'})
                        </li>
                    ))}
                </ul>
            </div>
            <div className="gaa-form__team-layout">
                <h3>Team Layout:</h3>
                <div className="gaa-form__team-row">
                    <div className="gaa-form__team-position gaa-form__team-position--keeper">
                        {players[0].name} ({players[0].position || 'K'})
                    </div>
                </div>
                <div className="gaa-form__team-row">
                    <div className="gaa-form__team-position gaa-form__team-position--full-back">
                        {players[1].name} ({players[1].position || 'FB1'})
                    </div>
                    <div className="gaa-form__team-position gaa-form__team-position--full-back">
                        {players[2].name} ({players[2].position || 'FB2'})
                    </div>
                    <div className="gaa-form__team-position gaa-form__team-position--full-back">
                        {players[3].name} ({players[3].position || 'FB3'})
                    </div>
                </div>
                <div className="gaa-form__team-row">
                    <div className="gaa-form__team-position gaa-form__team-position--half-back">
                        {players[4].name} ({players[4].position || 'HB1'})
                    </div>
                    <div className="gaa-form__team-position gaa-form__team-position--half-back">
                        {players[5].name} ({players[5].position || 'HB2'})
                    </div>
                    <div className="gaa-form__team-position gaa-form__team-position--half-back">
                        {players[6].name} ({players[6].position || 'HB3'})
                    </div>
                </div>
                <div className="gaa-form__team-row">
                    <div className="gaa-form__team-position gaa-form__team-position--midfield">
                        {players[7].name} ({players[7].position || 'MF1'})
                    </div>
                    <div className="gaa-form__team-position gaa-form__team-position--midfield">
                        {players[8].name} ({players[8].position || 'MF2'})
                    </div>
                </div>

                <div className="gaa-form__team-row">
                    <div className="gaa-form__team-position gaa-form__team-position--half-forward">
                        {players[9].name} ({players[9].position || 'HF1'})
                    </div>
                    <div className="gaa-form__team-position gaa-form__team-position--half-forward">
                        {players[10].name} ({players[10].position || 'HF2'})
                    </div>
                    <div className="gaa-form__team-position gaa-form__team-position--half-forward">
                        {players[11].name} ({players[11].position || 'HF3'})
                    </div>
                </div>
                <div className="gaa-form__team-row">
                    <div className="gaa-form__team-position gaa-form__team-position--half-forward">
                        {players[12].name} ({players[12].position || 'FF1'})
                    </div>
                    <div className="gaa-form__team-position gaa-form__team-position--half-forward">
                        {players[13].name} ({players[13].position || 'FF2'})
                    </div>
                    <div className="gaa-form__team-position gaa-form__team-position--half-forward">
                        {players[14].name} ({players[14].position || 'FF3'})
                    </div>
                </div>
            </div>
        </div>

    )

};

export default GAAForm;