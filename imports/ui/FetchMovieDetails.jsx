import React from "react";
import {Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session'
import { withTracker } from 'meteor/react-meteor-data';

import MovieDetails from './MovieDetails'
import Loading from "./Loading";
import {Favourites, Movies} from '../api/collections';

function FetchMovieDetails(props) {

    const movie = props.movie;

    const toggleFavourite = () =>  Meteor.call('toggleFavourite', movie, function (error) {
        if (error && error.error === "favourites.notLoggedIn") {
            Session.set("errorMessage", "Please log in for add movie to a favourites.");
        }
    });

    return (
        Object.keys(movie).length !== 1 ?
            (<MovieDetails movie={movie} toggleFavourite={toggleFavourite}/>) : (<Loading/>)
    )
}

export default FetchMovieDetailswithTracker = withTracker(({id}) => {

    const movieDetailsHandle = Meteor.subscribe('fetchMovieDetails', id);
    const isFavouriteHandle = Meteor.subscribe('isFavourite', id);

    const userId = Meteor.userId();
    const favoriteId = `${userId}-${id}`;

    const movie = movieDetailsHandle.ready() ? Movies.findOne(id) : {};
    movie.isFavourite = isFavouriteHandle.ready() ? Favourites.find({_id: favoriteId}).count() : 0;


    return {
        id: id,
        movie: movie,
        loading: !movieDetailsHandle.ready(),
        // isFavourite: isFavourite
    }
})(FetchMovieDetails)