import Box from '../../muigrid/Box'
import React from "react";

let text = "start"

export const RowOfThree = ({width, height, colStart, rowStart, posn, gap, onDrop}) => {

    return (
        <>
            <Box width = {width} height = {height} x = {colStart}       y = {rowStart} label={posn}  onDrop={onDrop}     />
            <Box width = {width} height = {height} x = {colStart + width + gap }   y = {rowStart} label={posn + 1 } onDrop={onDrop}/>
            <Box width = {width} height = {height} x = {colStart + width * 2 + gap*2 }   y = {rowStart} label={posn + 2} onDrop={onDrop}/>
        </>
    );
}
export const RowOfTwo = ({width, height, colStart, rowStart, posn, gap, onDrop}) => {
    return (
        <>
            <Box width = {width} height = {height} x = {colStart}   y = {rowStart} text={posn}   onDrop={onDrop}  />
            <Box width = {width} height = {height} x = {colStart + width + gap * 2} y = {rowStart} label={posn + 1} onDrop={onDrop}/>
        </>
    );
}
export const RowKeeper = ({width, height, colStart, rowStart, posn, gap, onDrop}) => {
    return (
        <>
            <Box width = {width} height = {height} x = {colStart}               y = {rowStart} label={ posn } onDrop={onDrop}/>
        </>
    );
}
export const SingleBox = ({width, height, colStart, rowStart, posn, onDrop}) => {
    return (
        <>
            <Box width = {width} height = {height} x = {colStart}               y = {rowStart} text={ posn } onDrop={onDrop}/>
        </>
    );
}
