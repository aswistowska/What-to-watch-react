import React, {Fragment} from 'react';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Mongo } from 'meteor/mongo';
import MoviesContainer from "./MoviesContainer";


import {Favourites} from '../api/collections';


function FavouritesList(props) {
    return (
        <Fragment>
            <h1>We are your favs! :)</h1>
            <h2>Share your favourites with friends:
                 <span><a href={'//' + location.hostname + '/shared/' + Meteor.userId()}>
                {location.protocol + '//' + location.hostname + '/shared/' + Meteor.userId()}</a></span></h2>
            <MoviesContainer movies={props.favorites}/>
        </Fragment>
    )
}

export default FavouritesListwithTracker = withTracker(() => {

    const myFavouritesHandle = Meteor.subscribe('myFavourites');

    const myFavourites = myFavouritesHandle.ready() ? Favourites.find({user: Meteor.userId()}).fetch() : [];

    return {
        favorites: myFavourites.map(item => item.movie)
    }
})(FavouritesList)
