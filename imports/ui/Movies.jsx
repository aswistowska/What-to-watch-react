import React, {Component, Fragment, useState, useEffect} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import Movies from '../api/movies';
import Movie from './Movie';
import axios from 'axios';

import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';


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
};


const BASIC_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = 'api_key=b73a05f4286a2af4e2caf142d739fcd7';

function urlBuilder(category) {
    return BASIC_URL + category + '?' + API_KEY;
}

function FetchMovies(props) {
    const [moviesState, setMovies] = useState([]);

    useEffect(() => {
        axios.get(urlBuilder(props.category))
            .then(({data}) => {
                setMovies(data.results)
            })
            .catch(function (error) {
                console.log(error);
            });
    });

    return (
        <MoviesContainer movies={moviesState}/>
    )
}

function MoviesContainer(props) {
    return (
        <div className='moviesContainer'>
            {props.movies.map((movie) => <Movie key={movie.id} movie={movie}/>)}
        </div>
    )
}

class CenteredTabs extends React.Component {

    render() {
        const {classes, category} = this.props;

        return (
            <Paper className={classes.root}>
                <Tabs
                    value={category}
                    onChange={this.props.handleChange}
                    indicatorColor='primary'
                    textColor="primary"
                    centered
                >
                    <Tab label="popular" value='popular'/>
                    <Tab label="Top Rated" value='top_rated'/>
                    <Tab label="Now Playing" value='now_playing'/>
                    <Tab label="Favourites" value='favourites'/>
                </Tabs>
            </Paper>
        );
    }
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