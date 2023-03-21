import { useState } from 'react';
import { useDrop } from 'react-dnd';
import './dradndrop.css'


const DroppableContainer = ({ handleDrop, handleRemove }) => {
    const [droppedItem, setDroppedItem] = useState(null);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'draggableTextField',
        drop: (item) => {
            handleDrop(item);
            setDroppedItem(item);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const onRemoveClick = () => {
        handleRemove(droppedItem);
        setDroppedItem(null);
    };

    return (
        <div className="dropContainer"
            ref={drop}
            style={{ backgroundColor: isOver ? '#e6f7ff' : 'inherit' }}
        >
            {droppedItem ? ( <>
                    <div>{droppedItem.content}</div>
                    <div className="removeButton" onClick={onRemoveClick}>
                        Remove
                    </div>
                </>
            ) : (
                <div>Drop a text field here</div>
            )}
        </div>
    );
};

export default DroppableContainer;
