import { Mongo } from 'meteor/mongo';

export const Movies = new Mongo.Collection('movies');
export const MoviesListsCache = new Mongo.Collection('movies_lists_cache');
export const Favourites = new Mongo.Collection('favourites');
export const SearchResultsCache = new Mongo.Collection('search_results');
