import React from "react";
import { Mongo } from 'meteor/mongo';
import { withTracker } from 'meteor/react-meteor-data';

import MoviesContainer from './MoviesContainer';
import {MoviesListsCache} from '../api/collections';


function FetchMovies(props) {

    return (
        <MoviesContainer movies={props.moviesList}/>
    )
}

export default FetchMovieswithTracker = withTracker(({category, page}) => {

    const moviesListHandle = Meteor.subscribe('fetchMoviesList', category, page);

    const id = `${category}-${page}`;

console.log(MoviesListsCache.findOne(id));
    const moviesList = moviesListHandle.ready() ? MoviesListsCache.findOne(id).results : [];

    return {
        moviesList: moviesList,
        loading: !moviesListHandle.ready(),
    }
})(FetchMovies)