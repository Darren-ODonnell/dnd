import React from 'react';
import { useDrag } from 'react-dnd';
import { TextField } from '@mui/material';
import './dradndrop.css'

const DraggableTextField = ( { item }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'draggableTextField',
        collect: (monitor) => ({ isDragging: !!monitor.isDragging(), }),
    }));

    return (
        <div className="draggableList"
             ref={drag}
             style={{ opacity: isDragging ? 0.4 : 1 }}
        >
            <TextField variant="outlined" size="small" width="50%" value={item}/>
        </div>
    );
};

export default DraggableTextField;
