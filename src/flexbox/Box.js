import { useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Box = ({ width, height, x, y , text}) => {
    const styles = {
        position       : "absolute",
        width          : `${width}px`,
        height         : `${height}px`,
        top            : `${y}px`,
        left           : `${x}px`,
        backgroundColor: "lightgray",
        borderRadius   : '10px',
        border         : '5px solid lightblue',
        display        : 'flex',
        fontSize       : '24px',
    };

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'ITEM',
        drop: (item, monitor) => {
            // Handle drop logic here
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));


    return     <div ref={drop} style={{ ...styles, backgroundColor: isOver ? 'lightblue' : 'lightgray' }}>
        {text}
    </div>
};
export default Box;