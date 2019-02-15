import React, {useEffect, useState} from "react";
import axios from "axios";
import {Meteor} from 'meteor/meteor';
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


    return (
        Object.keys(movie).length ?
            (<MovieDetails movie={movie} toggleFavourite={() => Meteor.call('toggleFavourite', movie)}/>) : (<Loading/>)
    )
}