import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DroppableContainer from './DroppableContainer';
import DraggableList from './DraggableList';
import { reorder } from '../../helper';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './dradndrop.css'


const Example = (props) => {

    const [draggedItems, setDraggedItems] = useState([]);

    const [containers, setContainers] = useState([...Array(4)].map((_, i) => ({ id: `${i}`, content: null }))    );
    const [items, setItems] = useState(        [...Array(30)].map((_, i) => ({ id: `${i}`, content: `Text Field ${i}` }))    );

    const handleReturn = (id, item) => {
        const newItems = [...items];
        const index = newItems.findIndex((elem) => elem.id === id);
        newItems.splice(index, 0, item);
        setItems(newItems);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) {
            return;
        }


    const newItems = reorder(items, result.source.index, result.destination.index);
        setItems(newItems);
    };
    const handleDrop = (item) => {
        setDraggedItems((prevState) => [...prevState, item]);
    };

    const handleRemove = (item) => {
        setDraggedItems((prevState) => prevState.filter((i) => i.id !== item.id));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="dndContainer">
                    <DroppableContainer handleDrop={handleDrop} handleRemove={handleRemove} />
                    <DroppableContainer handleDrop={handleDrop} handleRemove={handleRemove} />
                    <DroppableContainer handleDrop={handleDrop} handleRemove={handleRemove} />
                    <DroppableContainer handleDrop={handleDrop} handleRemove={handleRemove} />
                </div>
                <br/>
                <div className="dndContainer">
                    <DraggableList data={props.data} handleReturn={handleReturn} />
                </div>
            </DragDropContext>
        </DndProvider>
    );
};

export default Example;

