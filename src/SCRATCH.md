Tidyup extra variables passed to/from Box and TeamsheetContainer

Panel
GW - HK
GW - IC - Crash

Subs
CL - ST
CL - EH Charlie doubled on 2nd / 3rd EH at top CL gone.

Add functionality to Cancel and Save Buttons

Add Drop capability to Panel and Subs


This is a Container which allows a component Box to be dropped onto it, I need to get access to the id of the object in the Box, so far all I am getting back are empty strings


'onClick is not a function' error


const PanelContainer = ({ panel, onDrop, onDropContainer, }) => {
const container = "panel"
let nextRow = 0
let index = 0;
let id

    const handleBoxClick = (sourceId) => {
        // Handle the box click event with the id of the clicked box
        id = sourceId
        console.log(`Box ${id} clicked!`);

    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.setData("boxId", id);
        event.dataTransfer.setData("boxIndex", index);
        event.dataTransfer.setData("boxType", "box");
    };

    const handleDrop = (newBox, containerId, item, draggedItemIndex) => {
        const droppedBoxId = item.id;

        // Call the onDropContainer function with the dropped box information
        onDropContainer(droppedBoxId, item.index, "box", container);
    };




    // const handleDrop = (event) => {
    //     event.preventDefault();
    //     event.stopPropagation();
    //
    //     const droppedBoxId    = event.dataTransfer.getData("boxId");
    //     const droppedBoxIndex = event.dataTransfer.getData("boxIndex");
    //     const droppedBoxType  = event.dataTransfer.getData("boxType");
    //
    //     // Call the onDrop function with the dropped box information
    //     onDropContainer(droppedBoxId, droppedBoxIndex, droppedBoxType, container);
    // };

    showList("Panel-Container: " , panel)
    return (
        <Container className="panel-container" onDragOver={handleDragOver} onDrop={handleDrop}>
            { panel.map(( member, index ) => {
                const top = nextRow;
                console.log("Index: "+index+ ", id: "+member.id+", name: " +member.name)

                nextRow += 60; // Increment nextRow by 50 for the next iteration

                return (
                    <Box
                        index           = {index}
                        key             = {index}
                        id              = {member.id}
                        player          = {member}
                        width           = {150}
                        height          = {50}
                        x               = {0}
                        y               = {top}
                        onDrop          = {onDrop}
                        style           = {{marginLeft : "5px"}}
                        onClick         = {handleDrop}
                    />
                );
            })}
        </Container>
    );
};



const Box = ({ index, id, player, width, height, x, y, onDrop, style , onClick}) => {
const ref = useRef(null);

    const handleClick = (id) => {
        // Call the onClick callback function with the box id
        console.log("HandleClick: " + id)
        onClick(id);
    };


    const [{ isDragging }, drag] = useDrag(() => ({
        type: "ITEM",
        item: { id, player, index },
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
