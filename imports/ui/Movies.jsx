import React, {Fragment, useState} from 'react';
import {FetchMovies} from "./FetchMovies";


function MoviesPage(props) {
    const [category, setCategory] = useState('popular');

    return (
        <Fragment>
            <h1>It's movies time!</h1>
            <FetchMovies category={category}/>
        </Fragment>
    );
}

export default MoviesPage;