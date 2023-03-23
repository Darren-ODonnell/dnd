import {useDrag, useDrop} from "react-dnd";
import styled from "styled-components";
import {findId} from "./VariableGrid";
import React, { useRef, useEffect, useState } from 'react';

const BoxWrapper = styled.div`
  position: absolute;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  background-color: lightblue;
  border-radius: 10px;
  border: 5px solid lightblue;
  display: flex;
  font-size: 20px;
  cursor: move;
  draggable: true;
  background-color: ${(props) => (props.isOver ? "lightblue" : "lightgray")};
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
`;


const Box = ({ index, id, player, width, height, x, y, onDrop, style , onClick}) => {
    const ref = useRef(null);

    const handleClick = (id) => {
        // Call the onClick callback function with the box id
        console.log("HandleClick: " + id)
        onClick(id);
    };


    const [{ isDragging }, drag] = useDrag(() => ({
        type: "ITEM",
        item: { player, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: "ITEM",
        drop: (item, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset();
            const left = Math.round(x + delta.x);
            const top = Math.round(y + delta.y);
            const newBox = { left, top, id };

            const initialSourceClientOffset = monitor.getInitialSourceClientOffset();
            const draggedItemIndex = Math.floor(initialSourceClientOffset.y / 60);


            console.log("OnDrop - id: " + id + ", item.player.id: " + item.player.id + ", player.id: " + player.id)

            onDrop(newBox, id, item, draggedItemIndex);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    useEffect(() => {
        const node = ref.current;
        drag(drop(node));
    }, [drag, drop]);

const styles = {
    position       : "absolute",
    width          : `${width}px`,
    height         : `${height}px`,
    top            : `${y}px`,
    left           : `${x}px`,
    backgroundColor: "lightblue",
    borderRadius   : "10px",
    border         : "5px solid blue",
    // display: "flex",
    fontSize       : "16px",
    // textAlign: 'center',
    cursor         : "move",
    justifyContent : "center",
    opacity        : isDragging ? 0.5: 1,
    marginLeft     : '5px',
    ...style,
};

    return (
        <div className="box" onClick={() => handleClick(id)}>
            <BoxWrapper
                ref={ref}
                style={styles}
                isDragging={isDragging}
                isOver={isOver}
            >
                {player.name}
            </BoxWrapper>
        </div>
    );
};

export default Box;


//
// const Box = ({ id, player, width, height, x, y, onDrop, style }) => {
//     const ref = useRef(null);
//
//
//     const [{ isDragging }, drag] = useDrag(() => ({
//         type: "ITEM",
//         item: { player },
//         collect: (monitor) => ({
//             isDragging: monitor.isDragging(),
//             // canDrop: monitor.canDrop(),
//         }),
//     }));
//
//     const [{ canDrop, isOver }, drop] = useDrop(() => ({
//         accept: "ITEM",
//         drop: (item, monitor) => {
//
//             const delta = monitor.getDifferenceFromInitialOffset();
//             const left = Math.round(x + delta.x);
//             const top = Math.round(y + delta.y);
//             const newBox = { left, top, id };
//
//             console.log("OnDrop - id: "+id + ", item.player.id: "+item.player.id + ", player.id: " +player.id )
//
//             onDrop(        newBox,id,       item,    player);
//         },
//         collect: (monitor) => ({
//             isOver: monitor.isOver(),
//             canDrop: monitor.canDrop(),
//         }),
//     }));
//
//     useEffect(() => {
//         const node = ref.current;
//         drag(drop(node));
//     }, [drag, drop]);
//
//     const styles = {
//         position       : "absolute",
//         width          : `${width}px`,
//         height         : `${height}px`,
//         top            : `${y}px`,
//         left           : `${x}px`,
//         backgroundColor: "lightblue",
//         borderRadius   : "10px",
//         border         : "5px solid blue",
//         // display: "flex",
//         fontSize       : "16px",
//         // textAlign: 'center',
//         cursor         : "move",
//         justifyContent : "center",
//         opacity        : isDragging ? 0.5: 1,
//         marginLeft     : '5px',
//         ...style,
//     };
//
//     return (
//         <BoxWrapper
//             ref={ref}
//             style={styles}
//             isDragging={isDragging}
//             isOver={isOver}
//         >
//             {player.name}
//         </BoxWrapper>
//     );
// };
//
// export default Box;
//
