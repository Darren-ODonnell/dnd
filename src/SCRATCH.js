Ok I have reduced the Teanmsheet Container code
My problem is the same - When I update the screen the data that the Box gets does not change




const TeamsheetContainer = ({panel,team, subs, onDrop}) => {
    const handleDrop = (box, containerId) => {
        // handle the drop event
        console.log("Box dropped into container", containerId);
        onDrop()
    };
    // const [source, setSource] = useState(panel);

    // useEffect(() => {
    //     setSource(panel);
    // }, [panel]);

    console.log("Panel: TeamsheetContainer() - " + panel.map(m => {return m.name + " - "}))

    return (
        <Container className="teamsheet-container container mx-auto" style={{height:'800px'}}>
            <PanelContainer  panel  = {panel} onDrop = {onDrop}/>
            {/*<TeamContainer   team   = {team}  onDrop = {onDrop}/>*/}
            {/*<SubsContainer   subs   = {subs}  onDrop = {onDrop}/>*/}
            {/*<ActionContainer                  />*/}
        </Container>
    )
}
export default TeamsheetContainer;

const PanelContainer = ({ panel, onDrop }) => {
    let nextRow = 0
    console.log("Panel: inside  PanelContainer() - " + panel.map(m => {return m.name + " - "}))
    return (

        <Container className="panel-container" >
            { panel.map(( member ) => {
                const top = nextRow;
                nextRow += 60; // Increment nextRow by 50 for the next iteration
                console.log("Panel: inside  PanelContainer() - " + panel.map(m => {return m.name + " - "}))
                return (
                    <Box
                        key={member.id}
                        id={member.id}
                        player={member}
                        width={150}
                        height={50}
                        x={0}
                        y={top}
                        onDrop={onDrop}
                        style={{marginLeft: "5px"}}
                        source={panel}
                    />
                );
            })}
        </Container>
    );
};