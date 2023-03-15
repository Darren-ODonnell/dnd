import {Button} from "@mui/material";
import Box from "../flexbox/Box";
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // import Bootstrap CSS
import './VariableGrid.css'
import './teamsheet.css'
const boxWidth         = 150
const boxHeight        = 55
const teamWidth        = 640
const boxWidthPercent  = boxWidth / teamWidth
const gapWidth4        = (teamWidth - boxWidth * 3) / 4
const gapWidth3        = (teamWidth - boxWidth * 2) / 3
const gapWidthPercent4 = gapWidth4 / teamWidth
const gapWidthPercent3 = gapWidth3 / teamWidth


const TeamsheetContainer = ({panel,team, subs, onDrop}) => {
    return (
        <Container className="teamsheet-container container mx-auto" style={{height:'800px'}}>
            <PanelContainer  panel  = {panel} onDrop = {onDrop}/>
            <TeamContainer   team   = {team}  onDrop = {onDrop}/>
            <SubsContainer   subs   = {subs}  onDrop = {onDrop}/>
            <ActionContainer                  />
        </Container>
    )
}
export default TeamsheetContainer;

const PanelContainer = ({ panel, onDrop }) => {
    let nextRow = 0
    return (

        <Container className="panel-container">
            {panel.map((member) => {
                const top = nextRow;
                nextRow += 60; // Increment nextRow by 50 for the next iteration
                return (
                    <Box
                        key={member.id}
                        id={member.id}
                        player={member}
                        width={150}
                        height={50}
                        x={0}
                        y={top}
                        onDrop={onDrop}
                        style={{marginLeft: "5px"}}
                        source="Panel"
                    />
                );
            })}
        </Container>
    );
};
const TeamContainer   = ({team, onDrop}) => {

    let index = 0
    const keeper = {
        middle: {
            name: team[index].name,
            positionNumber: index+1,
            positionName: "Keeper",
            id: team[ index ].id,
        }
    }

    index+=1
    const fullBacks = {
        boxY : boxHeight*2,
        left: {
            name: team[ index ].name,
            positionNumber: index+1,
            positionName: "Left Back",
            id: team[ index ].id,
        },
        middle: {
            name: team[ index+1 ].name,
            positionNumber: index+2,
            positionName: "Full Back",
            id: team[ index+1 ].id,
        },
        right: {
            name: team[ index+2 ].name,
            positionNumber: index+3,
            positionName: "Right Back",
            id: team[ index+2 ].id,
        },
    }
    index +=3
    const halfBacks = {
        boxY : boxHeight*4,
        left              : {
            id            : team[ index ].id,
            name          : team[ index ].name,
            positionNumber: index+1,
            positionName  : "Left Half Back",
        },
        middle            : {
            id            : team[ index+1 ].id,
            name          : team[ index+1 ].name,
            positionNumber: index+2,
            positionName  : "Centre Back",
        },
        right             : {
            id            : team[ index+2 ].id,
            name          : team[ index+2 ].name,
            positionNumber: index+3,
            positionName  : "Right Half Back",
        },
    }
    index+=3
    const midfielders = {
        boxY : boxHeight*6,
        left: {
            name          : team[ index ].name,
            id            : team[ index ].id,
            positionNumber: index+1,
            positionName  : "Left Midfield",
        },
        right: {
            name          : team[ index+1 ].name,
            id            : team[ index+1 ].id,
            positionNumber: index+2,
            positionName  : "Right Midfield",

        },
    }
    index+=2
    const halfForwards = {
        boxY : boxHeight*8,
        left              : {
            id            : team[ index ].id,
            name          : team[ index ].name,
            positionNumber: index+1,
            positionName  : "Left Half Forward",
        },
        middle            : {
            id            : team[ index+1 ].id,
            name          : team[ index+1 ].name,
            positionNumber: index+2,
            positionName  : "Centre Forward",
        },
        right             : {
            id            : team[ index+2 ].id,
            name          : team[ index+2 ].name,
            positionNumber: index+3,
            positionName  : "Right Half Forward",
        },
    }
    index+=3
    const fullForwards = {
        boxY : boxHeight*10,
        left              : {
            id            : team[ index ].id,
            name          : team[ index ].name,
            positionNumber: index+1,
            positionName  : "Left Full Forward",
        },
        middle            : {
            id            : team[ index+1 ].id,
            name          : team[ index+1 ].name,
            positionNumber: index+2,
            positionName  : "Full Forward",
        },
        right             : {
            id            : team[ index+2 ].id,
            name          : team[ index+2 ].name,
            positionNumber: index+3,
            positionName  : "Right Full Forward",
        },
    }

    const ThreeAcross   = ({boxY, left, middle, right}) => {
        const Left = () => {
            const boxX = teamWidth * gapWidthPercent4
            return  (
                <Box
                    x      = {boxX}     y      = {boxY}
                    width  = {boxWidth} height = {boxHeight}
                    id     = {left.id}   player={left}
                    onDrop={onDrop}
                    style = {{margin: "0px", fontWeight: "bold"}}
                    source="Team"
                />
            )
        }
        const Middle = () => {
            const boxX = teamWidth * (gapWidthPercent4 * 2 + boxWidthPercent)
            return  (
                <Box
                    x={boxX} y={boxY}
                    width={boxWidth} height={boxHeight}
                    id={middle.id}                          player={middle}
                    onDrop={onDrop}
                    style = {{margin: "0px", fontWeight: "bold"}}
                    source="Team"
                />
            )
        }
        const Right = () => {
            const boxX = teamWidth * (gapWidthPercent4 * 3 + boxWidthPercent * 2)
            return  (
                <Box
                    x={boxX} y={boxY}
                    width={boxWidth} height={boxHeight}
                    id={right.id}                          player={right}
                    onDrop={onDrop}
                    style = {{margin: "0px", fontWeight: "bold"}}
                    source="Team"
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
                    x      = {boxX}     y      = {boxY}
                    width  = {boxWidth} height = {boxHeight}
                    id     = {left.id}                          player={left}
                    onDrop={onDrop}
                    style = {{margin: "0px", fontWeight: "bold"}}
                    source="Team"
                />
            )
        }

        const Right = () => {
            const boxX = teamWidth * (gapWidthPercent3 * 2 + boxWidthPercent )
            return  (
                <Box
                    x={boxX} y={boxY}
                    width={boxWidth} height={boxHeight}
                    id={right.id}  player={right}
                    onDrop={onDrop}
                    style = {{margin: "0px", fontWeight: "bold"}}
                    source="Team"
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
            const boxY = 0;

            return  (
                <Box
                    x={boxX} y={boxY}
                    width={boxWidth} height={boxHeight}
                    id={middle.id}  player={middle}
                    onDrop={onDrop}
                    style = {{margin: "0px", fontWeight: "bold"}}
                    source="Team"
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
const SubsContainer   = ({subs, onDrop}) => {
        let nextRow = 0
        return (

            <Container className="subs-container" >
                {subs.map((member) => {
                    const top = nextRow;
                    nextRow += 60; // Increment nextRow by 50 for the next iteration
                    return (
                        <Box
                            key={member.id}
                            id={member.id}
                            player={member}
                            width={150}
                            height={50}
                            x={0}
                            y={top}
                            onDrop={onDrop}
                            style={{marginLeft: "13px"}}
                            source="Subs"
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

