import { DataGrid } from '@mui/x-data-grid';
import {Button, Grid, Paper} from "@mui/material";
import Box from "../flexbox/Box";
import { Container, Row, Col } from 'react-bootstrap';

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 100 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'address', headerName: 'Address', width: 300 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'zip', headerName: 'ZIP', width: 100 },
];

const rows = [
    { id: 1, firstName: 'John', lastName: 'Doe', age: 35, email: 'johndoe@example.com', phone: '555-555-5555', address: '123 Main St', city: 'Anytown', state: 'CA', zip: '12345' },
    { id: 2, firstName: 'Jane', lastName: 'Doe', age: 30, email: 'janedoe@example.com', phone: '555-555-5555', address: '123 Main St', city: 'Anytown', state: 'CA', zip: '12345' },
    { id: 3, firstName: 'Bob', lastName: 'Smith', age: 40, email: 'bobsmith@example.com', phone: '555-555-5555', address: '123 Main St', city: 'Anytown', state: 'CA', zip: '12345' },
];


const teamsheetContainerStyle = {
        marginTop: '20px',
        marginLeft: '20px',
        width: '1000px',
        height: '800px',
        border: '1px solid black',
        position: 'relative',
        backgroundColor: 'lightblue',
}
const panelContainerStyle     = {
        width: '18%',
        height: '100%',
        border: '1px solid red',
        float: 'left',
        position: 'absolute',
        top: '0',
        left: '0',
}
const teamContainerStyle      = {
        position: 'absolute',
        top: '0',
        width: '64%',
        height: '90%',
        border: '1px solid green'
}
const subsContainerStyle      = {
        width: '18%',
        height: '100%',
        border: '1px solid purple',
        float: 'right',
        position: 'absolute',
        right: '0',
        backgroundColor: 'lightblue',
}
const actionContainerStyle    = {
        position: 'absolute',
        bottom: '0',
        float: 'bottom',
        width: '64%',
        height: '10%',
        border: '1px solid pink',
}

const TeamsheetContainer = ({panel, team, subs}) => {
    return (
        <Container style={teamsheetContainerStyle} >
            <PanelContainer  panel  = {panel} />
            <TeamContainer   team   = {team}  />
            <SubsContainer   subs   = {subs}  />
            <ActionContainer                  />

        </Container>
    )
}
export default TeamsheetContainer;

const PanelContainer  = ({panel}) => {
    return (
            <Container style={panelContainerStyle} />
    )
}
const TeamContainer   = ({team}) => {

    return (
            <Container style={teamContainerStyle} >
                <Keeper />
            </Container>
    )
}
const SubsContainer   = ({subs}) => {
    return (
            <Container style={subsContainerStyle} />
    )
}
const ActionContainer = () => {
    return (
        <Container style={actionContainerStyle} >
            <Button>Cancel</Button>
            <Button>Save</Button>
        </Container>
    )
}

const Keeper       = () => {
    const boxWidth = 130;
    const boxHeight = 50;
    const boxX = "50%";
    const boxY = "10%";

    const boxStyle = {
        position: "absolute",
        top: boxY,
        left: `calc(${boxX} - ${boxWidth / 2}px)`,
        float: 'center',
    };

    return (
        <Box
            width={boxWidth}
            height={boxHeight}
            x={boxX}
            y={boxY}
            id="box1"
            name="Box 1"
            onDrop={(box, id) => console.log("Dropped box: ", box, " ID: ", id)}
            style={boxStyle}
        />
    )
}
// const FullBacks    = () => {
//
// }
// const HalfBacks    = () => {
//
// }
// const Midfield     = () => {
//
// }
// const HalfForwards = () => {
//
// }
// const FullForwards = () => {
//
// }
