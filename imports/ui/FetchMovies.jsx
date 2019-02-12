import React, {useEffect, useState} from "react";
import axios from "axios";

import MoviesContainer from './MoviesContainer';

const BASIC_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = 'api_key=b73a05f4286a2af4e2caf142d739fcd7';

function urlBuilder(category) {
    return BASIC_URL + category + '?' + API_KEY;
}

export function FetchMovies(props) {
    const [moviesState, setMovies] = useState([]);

    useEffect(() => {
        axios.get(urlBuilder(props.category))
            .then(({data}) => {
                setMovies(data.results)
            })
            .catch(function (error) {
                console.log(error);
            });
    });

    return (
        <MoviesContainer movies={moviesState}/>
    )
}