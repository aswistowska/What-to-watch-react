import React, {Fragment, useState} from 'react';
import FetchMovies from "./FetchMovies";


function MoviesPage(props) {

    return (
        <Fragment>
            <h1>It's movies time!</h1>
            <FetchMovies category={props.category} page={1}/>
        </Fragment>
    );
}

export default MoviesPage;