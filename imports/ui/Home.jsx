import React, {Fragment} from "react";
import {Meteor} from 'meteor/meteor';

import {withTracker} from 'meteor/react-meteor-data';

import {MoviesListsCache} from "../api/collections";
import {withStyles} from '@material-ui/core/styles';


const styles = theme =>  ({
    root: {
        position: 'relative',
        marginBottom: theme.spacing.unit ,
        height: '100vh',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        flexFlow: 'wrap',
        filter: 'blur(2px)',
        height: '100vh',
        overflow: 'hidden',
        borderRadius: theme.shape.borderRadius,
    },
    foreground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(0,0,0,.8)',
        color: 'white',
        height: '100vh',
        display: 'flex',
        flexFlow: 'column',
    },
    img: {
        //width: '12.5%',
        width: '20%',
        height: '50%',
    },
    homeTitle: {
        fontSize: '80px',
        paddingLeft: '10%',
    },
    homeSubtitle: {
        fontSize: '100px',
        margin: 0,
        paddingLeft: '20%',
    },
    footer: {
        backgroundColor: theme.palette.primary.dark,
        borderRadius: theme.shape.borderRadius,
        textAlign: 'center',
        fontSize: '15px',
        color: theme.palette.text.light,
        padding: '.5%',
    }
});


function Home(props) {
    const classes = props.classes;
    return (
        <Fragment>
        <div className={classes.root}>
            <div className={classes.background}>
                {props.moviesList.map(movie =>
                <img className={classes.img} key={movie.id} src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}/>
                )}
            </div>
            <div className={classes.foreground}>
                <h1 className={classes.homeTitle}>Welcome to</h1>
                <h2 className={classes.homeSubtitle}>What to Watch</h2>
            </div>
        </div>
            <div className={classes.footer}>
                <p>Create by Agata Swistowska</p>
            </div>
        </Fragment>
    );
}

const tracker = () => {
    const moviesListHandle = Meteor.subscribe('fetchMoviesList', 'now_playing', '1');
    const id = 'now_playing-1';

    if (moviesListHandle.ready()) {
        const cached = MoviesListsCache.findOne(id);

        return {
            moviesList: cached.results,
            loading: false,
            totalPages: cached.total_pages,
        }
    }
    return {
        'moviesList': [],
        loading: true,
        totalPages: 0
    }
};

export default withTracker(tracker)(withStyles(styles)(Home));
