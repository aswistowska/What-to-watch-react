import {Fragment} from "react";
import React from "react";
import {Meteor} from 'meteor/meteor';

import {withStyles} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import Movies from '../api/movies';
import Movie from "./Movie";
import Favourites from "../api/favourites";


const styles = {
    input: {
        display: 'none',
    },
};


function IconButtons(props) {
    const {classes} = props;

    return (
        <IconButton onClick={props.onClick} color="secondary" className={classes.button} aria-label="Add to favourites">
            <Icon>favorite</Icon>
        </IconButton>
    );
}

const IconButtonsWithStyles = withStyles(styles)(IconButtons);

function MovieDetails(props) {
    return (
        <Fragment>

            <div className='movieDetails'
                 style={{backgroundImage: `linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/w1400_and_h450_face/${props.movie.backdrop_path})`}}>
            <h1>{props.movie.tagline}</h1>
            <div className='movie-details-container'>
                <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${props.movie.poster_path}`}/>
                <div className='movie-details-contents'>
                    <h2>{props.movie.title}<span>({props.movie.release_date.substring(0,4)})</span></h2>
                    <p>{props.movie.runtime} min</p>
                    <p>{props.movie.vote_average}/10 <IconButtonsWithStyles onClick={props.toggleFavourite}/></p>
                    <h3>Overview</h3>
                    <p>{props.movie.overview}</p>
                </div>
            </div>
            </div>
        </Fragment>
    );
}

export default MovieDetails;