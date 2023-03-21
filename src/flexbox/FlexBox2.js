import React, {useEffect, useState} from "react";
import {RowOfThree, RowKeeper, RowOfTwo, SingleBox} from './TeamLayoutBlocks'
import styled from "styled-components";
import {DndProvider} from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import {Button} from "@mui/material"; // Replace with the path to your grass texture image file
import '../dragndrop/dradndrop.css'
import './flexbox2.css'
import grassTexture from '../media/Background-Grass.png';
import BoxContainer from "./BoxContainer";

const panelList = [
    { id: 1 , name: "John Smith"           , position: "Forward" },
    { id: 2 , name: "Mary Johnson"         , position: "Midfielder" },
    { id: 3 , name: "James Williams"       , position: "Defender" },
    { id: 4 , name: "Elizabeth Brown"      , position: "Goalkeeper" },
    { id: 5 , name: "David Garcia"         , position: "Forward" },
    { id: 6 , name: "Sarah Lee"            , position: "Midfielder" },
    { id: 7 , name: "Michael Martin"       , position: "Defender" },
    { id: 8 , name: "Emily Davis"          , position: "Goalkeeper" },
    { id: 9 , name: "Christopher Rodriguez", position: "Forward" },
    { id: 10, name: "Ashley Martinez"      , position: "Midfielder" },
    { id: 11, name: "Matthew Hernandez"    , position: "Defender" },
    { id: 12, name: "Samantha Lopez"       , position: "Goalkeeper" },
    { id: 13, name: "Joshua Gonzalez"      , position: "Forward" },
    { id: 14, name: "Amanda Taylor"        , position: "Midfielder" },
    { id: 15, name: "Kevin Phillips"       , position: "Defender" },
    { id: 16, name: "Aubrey Martinez"      , position: "Midfielder" },
    { id: 17, name: "Mark Hernandez"       , position: "Defender" },
    { id: 18, name: "Sam Lopez"            , position: "Goalkeeper" },
    { id: 19, name: "Jimmy Gonzalez"       , position: "Forward" },
    { id: 20, name: "Joan Taylor"          , position: "Midfielder" },
    { id: 21, name: "Paul Phillips"        , position: "Defender" },
];



const Layout = ({data}) => {
    // const [team, setTeam] = useState([])
    // const [subs, setSubs] = useState([])
    // const [panel, setPanel] = useState([])
    // const [players, setPlayers] = useState([])
    // const [teamsheet, setTeamsheet] = useState([])
    // const [fixtureDate, setFixtureDate] = useState(new Date())
    // // const [data, error, loading, axiosApi] = useAxios()
    //
    // const handleTeamChange = (e) => {
    // }
    // const handleSubsChange = (e) => {
    // }
    // const handlePanelChange = (e) => {
    //
    // }





    // cell dimensions
    const height = 60 // position  cell height
    const width = 150 // position cell width

    const cells = 12 // height of column in posn locations
    // column dimensions
    const colHeight = height * cells
    const spacer = width / 4
    const margin = spacer
    let startRow = margin // creates clear space at the top of the container

    const dragColWidth = margin + width + 30 // width of the left and right columns

    const threeColStart = dragColWidth + spacer + margin
    const twoColStart = dragColWidth + spacer * 3
    const keeperColStart = dragColWidth + spacer * 4
    const keeperRow = 20
    const rowSpace = height

    const panelStartCol = margin;
    const panelStartRow = margin;
    const subsStartCol = margin + dragColWidth + spacer * 16 // dragColWidth + width * 3 + spacer*4

    const subsStartRow = margin

    const Container = styled.div`
        position: absolute;
        top: 50px;
        left: 50px;
        border: 2px solid black;
        height: ${colHeight + margin * 2}px;
        width: ${dragColWidth* 2 + width * 3 + spacer * 6 }px;
        background: green;
        border-radius: 10px;
      background: url(${grassTexture});
      `;

    const buttonCommon = {
        position: 'absolute',
        top: 730,
        height: 50,
        width: width,
        type: "",
        variant: "outlined",
        color: 'white',
        borderRadius: 15,
    }


    const buttonSaveStyle = {
        ...buttonCommon,
        left: margin + dragColWidth + spacer * 3,
        type: "submit",
        backgroundColor: '#3f51b5',
    }
    const buttonCancelStyle = {
        ...buttonCommon,
        left: 570,
        backgroundColor: '#f50057',
    }


    const handleFormSubmit = ({formValues, setOpen, error}) => {
        console.log("FlexBox : Save Clicked")
    }

    const handleClose = () => {
        console.log("FlexBox : Cancel Close Clicked")
    }

    const handleDrop = (data, source) => {
        // Handle the data that was dropped
        // determine what dropped the object
        // remove the name from that object
        // is there an object already there in box object
        // remove object from box object
        // add new object to box
        // add removed object from Panel / Subs
        // add removed object from box to Panel

        console.log("Data: "+data+" Source: "+source);
    }

    return (
        <>
            <Container>
                {/*<SingleBox  colStart = {panelStartCol}  rowStart = {panelStartRow}                   height   = {height * cells-7 } width = {dragColWidth} posn = {"Panel"} gap={spacer}/>*/}
                <BoxContainer maxComponents={80} canDrag={false} players={panelList} x={0} y={0} onDrop={handleDrop}/>

                <RowKeeper  colStart = {dragColWidth + spacer * 6} rowStart = {startRow}                        height   = {height} width = {width} posn = {1} gap={spacer}/>
                <RowOfThree colStart = {threeColStart}  rowStart = {startRow  += rowSpace + height}  height   = {height} width = {width} posn = {2} gap={spacer} onDrop={handleDrop}/>
                <RowOfThree colStart = {threeColStart}  rowStart = {startRow  += rowSpace + height}  height   = {height} width = {width} posn = {5} gap={spacer} onDrop={handleDrop}/>
                <RowOfTwo   colStart = {twoColStart}    rowStart = {startRow  += rowSpace + height}  height   = {height} width = {width} posn = {8} gap={spacer} onDrop={handleDrop}/>
                <RowOfThree colStart = {threeColStart}  rowStart = {startRow  += rowSpace + height}  height   = {height} width = {width} posn = {10} gap={spacer} onDrop={handleDrop}/>
                <RowOfThree colStart = {threeColStart}  rowStart = {startRow  += rowSpace + height}  height   = {height} width = {width} posn = {13} gap={spacer} onDrop={handleDrop}/>
                {/*<BoxContainer maxComponents={80} canDrag={false} players={players} x={8000} y={0}/>*/}
                <SingleBox  colStart = {margin + subsStartCol - 40}   rowStart = {subsStartRow}                    height   = {colHeight -7 } width = {dragColWidth} posn = {"Subs"} gap={spacer} onDrop={handleDrop}/>

                <Button onClick={() => handleClose()}  style={buttonSaveStyle}                      >Cancel </Button>
                <Button onClick={() => handleFormSubmit()} style={buttonCancelStyle} type="submit"  >Save   </Button>
            </Container>

        </>
    )
}

export const  FlexBox2 = (data) => {
    return (
        <DndProvider backend={HTML5Backend}>
            <Layout data={data}/>
        </DndProvider>
    );
}

export default FlexBox2;
