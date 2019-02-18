import {HTTP} from 'meteor/http';
import { Mongo } from 'meteor/mongo';

import {SearchResultsCache} from './collections';

const BASIC_URL = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = 'api_key=b73a05f4286a2af4e2caf142d739fcd7';

function urlBuilder(query, page) {
    return BASIC_URL + '?' + API_KEY + '&query=' + query + '&page=' + page;
}

const fetchSearchResults = (query, page) => HTTP.get(urlBuilder(query, page)).data;

Meteor.publish('fetchSearchResults', function(query, page) {

    const id = `${query}-${page}`;

    const now = (new Date()).getTime();
    SearchResultsCache.remove({timestamp: {'$lt': now - 60 * 1000 * 5}});
    const cached = SearchResultsCache.find({_id: id});

    if(cached.count()) {
        return cached;
    }

    const searchMoviesList = fetchSearchResults(query, page);
    searchMoviesList._id = id;
    searchMoviesList.timestamp = now;

    this.added('search_results', id, searchMoviesList);
    SearchResultsCache.insert(searchMoviesList);
    this.ready();
});

export default SearchResultsCache;