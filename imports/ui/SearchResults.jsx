import React, {Fragment} from 'react';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import MoviesContainer from "./MoviesContainer";
import {SearchResultsCache} from '../api/collections';

function SearchResults(props) {
    console.log(props);
    return (
        <Fragment>
        <h1>Search results:</h1>
        <h2>We found for you <span>{props.totalResults} </span>movies</h2>
            <MoviesContainer movies={props.searchedMovies}/>
        </Fragment>
    )
}

export default SearchResultswithTracker = withTracker((props) => {

    const params = new URLSearchParams(props.location);
    const query = params.get('q');
    const page = params.get('page') || 1;
    const searchResultsHandle = Meteor.subscribe('fetchSearchResults', query, page);
    const id = `${query}-${page}`;

    if (searchResultsHandle.ready()) {

        const cached = SearchResultsCache.findOne({_id: id});

        return {
            searchedMovies: cached.results,
            totalPages: cached.total_pages,
            totalResults: cached.total_results,
        }
    }

    return {
        searchedMovies: [],
        totalPages: 0,
        totalResults: 0,
    }
})(SearchResults)