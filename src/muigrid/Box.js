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
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
`;

const Box = ({ width, height, x, y, id, player, onDrop, style , source}) => {
    let dest = []
    const ref = useRef(null);

    // console.log("Panel: Box() - " + source.map(m => {return m.name + " - "}))

    const [{ isDragging }, drag] = useDrag(() => ({

        type: "ITEM",
        item: { player, source },
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

            console.log("Panel: useDrop() - " + source.map(m => {return m.name + " - "}))
            onDrop(        newBox,id,       item,    player,     dest);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }),[source]);

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
        backgroundColor: "lightblue",
        borderRadius: "10px",
        border: "5px solid blue",
        // display: "flex",
        fontSize: "16px",
        // textAlign: 'center',
        cursor: "move",
        justifyContent: "center",

        opacity: isDragging ? 0.5 : 1,
        marginLeft: '5px',
        ...style,
    };

    return (
        <BoxWrapper
            ref={ref}
            style={styles}
            isDragging={isDragging}
            isOver={isOver}
        >
            {player.name}
        </BoxWrapper>
    );
};

export default Box;
