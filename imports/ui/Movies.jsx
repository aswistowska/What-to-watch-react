import React, {Fragment} from 'react';
import {withTracker} from 'meteor/react-meteor-data';

import MoviesContainer from './MoviesContainer';
import {MoviesListsCache} from '../api/collections';

import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import Loading from "./Loading";


const style = theme => {
    return {
        flex: {
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: theme.spacing.unit,
            paddingBottom: theme.spacing.unit
        }
    }
};

function pageUrl(category, page) {
    return `/movies/${category}/${page}`
}

const Paginator = withStyles(style)((props) => {
    const classes = props.classes;
    const page = parseInt(props.page);
    const isLast = page >= parseInt(props.totalPages);
    const isFirst = page <= 1;

    return (
        <div className={classes.flex}>
            <Button disabled={isFirst} component={Link} to={pageUrl(props.category, page + 1)} color='secondary'>
                Previous</Button>
            <Button disabled={isLast} component={Link} to={pageUrl(props.category, page + 1)} color='secondary'>
                Next</Button>
        </div>
    )
});


function MoviesPage(props) {
    return (
        <Fragment>
            <h1>It's movies time!</h1>
            {props.loading ? (
                <Loading/>
            ) : (
                <>
                    <Paginator {...props}/>
                    <MoviesContainer movies={props.moviesList}/>
                    <Paginator {...props}/>
                </>
            )}
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

})(MoviesPage);