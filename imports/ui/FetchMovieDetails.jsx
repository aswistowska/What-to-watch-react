import React, {useEffect, useState} from "react";
import axios from "axios";
import {Meteor} from 'meteor/meteor';
import { Session } from 'meteor/session'

import MovieDetails from './MovieDetails'
import Loading from "./Loading";
import Favourites from "../api/favourites";

const BASIC_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = 'api_key=b73a05f4286a2af4e2caf142d739fcd7';

function urlBuilder(id) {
    return BASIC_URL + id + '?' + API_KEY;
}


export function FetchMovieDetails(props) {
    const [movie, setMovie] = useState({});

    useEffect(() => {
        let visible = true;
        axios.get(urlBuilder(props.id))
            .then(({data}) => {
                if(visible) {
                    setMovie(data);
                }
            },)
            .catch(function (error) {
                console.log(error);
            });
        return () => {visible = false;
        }
    },  [props.id]);

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