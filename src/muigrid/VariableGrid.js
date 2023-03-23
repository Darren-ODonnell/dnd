 import {Button} from "@mui/material";
import Box from "./Box";
import { Container } from 'react-bootstrap';
import { useDrop } from "react-dnd";
import 'bootstrap/dist/css/bootstrap.min.css'; // import Bootstrap CSS
import './VariableGrid.css'
import './teamsheet.css'
 import { useEffect, useState } from "react";
 import {showList} from "../TeamsheetDnd";

const boxWidth         = 150
const boxHeight        = 55
const teamWidth        = 640
const boxWidthPercent  = boxWidth / teamWidth
const gapWidth4        = (teamWidth - boxWidth * 3) / 4
const gapWidth3        = (teamWidth - boxWidth * 2) / 3
const gapWidthPercent4 = gapWidth4 / teamWidth
const gapWidthPercent3 = gapWidth3 / teamWidth

export const findId = (id, array) => {
    return array.findIndex(p => p.id === id)
}


const TeamsheetContainer = ({panel, team, subs, onDrop, onDropContainer}) => {
    // const handleDrop = (box, containerId) => {
    //     // handle the drop event
    //     console.log("Box dropped into container", containerId);
    //     onDrop()
    // };



    return (
        <Container className="teamsheet-container container mx-auto" style={{height:'800px'}}>
            <PanelContainer   panel={panel} onDrop={onDrop} onDropContainer={onDropContainer} />
            <TeamContainer    team ={team}  onDrop={onDrop} />
            <SubsContainer    subs ={subs}  onDrop={onDrop} onDropContainer={onDropContainer}/>
            <ActionContainer                  />
        </Container>
    )
}
export default TeamsheetContainer;

const PanelContainer = ({ panel, onDrop, onDropContainer, }) => {
    const container = "panel"
    let nextRow = 0
    let index = 0;
    let id

    const handleBoxClick = (sourceId) => {
        // Handle the box click event with the id of the clicked box
        id = sourceId
        console.log(`Box ${id} clicked!`);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.setData("boxId", id);
        event.dataTransfer.setData("boxIndex", index);
        event.dataTransfer.setData("boxType", "box");
    };
    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const droppedBoxId    = event.dataTransfer.getData("boxId");
        const droppedBoxIndex = event.dataTransfer.getData("boxIndex");
        const droppedBoxType  = event.dataTransfer.getData("boxType");

        // Call the onDrop function with the dropped box information
        onDropContainer(droppedBoxId, droppedBoxIndex, droppedBoxType, container);
    };

    showList("Panel-Container: " , panel)
    return (
        <Container className="panel-container" onDragOver={handleDragOver} onDrop={handleDrop}>
            { panel.map(( member, index ) => {
                const top = nextRow;
                console.log("Index: "+index+ ", id: "+member.id+", name: " +member.name)

                nextRow += 60; // Increment nextRow by 50 for the next iteration

                return (
                    <Box
                        index           = {index}
                        key             = {index}
                        id              = {member.id}
                        player          = {member}
                        width           = {150}
                        height          = {50}
                        x               = {0}
                        y               = {top}
                        onDrop          = {onDrop}
                        style           = {{marginLeft : "5px"}}
                        onClick         = {() => handleBoxClick(member.id)}
                    />
                );
            })}
        </Container>
    );
};

