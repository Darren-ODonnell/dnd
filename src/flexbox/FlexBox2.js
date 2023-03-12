import React from "react";
import './flexbox2.css'
import {RowOfThree, RowKeeper, RowOfTwo, ColPanel, ColSubs, SingleBox} from './TeamLayoutBlocks'
import styled from "styled-components";
import DraggableList from "../dragndrop/DraggableList";
import {DndProvider} from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../dragndrop/dradndrop.css'

const Layout = ({data}) => {
    // cell dimensions
    const height = 60 // position  cell height
    const width = 150 // position cell width

    const cells = 12 // height of column in posn locations
    // column dimensions
    const colHeight = height * cells
    const colWidth = width
    const spacer = width / 4
    const margin = spacer
    let startRow = margin

    const dragColWidth = width + 30



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
        width: ${dragColWidth* 2 + width * 3 + spacer * 6  }px;
        background: green;
        border-radius: 10px;
      `;

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
