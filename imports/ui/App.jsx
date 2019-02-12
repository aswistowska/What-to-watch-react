import React, {Fragment} from 'react';
import { BrowserRouter, Route} from 'react-router-dom'
import Movies from './Movies.jsx';
import Home from './Home.jsx';
import {FetchMovieDetails} from "./FetchMovieDetails";

const App = () => (
        <BrowserRouter>
            <Fragment>
                <Route exact path='/' component={Home} />
                <Route path='/movies/:category' component={
                    (props) => <Movies category={props.match.params.category} />} />
                <Route path='/movie/:id' component={(props)=> <FetchMovieDetails id={props.match.params.id} />}/>
            </Fragment>
        </BrowserRouter>
);

export default App;