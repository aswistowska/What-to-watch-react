import React, {Fragment} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Movies from './Movies.jsx';
import Home from './Home.jsx';
import FavouritesList from './Favourites';
import FetchMovieDetails from "./FetchMovieDetails";
import CenteredTabs from "./CenteredTabs";
import SharedFavourites from './SharedFavourites';
import SearchResults from './SearchResults';

import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import AccountsUIWrapper from "./AccountsUIWrapper";


const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },

    palette: {
        primary: {
            main: '#8BC34A',
            dark: '#689F38',
            light: '#DCEDC8'
        },
        secondary: {
            main: '#9c27b0',
            dark: '#6a1b9a',
            light: '#E040FB',
        },

        text: {
            main: '#212121',
            dark: '#757575',
            light: '#BDBDBD'
        }
    },
});

const App = () => (
    <BrowserRouter>
        <MuiThemeProvider theme={theme}>
            <Fragment>
                <header>
                    <Switch>
                        <Route path='/movies/:category' component={
                            (props) => <CenteredTabs category={props.match.params.category}/>}/>
                        <Route path='/' component={() => <CenteredTabs category='home'/>}/>
                    </Switch>
                </header>
                <Fragment>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/movies/favourites' component={FavouritesList}/>
                        <Route exact path='/movies/:category' component={
                            (props) => <Movies category={props.match.params.category} page={1}/>}/>
                        <Route path='/movies/:category/:page' component={
                            (props) => <Movies category={props.match.params.category}
                                               page={props.match.params.page}/>}/>
                        <Route path='/movie/:id'
                               component={(props) => <FetchMovieDetails id={props.match.params.id}/>}/>
                        <Route path='/shared/:userId'
                               component={(props) => <SharedFavourites userId={props.match.params.userId}/>}/>
                        <Route path='/search' component={(props) => <SearchResults location={props.location.search}/>}/>
                    </Switch>
                </Fragment>
            </Fragment>
        </MuiThemeProvider>
    </BrowserRouter>
);

export default App;