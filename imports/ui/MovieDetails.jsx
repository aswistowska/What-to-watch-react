import {Fragment} from "react";
import React from "react";
import Movies from '../api/movies';


function MovieDetails(props) {

    return (
        <Fragment>
            <h1>It's movies details view! {props.id}</h1>
        </Fragment>
    );
}

export default MovieDetails;