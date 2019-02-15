import React, {Fragment} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Movies from './Movies.jsx';
import Home from './Home.jsx';
import FavouritesList from './Favourites';
import {FetchMovieDetails} from "./FetchMovieDetails";
import CenteredTabs from "./CenteredTabs";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";


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
                        (props) => <CenteredTabs category={props.match.params.category} />} />
                    <Route path='/' component={()=> <CenteredTabs category='home' />} />
                </Switch>
            </header>
            <Fragment>
                <Route exact path='/' component={Home} />
                <Route exact path='/movies/favourites' component={FavouritesList} />
                <Route path='/movies/:category' component={
                    (props) => <Movies category={props.match.params.category} />} />
                <Route path='/movie/:id' component={(props)=> <FetchMovieDetails id={props.match.params.id} />}/>
            </Fragment>
            </Fragment>
            </MuiThemeProvider>
        </BrowserRouter>
);

export default App;