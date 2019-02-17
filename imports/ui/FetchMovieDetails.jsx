import React from "react";
import {Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session'
import { withTracker } from 'meteor/react-meteor-data';

import MovieDetails from './MovieDetails'
import Loading from "./Loading";
import Favourites from "../api/favourites";

const Movies = new Mongo.Collection('movies');

function FetchMovieDetails(props) {

    const movie = props.movie;

    const toggleFavourite = () =>  Meteor.call('toggleFavourite', movie, function (error) {
        if (error && error.error === "favourites.notLoggedIn") {
            Session.set("errorMessage", "Please log in for add movie to a favourites.");
        }
    });

    return (
        Object.keys(movie).length ?
            (<MovieDetails movie={movie} toggleFavourite={toggleFavourite}/>) : (<Loading/>)
    )
}

export default FetchMovieDetailswithTracker = withTracker(({id}) => {

    const movieDetailsHandle = Meteor.subscribe('fetchMovieDetails', id);

    const movie = movieDetailsHandle.ready() ? Movies.findOne(id) : {};

    return {
        id: id,
        movie: movie,
        loading: !movieDetailsHandle.ready(),
    }
})(FetchMovieDetails)