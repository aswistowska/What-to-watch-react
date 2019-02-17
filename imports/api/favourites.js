import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import {Favourites} from './collections';

Favourites.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Meteor.methods({
    toggleFavourite(movie){

        if (!this.userId) {
            throw new Meteor.Error('favourites.notLoggedIn',
                'Must be logged in to mark movies as favourites.');
        }

        const userId = this.userId;
        const id = `${userId}-${movie.id}`;

        if(Favourites.find({_id: id}).count() === 0){
            Favourites.insert({_id: id, user: userId, movie: movie});

        } else {
            Favourites.remove({_id: id});

        }
    }
});

Meteor.publish('myFavourites', function () {
    return Favourites.find({user: this.userId})
});

Meteor.publish('isFavourite', function (movieId) {
    const userId = this.userId;
    const id = `${userId}-${movieId}`;
    console.log("isFavourite", movieId);
    return Favourites.find({_id: id})
});

export default Favourites;