import Button from "@material-ui/core/Button/Button";
import {Link} from "react-router-dom";
import Paper from "@material-ui/core/Paper/Paper";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import {createMuiTheme, withStyles} from "@material-ui/core";
import React from "react";


const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});

const styles = {
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
};


function CenteredTabs(props) {
    const {classes, category} = props;

    return (
        <div className='tabCustomStyle'>
            {/*<Button size="large" variant="contained" color="secondary" className={classes.button}*/}
                    {/*component={Link} to="/">*/}
                {/*Home*/}
            {/*</Button>*/}
            <Paper className={classes.root}>
                <Tabs
                    value={category}
                    onChange={props.handleChange}
                    indicatorColor='primary'
                    textColor="primary"
                    centered
                >
                    <Tab label="home" value='home' component={Link} to="/"/>
                    <Tab label="popular" value='popular' component={Link} to="/movies/popular"/>
                    <Tab label="Top Rated" value='top_rated' component={Link} to="/movies/top_rated"/>
                    <Tab label="Now Playing" value='now_playing' component={Link} to="/movies/now_playing"/>
                    <Tab label="Favourites" value='favourites' component={Link} to="/movies/favourites"/>
                </Tabs>
            </Paper>
            <Button size="large" variant="contained" color="secondary" className={classes.button}
                    component={Link} to="/log_in">
                Log in
            </Button>
        </div>
    );
}


export default withStyles(styles)(CenteredTabs);