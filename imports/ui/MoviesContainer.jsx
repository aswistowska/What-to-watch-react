import Movie from "./Movie";
import React from "react";

function MoviesContainer(props) {
    return (
        <div className='moviesContainer'>
            {props.movies.map((movie) => <Movie key={movie.id} movie={movie}/>)}
        </div>
    )
}

export default MoviesContainer;