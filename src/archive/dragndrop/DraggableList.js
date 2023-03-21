import React from 'react';
import DraggableTextField from './DraggableTextField';
import './dradndrop.css'


const DraggableList = ({data}) => {
    return (
        <div className="listContainer">
            {data.map((item) => (
                <DraggableTextField item={item} key={item} />
            ))}
        </div>
    );
};

export default DraggableList;
