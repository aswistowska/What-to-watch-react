import {HTTP} from 'meteor/http';
import { Mongo } from 'meteor/mongo';

import {Movies} from './collections';

const BASIC_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = 'api_key=b73a05f4286a2af4e2caf142d739fcd7';

function urlBuilder(id) {
    return BASIC_URL + id + '?' + API_KEY;
}

const fetchMovieDetails = id => HTTP.get(urlBuilder(id)).data;

Meteor.publish('fetchMovieDetails', function(id) {

    const cached = Movies.find({_id: id});

    if(cached.count()) {
        return cached;
    }

    const movie = fetchMovieDetails(id);
    movie._id = id;

    this.added('movies', id, movie);
    Movies.insert(movie);
    this.ready();
});


export default Movies;
