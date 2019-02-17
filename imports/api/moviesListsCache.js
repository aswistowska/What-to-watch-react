import {HTTP} from 'meteor/http';
import { Mongo } from 'meteor/mongo';

import {MoviesListsCache} from './collections';

const BASIC_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = 'api_key=b73a05f4286a2af4e2caf142d739fcd7';

function urlBuilder(category, page) {
    return BASIC_URL + category + '?' + API_KEY + '&page=' + page;
}

const fetchMoviesList = (category, page) => HTTP.get(urlBuilder(category, page)).data;

Meteor.publish('fetchMoviesList', function(category, page) {

    const id = `${category}-${page}`;

    const now = (new Date()).getTime();
    MoviesListsCache.remove({timestamp: {'$lt': now - 60 * 1000}});
    const cached = MoviesListsCache.find({_id: id});

    if(cached.count()) {
        return cached;
    }

    const moviesList = fetchMoviesList(category, page);
    moviesList._id = id;
    moviesList.timestamp = now;

    this.added('movies_lists_cache', id, moviesList);
    MoviesListsCache.insert(moviesList);
    this.ready();
});


export default MoviesListsCache;
