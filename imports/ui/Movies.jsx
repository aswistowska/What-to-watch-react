import React, {Fragment} from 'react';
import FetchMovies from "./FetchMovies";

import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';

function MoviesPage(props) {

    return (
        <Fragment>
            <h1>It's movies time!</h1>
            <FetchMovies category={props.category} page={props.page}/>
            <Button component={Link} to={`/movies/${props.category}/
                ${parseInt(props.page) > 1 ? parseInt(props.page) - 1 : props.page}`}>
                Previous</Button>
            <Button component={Link} to={`/movies/${props.category}/
                ${parseInt(props.page) < 1000 ? parseInt(props.page) + 1 : props.page}`}>
                Next</Button>
        </Fragment>
    );
}

export default MoviesPage;