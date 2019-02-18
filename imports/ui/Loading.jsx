import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

function CircularIndeterminate(props) {
    const { classes } = props;
    return (
        <div>
            <CircularProgress className={classes.progress} color="secondary" />
        </div>
    );
}

export default withStyles(styles)(CircularIndeterminate);