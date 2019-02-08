import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Movies from '../api/movies';
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
};


function Movie(props) {
    const { classes } = props;
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`}
                    title="Poster image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.movie.title}
                    </Typography>
                    <Typography component="p">
                        {props.movie.overview}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="secondary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}

export default withStyles(styles)(Movie);
