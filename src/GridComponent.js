import React from 'react';
import { Grid } from '@mui/material';

const GridComponent = () => {

    const gridStyles = {
        height: '800px',
        width: '1000px',
        border: '1px solid black',
    };

    const columnStyles = {
        height: '100%',
        width: '150px',
        border: '1px solid black',
    };
    const cellStyles = {
        border: '1px solid black',
        height: '5%',
        width: '80px',
    };

    return (
        <Grid container sx={gridStyles} >
            <Grid item xs={12} sm={1} key={1} sx={{ ...columnStyles}}>     Draggable List      </Grid>
            <Grid>
                <item xs={4}  sm={4}  key={2}  sx={{ ...cellStyles}}>      Left of Goal Keeper </item>
                <item xs={2}  sm={2}  key={3}  sx={{ ...cellStyles}}>      Goal Keeper         </item>
                <item xs={4}  sm={4}  key={4}  sx={{ ...cellStyles}}>      Right of Goal Keeper</item>
                <item xs={12} sm={10} key={22} sx={{ ...cellStyles}}>      Droppable List      </item>
            </Grid>

            <Grid item xs={12} sm={1} key={1212} sx={{ ...columnStyles }}> Droppable List      </Grid>
            {/*<Grid item xs = {1} sm = {1} key = {2} sx  = {cellStyles}>   Column {2}      </Grid>*/}
            {/*<Grid item xs = {1} sm = {1} key = {3} sx  = {cellStyles}>   Column {3}      </Grid>*/}
            {/*<Grid item xs = {1} sm = {1} key = {4} sx  = {cellStyles}>   Column {4}      </Grid>*/}
            {/*<Grid item xs = {1} sm = {1} key = {5} sx  = {cellStyles}>   Column {5}      </Grid>*/}
            {/*<Grid item xs = {1} sm = {1} key = {6} sx  = {cellStyles}>   Column {6}      </Grid>*/}
            {/*<Grid item xs = {1} sm = {1} key = {7} sx  = {cellStyles}>   Column {7}      </Grid>*/}
            {/*<Grid item xs = {1} sm = {1} key = {8} sx  = {cellStyles}>   Column {8}      </Grid>*/}
            {/*<Grid item xs = {1} sm = {1} key = {9} sx  = {cellStyles}>   Column {9}      </Grid>*/}
            {/*<Grid item xs = {1} sm = {1} key = {10} sx = {cellStyles}>   Column {10}     </Grid>*/}
            {/*<Grid item xs = {1} sm = {1} key = {11} sx = {cellStyles}>   Column {11}     </Grid>*/}


        </Grid>
    );
};

export default GridComponent;
