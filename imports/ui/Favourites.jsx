import React, {Fragment, useRef, useState, useEffect} from 'react';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {Mongo} from 'meteor/mongo';
import MoviesContainer from "./MoviesContainer";
import Icon from '@material-ui/core/Icon';
import {withStyles} from '@material-ui/core/styles';


import {Favourites} from '../api/collections';
import InputBase from "@material-ui/core/InputBase/InputBase";


const styles = theme => ({
    flex: {
        display: 'flex',
    },
    inputRoot: {
        flexGrow: 1,
    },
    message: {
        background: theme.palette.primary.light,
        transition: theme.transitions.create('opacity'),
        padding: theme.spacing.unit,
        borderRadius: theme.shape.borderRadius,
        opacity: 0
    },
    label: {
        padding: theme.spacing.unit,
    },
    visible: {
        opacity: 1
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
    },
});

function FavouritesList(props) {
    const shareUrl = location.protocol + '//' + location.hostname + (location.port !== "80" ? ":" + location.port : "") + '/shared/' + Meteor.userId();
    const classes = props.classes;
    const inputRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (visible) {
            const timeout = setTimeout(() => {
                setVisible(false)
            }, 2000);
            return () => {
                clearTimeout(timeout)
            }
        }
    });

    function copyLink() {
        const input = inputRef.current;
        input.focus();
        input.setSelectionRange(0, input.value.length);
        document.execCommand('copy');
        setVisible(true)
    }

    return (
        <Fragment>
            <h1>We are your favs! :)</h1>
            <div className={classes.flex}>
                <h2 onClick={copyLink} className={classes.label}>Share your favourites with friends</h2>
                <InputBase
                    value={shareUrl} readOnly={true}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputRef={inputRef}

                    onMouseDown={copyLink}
                />
                <h2 className={classes.message + (visible ? " " + classes.visible : "")}>Share link copied!</h2>
            </div>
            <MoviesContainer movies={props.favorites}/>
        </Fragment>
    )
}

export default FavouritesListwithTracker = withStyles(styles)(withTracker(() => {

    const myFavouritesHandle = Meteor.subscribe('myFavourites');

    const myFavourites = myFavouritesHandle.ready() ? Favourites.find({user: Meteor.userId()}).fetch() : [];

    return {
        favorites: myFavourites.map(item => item.movie)
    }
})(FavouritesList))
