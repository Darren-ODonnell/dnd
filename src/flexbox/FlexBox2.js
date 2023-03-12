import React, {useEffect, useState} from "react";
import {RowOfThree, RowKeeper, RowOfTwo, SingleBox} from './TeamLayoutBlocks'
import styled from "styled-components";
import {DndProvider} from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import {Button} from "@mui/material"; // Replace with the path to your grass texture image file
import '../dragndrop/dradndrop.css'
import './flexbox2.css'
import grassTexture from '../media/Background-Grass.png';


const Layout = ({data}) => {
    const [team, setTeam] = useState([])
    const [subs, setSubs] = useState([])
    const [panel, setPanel] = useState([])
    const [players, setPlayers] = useState([])
    const [teamsheet, setTeamsheet] = useState([])
    const [fixtureDate, setFixtureDate] = useState(new Date())


    const getPlayers=()=> {

    }
    const getTeamsheet=()=> {

    }
    const getFixtureDate=()=> {

    }
    const getTeam=()=> {

    }
    const getSubs=()=> {

    }
    const getPanel=()=> {

    }


    useEffect(() => {
        setPlayers(getPlayers())
        setTeamsheet(getTeamsheet())
        setFixtureDate(getFixtureDate())
        setTeam(getTeam(teamsheet))
        setSubs(getSubs(teamsheet))
        setPanel(getPanel(teamsheet))
    },[teamsheet])



    // cell dimensions
    const height = 60 // position  cell height
    const width = 150 // position cell width

    const cells = 12 // height of column in posn locations
    // column dimensions
    const colHeight = height * cells
    const spacer = width / 4
    const margin = spacer
    let startRow = margin // creates clear space at the top of the container

    const dragColWidth = width + 30 // width of the left and right columns

    const threeColStart = dragColWidth + spacer
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
        type: "",
        backgroundColor: '#3f51b5',
    }
    const buttonCancelStyle = {
        ...buttonCommon,
        left: 570,
        backgroundColor: '#f50057',
    }


    const handleFormSubmit = ({formValues, setOpen, error}) => {

    }

    const handleClose = () => {

    }


    return (
        <>
            <Container>
                {/*<DraggableList data={data} />*/}
                <SingleBox  colStart = {panelStartCol}  rowStart = {panelStartRow}                   height   = {height * cells-7 } width = {dragColWidth} posn = {"Panel"} gap={spacer}/>
                <RowKeeper  colStart = {margin + dragColWidth + spacer * 6} rowStart = {startRow}                        height   = {height} width = {width} posn = {1} gap={spacer}/>
                <RowOfThree colStart = {margin + threeColStart}  rowStart = {startRow  += rowSpace + height}  height   = {height} width = {width} posn = {2} gap={spacer}/>
                <RowOfThree colStart = {margin + threeColStart}  rowStart = {startRow  += rowSpace + height}  height   = {height} width = {width} posn = {5} gap={spacer}/>
                <RowOfTwo   colStart = {margin + twoColStart}    rowStart = {startRow  += rowSpace + height}  height   = {height} width = {width} posn = {8} gap={spacer}/>
                <RowOfThree colStart = {margin + threeColStart}  rowStart = {startRow  += rowSpace + height}  height   = {height} width = {width} posn = {10} gap={spacer}/>
                <RowOfThree colStart = {margin + threeColStart}  rowStart = {startRow  += rowSpace + height}  height   = {height} width = {width} posn = {13} gap={spacer}/>
                <SingleBox  colStart = {margin + subsStartCol - 40}   rowStart = {subsStartRow}                    height   = {colHeight -7 } width = {dragColWidth} posn = {"Subs"} gap={spacer}/>

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
