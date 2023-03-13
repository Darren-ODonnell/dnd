import {useEffect, useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import styled from "styled-components";

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
  opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
`;

const Box = ({ width, height, x, y, id, name, onDrop }) => {
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "ITEM",
        item: { name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            // canDrop: monitor.canDrop(),
        }),
    }));

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: "ITEM",
        drop: (item, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset();
            const left = Math.round(x + delta.x);
            const top = Math.round(y + delta.y);
            const newBox = { left, top, id };
            // Call the onDrop function with the newBox object

            console.log("player id: "+id+ " Player name: "+name)

            onDrop(newBox, id);
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
        position: "absolute",
        width: `${width}px`,
        height: `${height}px`,
        top: `${y}px`,
        left: `${x}px`,
        backgroundColor: "lightgray",
        borderRadius: "10px",
        border: "5px solid lightblue",
        display: "flex",
        fontSize: "24px",
        cursor: "move",
        opacity: isDragging ? 0.5 : 1,
    };

    console.log("OnDrop Box : "+onDrop)
    return (
        <BoxWrapper
            ref={ref}
            style={styles}
            isDragging={isDragging}
            isOver={isOver}
        >
            {name}
        </BoxWrapper>
    );
};

export default Box;

