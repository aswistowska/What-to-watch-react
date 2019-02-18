import {Fragment} from "react";
import React from "react";
import {Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { withTracker } from 'meteor/react-meteor-data';

import {withStyles} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import AlertDialogWithTracker from './AlertDialog';
import Movie from "./Movie";
import {Favourites} from "../api/collections";

const styles = {
    input: {
        display: 'none',
    },
    button: {
        border: '2px solid white',
        marginLeft: '10px',
    }
};


function IconButtons(props) {
    const {classes} = props;

    return (
        <Tooltip title='Add to favourites'>
        <IconButton onClick={props.onClick} color="secondary" className={classes.button} aria-label="Add to favourites">
            {props.isFavourite === 1 ? (<Icon>favorite</Icon>) : (<Icon style={{color: 'white'}}>favorite_border</Icon>)}
        </IconButton>
        </Tooltip>
    );
}


const IconButtonsWithStyles = withStyles(styles)(IconButtons);

function MovieDetails(props) {
    const background_image_url = props.movie.backdrop_path ? `, url(https://image.tmdb.org/t/p/w1400_and_h450_face/${props.movie.backdrop_path})` : '';
    return (
        <Fragment>
            <div className='movieDetails'
                 style={{backgroundImage: `linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.8))${background_image_url}`}}>
            <h1>{props.movie.tagline}</h1>
                <AlertDialogWithTracker />
            <div className='movie-details-container'>
                {props.movie.poster_path ? (<img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${props.movie.poster_path}`}/>) : ''}
                <div className='movie-details-contents'>
                    <h2>{props.movie.title}<span>({props.movie.release_date.substring(0,4)})</span></h2>
                    <p>{props.movie.runtime} min</p>
                    <p>{props.movie.vote_average}/10 <IconButtonsWithStyles onClick={props.toggleFavourite} isFavourite={props.movie.isFavourite}/></p>
                    <h3>Overview</h3>
                    <p>{props.movie.overview}</p>
                </div>
            </div>
            </div>
        </Fragment>
    );
}

export default MovieDetails;