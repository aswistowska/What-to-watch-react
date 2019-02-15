import { Meteor } from 'meteor/meteor';
import Favourites from "../imports/api/favourites";


Meteor.publish('favourites.private', function() {
    if (!this.userId) {
        return this.ready();
    }

    return Favourites.find({
        userId: this.userId,
    });
});