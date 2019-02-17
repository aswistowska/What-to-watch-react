import React, {Fragment} from 'react';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import {Favourites} from "../api/collections";
import MoviesContainer from "./MoviesContainer";


function SharedFavourites(props) {
    const myFavouritesIds = new Set(props.favorites.map(favourite => favourite.id));
    const sharedFavouritesIds = new Set(props.sharedFavourites.map(sharedFavourite => sharedFavourite.id));

    const moviesInBothFavLists = props.favorites.filter(favourite => sharedFavouritesIds.has(favourite.id));
    const moviesInMyList = props.favorites.filter(favourite => !sharedFavouritesIds.has(favourite.id));
    const moviesInYourList = props.sharedFavourites.filter(favourite => !myFavouritesIds.has(favourite.id));

    return (
        <Fragment>
            {moviesInBothFavLists.length > 0 ?
                (<Fragment>
                    <h2>We like them both!</h2>
                    <MoviesContainer movies={moviesInBothFavLists}/>
                </Fragment>) : ''
            }
            {moviesInMyList.length > 0 ?
                <Fragment>
                    <h2>I like: </h2>
                    <MoviesContainer movies={moviesInMyList}/>
                </Fragment> : ''
            }
            {moviesInYourList.length > 0 ?
                <Fragment>
                    <h2>You like: </h2>
                    <MoviesContainer movies={moviesInYourList}/>
                </Fragment> : ''
            }
        </Fragment>
    )
}

export default SharedFavouriteswithTracker = withTracker(({userId}) => {

    const myFavouritesHandle = Meteor.subscribe('myFavourites');
    const myFavourites = myFavouritesHandle.ready() ? Favourites.find({user: Meteor.userId()}).fetch() : [];

    const sharedFavouritesHandle = Meteor.subscribe('sharedFavourites', userId);
    const sharedFavourites = sharedFavouritesHandle.ready() ? Favourites.find({user: userId}).fetch() : [];

    return {
        favorites: myFavourites.map(item => item.movie),
        sharedFavourites: sharedFavourites.map(item => item.movie),
    }
})(SharedFavourites)
