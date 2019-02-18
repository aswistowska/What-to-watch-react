import React, {Fragment} from 'react';
import {withTracker} from 'meteor/react-meteor-data';

import MoviesContainer from './MoviesContainer';
import {MoviesListsCache} from '../api/collections';

import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';


function MoviesPage(props) {

    return (
        <Fragment>
            <h1>It's movies time!</h1>
            <MoviesContainer movies={props.moviesList}/>
            <Button component={Link} to={`/movies/${props.category}/${parseInt(props.page) > 1
                ? parseInt(props.page) - 1 : props.page}`} color='secondary'>
                Previous</Button>
            <Button component={Link} to={`/movies/${props.category}/${parseInt(props.page) < parseInt(props.totalPages)
                ? parseInt(props.page) + 1 : props.page}`} color='secondary'>
                Next</Button>
        </Fragment>
    );
}

export default MoviesPageWithTracker = withTracker(({category, page}) => {

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

})(MoviesPage)