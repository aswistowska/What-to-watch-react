import {Fragment} from "react";
import React from "react";
import Movies from '../api/movies';

import {withStyles} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';


const styles = {
    input: {
        display: 'none',
    },
};


function IconButtons(props) {
    const {classes} = props;
    return (
        <IconButton color="secondary" className={classes.button} aria-label="Add to favourites">
            <Icon>favorite</Icon>
        </IconButton>
    );
}

const IconButtonsWithStyles = withStyles(styles)(IconButtons);

function MovieDetails(props) {
    return (
        <Fragment>
            <h1>{props.movie.tagline}</h1>
            <div className='movie-details-container'>
                <img src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`}/>
                <div className='movie-details-contents'>
                    <h2>{props.movie.title}</h2>
                    <p>{props.movie.release_date}</p>
                    <p>{props.movie.vote_average} / 10</p>
                    <p>{props.movie.runtime} min</p>
                    <IconButtonsWithStyles/>
                </div>
            </div>
            <p>{props.movie.overview}</p>
        </Fragment>
    );
}

export default MovieDetails;