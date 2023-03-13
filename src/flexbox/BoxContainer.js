import styled from 'styled-components';
import {useDrag, useDrop} from "react-dnd";
import {useState, useRef} from "react";
import Box from "./Box";

const BoxWrapper = styled.div`
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  opacity: ${props => (props.isDragging ? 0.5 : 1)};
`;

const BoxContainerWrapper = styled.div`
    position: relative;
    width: 220px;
    height: 800px;
    border: 1px solid black;
    overflow: auto;
    opacity: ${props => (props.isDragging ? 0.5 : 1)};
`;

const BoxContainer = ({ players, maxComponents, canDrag, x, y, onDrop }) => {
    const [components, setComponents] = useState([]);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'ITEM',
        drop: (item, monitor) => {
            if (components.length < maxComponents) {
                setComponents([...components, {id: components.length+1, text: item.text}]);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            anDrop: monitor.canDrop(),
        }),
    }));

    const playersWithPosition = players.map((player, index) => {
        const left = 10; // set the left position
        const top = index * 40; // set the top position
        return {...player, left, top}; // return a new object with the left and top properties added
    });


    return (
        <BoxContainerWrapper ref={drop} isDragging={components.length > maxComponents} onDrop={onDrop}>
            {playersWithPosition.map((player) => (
                <BoxWrapper
                    key={player.id}
                    width={180}
                    height={50}
                    x={player.left}
                    y={player.top}
                    isOver={isOver}
                >
                    <Box
                        width={180}
                        height={50}
                        x={player.left}
                        y={player.top}
                        text={player.name}
                        onDrop={onDrop}
                    />
                </BoxWrapper>
            ))}
        </BoxContainerWrapper>
    );
};

export default BoxContainer;