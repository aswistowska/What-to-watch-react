import React from "react";
import {Mongo} from 'meteor/mongo';
import {withTracker} from 'meteor/react-meteor-data';

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

})(FetchMovies)
