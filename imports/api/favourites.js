import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Favourites = new Mongo.Collection('favourites');

Meteor.methods({
    toggleFavourite(movie){

        const userId = Meteor.userId();
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