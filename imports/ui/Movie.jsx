import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from "react-router-dom";

import { withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        maxWidth: 345,
        width: 345,
    },
    media: {
        height: 140,
        backgroundColor: '#dbdbdb',
    },
};


function Movie(props) {
    const { classes } = props;
    return (
        <Card className={classes.card}>
            <CardActionArea component={Link} to={`/movie/${props.movie.id}`}>
                <CardMedia
                    className={classes.media}
                    image={`https://image.tmdb.org/t/p/w500/${props.movie.backdrop_path || props.movie.poster_path}`}
                    title="Poster image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.movie.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default withStyles(styles)(Movie);
