import {Meteor} from 'meteor/meteor';
import Movies from '../imports/api/movies';
import {Mongo} from 'meteor/mongo'

Meteor.startup(() => {

    const movieToInsert = {
        title: 'Some movie',
        overview: 'some description'
    };

    if (Movies.find().count() === 0) {
        try {
            Movies.schema.validate(movieToInsert);
            Movies.insert(movieToInsert);
        } catch (e) {
            console.log('invalid data for our movies schema');
        }
    }
});
