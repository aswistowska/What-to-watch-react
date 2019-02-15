import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Favourites = new Mongo.Collection('favourites');

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
            console.log('dodane');
        } else {
            Favourites.remove({_id: id});
            console.log('usuniete');
        }
    }
});

export default Favourites;