const TeamContainer   = ({ team, onDrop}) => {

    let index = 0
    const keeper = {
        boxY: 0,
        middle: {
            key: 1,
            name: team[index].name,
            position: index+1,
            positionName: "Keeper",
            id: team[ index ].id,
        }
    }
    index+=1
    const fullBacks = {
        boxY : boxHeight*2,
        left: {
            key: 2,
            name: team[ index ].name,
            position: index+1,
            positionName: "Left Back",
            id: team[ index ].id,
        },
        middle: {
            key: 3,
            name: team[ index+1 ].name,
            position: index+2,
            positionName: "Full Back",
            id: team[ index+1 ].id,
        },
        right: {
            key: 4,
            name: team[ index+2 ].name,
            position: index+3,
            positionName: "Right Back",
            id: team[ index+2 ].id,
        },
    }
    index +=3
    const halfBacks = {
        boxY : boxHeight*4,
        left              : {
            key: 5,
            id            : team[ index ].id,
            name          : team[ index ].name,
            position: index+1,
            positionName  : "Left Half Back",
        },
        middle            : {
            key: 6,
            id            : team[ index+1 ].id,
            name          : team[ index+1 ].name,
            position: index+2,
            positionName  : "Centre Back",
        },
        right             : {
            key: 7,
            id            : team[ index+2 ].id,
            name          : team[ index+2 ].name,
            position: index+3,
            positionName  : "Right Half Back",
        },
    }
    index+=3
    const midfielders = {
        boxY : boxHeight*6,
        left: {
            key: 8,
            id            : team[ index ].id,
            name          : team[ index ].name,
            position      : index+1,
            positionName  : "Left Midfield",
        },
        right: {
            key: 9,
            id            : team[ index+1 ].id,
            name          : team[ index+1 ].name,
            position      : index+2,
            positionName  : "Right Midfield",

        },
    }
    index+=2
    const halfForwards = {
        boxY : boxHeight*8,
        left              : {
            key: 10,
            id            : team[ index ].id,
            name          : team[ index ].name,
            position: index+1,
            positionName  : "Left Half Forward",
        },
        middle            : {
            key: 11,
            id            : team[ index+1 ].id,
            name          : team[ index+1 ].name,
            position: index+2,
            positionName  : "Centre Forward",
        },
        right             : {
            key: 12,
            id            : team[ index+2 ].id,
            name          : team[ index+2 ].name,
            position: index+3,
            positionName  : "Right Half Forward",
        },
    }
    index+=3
    const fullForwards = {
        boxY : boxHeight*10,
        left              : {
            key: 13,
            id            : team[ index ].id,
            name          : team[ index ].name,
            position: index+1,
            positionName  : "Left Full Forward",
        },
        middle            : {
            key: 14,
            id            : team[ index+1 ].id,
            name          : team[ index+1 ].name,
            position: index+2,
            positionName  : "Full Forward",
        },
        right             : {
            key: 15,
            id            : team[ index+2 ].id,
            name          : team[ index+2 ].name,
            position: index+3,
            positionName  : "Right Full Forward",
        },
    }

    const ThreeAcross   = ({boxY, left, middle, right}) => {
        const Left = () => {
            const boxX = teamWidth * gapWidthPercent4
            return  (
                <Box
                    x               = {boxX}
                    y               = {boxY}
                    width           = {boxWidth}
                    height          = {boxHeight}
                    id              = {left.id}
                    player          = {left}
                    onDrop          = {onDrop}
                    style           = {{margin : "0px", fontWeight: "bold"}}
                />
            )
        }
        const Middle = () => {
            const boxX = teamWidth * (gapWidthPercent4 * 2 + boxWidthPercent)
            return  (
                <Box
                    x={boxX}
                    y={boxY}
                    width={boxWidth}
                    height={boxHeight}
                    id={middle.id}
                    player={middle}
                    onDrop={onDrop}
                    style = {{margin: "0px", fontWeight: "bold"}}
                />
            )
        }
        const Right = () => {
            const boxX = teamWidth * (gapWidthPercent4 * 3 + boxWidthPercent * 2)
            return  (
                <Box
                    x={boxX}
                    y={boxY}
                    width={boxWidth}
                    height={boxHeight}
                    id={right.id}
                    player={right}
                    onDrop={onDrop}
                    style = {{margin: "0px", fontWeight: "bold"}}
                />
            )
        }
        return  (
            <>
                <Left />
                <Middle />
                <Right />
            </>
        )
    }
    const TwoAcross   = ({boxY, left, middle, right}) => {
        const Left = () => {
            const boxX = teamWidth * gapWidthPercent3
            return  (
                <Box
                    x      = {boxX}
                    y      = {boxY}
                    width  = {boxWidth}
                    height = {boxHeight}
                    id     = {left.id}
                    player = {left}
                    onDrop = {onDrop}
                    style  = {{margin: "0px", fontWeight: "bold"}}
                />
            )
        }

        const Right = () => {
            const boxX = teamWidth * (gapWidthPercent3 * 2 + boxWidthPercent )
            return  (
                <Box
                    x      = {boxX}
                    y      = {boxY}
                    width  = {boxWidth}
                    height = {boxHeight}
                    id     = {right.id}
                    player = {right}
                    onDrop = {onDrop}
                    style  = {{margin : "0px", fontWeight : "bold"}}
                />
            )
        }

        return  (
            <>
                <Left />
                <Right />
            </>
        )
    }
    const OneAcross   = ({boxY, left, middle, right}) => {
        const Middle = () => {
            const boxX = "50%";
            return  (
                <Box
                    x      = {boxX}
                    y      = {boxY}
                    width  = {boxWidth}
                    height = {boxHeight}
                    id     = {middle.id}
                    player = {middle}
                    onDrop = {onDrop}
                    style  = {{margin     : "0px", fontWeight: "bold"}}
                />
            )
        }
        return  <Middle />

    }

    return (
            <Container className="team-container" >
                <OneAcross   {...keeper       }/>
                <ThreeAcross {...fullBacks    }/>
                <ThreeAcross {...halfBacks    }/>
                <TwoAcross   {...midfielders  }/>
                <ThreeAcross {...halfForwards }/>
                <ThreeAcross {...fullForwards }/>
            </Container>
    )
}
const SubsContainer   = ({ subs, onDrop}) => {

    const container="subs"
        let nextRow = 0
        return (

            <Container className="subs-container">
                {subs.map((member) => {
                    const top = nextRow;
                    nextRow += 60; // Increment nextRow by 60 for the next iteration
                    return (
                        <Box
                            key      = {member.id}
                            id       = {member.id}
                            x        = {0}
                            y        = {top}
                            width    = {150}
                            height   = {50}
                            player   = {member}
                            onDrop   = {onDrop}
                            style    = {{marginLeft     : "13px"}}
                        />
                    );
                })}
            </Container>
        );
    };
const ActionContainer = () => {
    return (
        <Container className="action-container">
            <div className="btn-group d-flex" role="group">
                <Button className="btn but-secondary " >Cancel</Button>
                <Button type="submit" className="btn but-primary ">Save</Button>
            </div>
        </Container>
    );
};

