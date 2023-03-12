import Box from './Box'
import React from "react";

let text = "start"


export const RowOfThree = ({width, height, colStart, rowStart, posn, gap}) => {

    return (
        <>
            <Box width = {width} height = {height} x = {colStart}       y = {rowStart} text={posn }     />
            <Box width = {width} height = {height} x = {colStart + width + gap }   y = {rowStart} text={posn + 1 }/>
            <Box width = {width} height = {height} x = {colStart + width * 2 + gap*2 }   y = {rowStart} text={posn + 2 }/>
        </>
    );
}
export const RowOfTwo = ({width, height, colStart, rowStart, posn, gap}) => {
    return (
        <>
            <Box width = {width} height = {height} x = {colStart}   y = {rowStart} text={posn}     />
            <Box width = {width} height = {height} x = {colStart + width + gap * 2} y = {rowStart} text={posn + 1 }/>
        </>
    );
}
export const RowKeeper = ({width, height, colStart, rowStart, posn, gap}) => {
    return (
        <>
            <Box width = {width} height = {height} x = {colStart}               y = {rowStart} text={ posn }/>
        </>
    );
}
export const SingleBox = ({width, height, colStart, rowStart, posn}) => {
    return (
        <>
            <Box width = {width} height = {height} x = {colStart}               y = {rowStart} text={ posn }/>
        </>
    );
}

export const ColPanel = () => {
    return (
        <>

        </>
    )
}

export const ColSubs = () => {
    return (
        <>

        </>
    )
}