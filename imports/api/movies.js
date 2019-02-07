import { Mongo } from 'meteor/mongo';
import SimpleSchema from "simpl-schema";

let Movies = new Mongo.Collection('movies');
Movies.schema = new SimpleSchema({
    title: {type: String},
    overview: {type: String},
});

export default Movies;
