import React, {Fragment, useState} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Link} from "react-router-dom";

import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import {FetchMovies} from "./FetchMovies";


const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },

    palette: {
        primary: {
            main: '#8BC34A',
            dark: '#689F38',
            light: '#DCEDC8'
        },
        secondary: {
            main: '#9c27b0',
            dark: '#6a1b9a',
            light: '#E040FB',
        },

        text: {
            main: '#212121',
            dark: '#757575',
            light: '#BDBDBD'
        }
    },
});


const styles = {
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
};

function CenteredTabs(props) {
    const {classes, category} = props;

    return (
        <div className='tabCustomStyle'>
            <Button size="large" variant="contained" color="secondary" className={classes.button}
                    component={Link} to="/">
                Home
            </Button>
            <Paper className={classes.root}>
                <Tabs
                    value={category}
                    onChange={props.handleChange}
                    indicatorColor='primary'
                    textColor="primary"
                    centered
                >
                    <Tab label="popular" value='popular' component={Link} to="/movies/popular"/>
                    <Tab label="Top Rated" value='top_rated' component={Link} to="/movies/top_rated"/>
                    <Tab label="Now Playing" value='now_playing' component={Link} to="/movies/now_playing"/>
                    <Tab label="Favourites" value='favourites' component={Link} to="/movies/favourites"/>
                </Tabs>
            </Paper>
            <Button size="large" variant="contained" color="secondary" className={classes.button}
                    component={Link} to="/log_in">
                Log in
            </Button>
        </div>
    );
}



const StyledTabs = withStyles(styles)(CenteredTabs);

function MoviesPage(props) {
    const [category, setCategory] = useState('popular');

    return (
        <Fragment>
            <MuiThemeProvider theme={theme}>
                <StyledTabs category={category} handleChange={(event, value) => setCategory(value)}/>
                <h1>It's movies time!</h1>
                <FetchMovies category={category}/>
            </MuiThemeProvider>
        </Fragment>
    );
}

// export default MoviesContainer = withTracker(() => {
//     return {
//         movies: json.results,
//     };
// })(MoviesContainer);
export default MoviesPage;