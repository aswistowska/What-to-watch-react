import React, {Component, Fragment} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Movies from '../api/movies';
import Movie from './Movie'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },

    palette: {
        primary: {
            main: '#8BC34A',
            dark: '#689F38',
            light: '#DCEDC8'
        },
        secondary: {
            main: '#9c27b0',
            dark: '#6a1b9a',
            light: '#E040FB',
        },

        text: {
            main: '#212121',
            dark: '#757575',
            light: '#BDBDBD'
        }
    },
});


const styles = {
    root: {
        flexGrow: 1,
    },
};

const json = {"page":1,"total_results":19862,"total_pages":994,"results":[{"vote_count":1133,"id":450465,"video":false,"vote_average":6.8,"title":"Glass","popularity":329.43,"poster_path":"\/svIDTNUoajS8dLEo7EosxvyAsgJ.jpg","original_language":"en","original_title":"Glass","genre_ids":[53,9648,18],"backdrop_path":"\/lvjscO8wmpEbIfOEZi92Je8Ktlg.jpg","adult":false,"overview":"In a series of escalating encounters, security guard David Dunn uses his supernatural abilities to track Kevin Wendell Crumb, a disturbed man who has twenty-four personalities. Meanwhile, the shadowy presence of Elijah Price emerges as an orchestrator who holds secrets critical to both men.","release_date":"2019-01-16"},{"vote_count":4580,"id":424694,"video":false,"vote_average":8.2,"title":"Bohemian Rhapsody","popularity":254.592,"poster_path":"\/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg","original_language":"en","original_title":"Bohemian Rhapsody","genre_ids":[18,10402],"backdrop_path":"\/93xA62uLd5CwMOAs37eQ7vPc1iV.jpg","adult":false,"overview":"Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.","release_date":"2018-10-24"},{"vote_count":750,"id":428078,"video":false,"vote_average":6,"title":"Mortal Engines","popularity":224.012,"poster_path":"\/uXJVpPXxZO4L8Rz3IG1Y8XvZJcg.jpg","original_language":"en","original_title":"Mortal Engines","genre_ids":[878,28,12,14,53],"backdrop_path":"\/rxYG6Sj95as9rv9wKIHUx6ATWd3.jpg","adult":false,"overview":"Set in a world many thousands of years in the future. Earth’s cities now roam the globe on huge wheels, devouring each other in a struggle for ever diminishing resources. On one of these massive Traction Cities, Tom Natsworthy has an unexpected encounter with a mysterious young woman from the Outlands who will change the course of his life forever.","release_date":"2018-12-05"},{"vote_count":125,"id":522681,"video":false,"vote_average":6.5,"title":"Escape Room","popularity":192.843,"poster_path":"\/8yZAx7tlKRZIg7pJfaPhl00yHIQ.jpg","original_language":"en","original_title":"Escape Room","genre_ids":[27,53,28],"backdrop_path":"\/mWLljCmpqlcYQh7uh51BBMwCZwN.jpg","adult":false,"overview":"Six strangers find themselves in circumstances beyond their control, and must use their wits to survive.","release_date":"2019-01-03"},{"vote_count":3374,"id":297802,"video":false,"vote_average":6.8,"title":"Aquaman","popularity":172.254,"poster_path":"\/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg","original_language":"en","original_title":"Aquaman","genre_ids":[28,14,878,12],"backdrop_path":"\/5A2bMlLfJrAfX9bqAibOL2gCruF.jpg","adult":false,"overview":"Once home to the most advanced civilization on Earth, the city of Atlantis is now an underwater kingdom ruled by the power-hungry King Orm. With a vast army at his disposal, Orm plans to conquer the remaining oceanic people -- and then the surface world. Standing in his way is Aquaman, Orm's half-human, half-Atlantean brother and true heir to the throne. With help from royal counselor Vulko, Aquaman must retrieve the legendary Trident of Atlan and embrace his destiny as protector of the deep.","release_date":"2018-12-07"},{"vote_count":55,"id":505954,"video":false,"vote_average":4.5,"title":"T-34","popularity":164.064,"poster_path":"\/qNBjbjpQC2Rm8M1v0X8jQxb4AnN.jpg","original_language":"ru","original_title":"Т-34","genre_ids":[10752,18,12,28],"backdrop_path":"\/59qyrVGLLtrcuFtJGdixzn7H4OI.jpg","adult":false,"overview":"1941 - WWii. the second lieutenant Nikolai ivushkin, commander of a t-34, engages in an unequal battle against the tank ace Klaus Jager in a battle near moscow. His mission is more of a suicide - to destroy a dozen german tanks, all by himself. that said, luck does favour the bold. He wins the battle, barely survives, but loses his tank and lands himself in captivity for three long years... there was little to no chance for ivushkin and Jager to meet again, but the war knows how to throw a curve ball.in the spring of 1944, the Wehrmacht commands Jager to take charge of the ohrdruf  re range and turn it into a training center for elite german armored forces, using the latest t-34 as a running target. this is how Jager and ivushkin cross paths again. Jager o ers ivushkin to become the commander of a legendary tank and pick his crew from fellow camp prisoners. Nothing goes according to plan, though, when ivushkin uses exercises for a daring and carefully planned escape.","release_date":"2018-12-27"},{"vote_count":971,"id":480530,"video":false,"vote_average":6.7,"title":"Creed II","popularity":155.748,"poster_path":"\/v3QyboWRoA4O9RbcsqH8tJMe8EB.jpg","original_language":"en","original_title":"Creed II","genre_ids":[18,28],"backdrop_path":"\/8yqLPNwNCtpOPc3XkOlkSMnghzw.jpg","adult":false,"overview":"Follows Adonis Creed's life inside and outside of the ring as he deals with new found fame, issues with his family, and his continuing quest to become a champion.","release_date":"2018-11-21"},{"vote_count":339,"id":438799,"video":false,"vote_average":6.9,"title":"Overlord","popularity":144.017,"poster_path":"\/l76Rgp32z2UxjULApxGXAPpYdAP.jpg","original_language":"en","original_title":"Overlord","genre_ids":[27,10752],"backdrop_path":"\/iEQgMiqCIzS1osIuafgctvluGj5.jpg","adult":false,"overview":"France, World War II, June 1944. On the eve of D-Day, some American paratroopers fall behind enemy lines after their plane crashes during a mission consisting of destroying a German radio tower in Cielblanc, a small village near the beaches of Normandy. After reaching their target, the surviving paratroopers realize that, in addition to fighting Nazi troops that patrol the village, they also must fight against something else.","release_date":"2018-11-01"},{"vote_count":23,"id":452832,"video":false,"vote_average":5,"title":"Serenity","popularity":141.209,"poster_path":"\/hgWAcic93phg4DOuQ8NrsgQWiqu.jpg","original_language":"en","original_title":"Serenity","genre_ids":[53,18],"backdrop_path":"\/oOROXoQ402tHgK6NowmMUSLffkW.jpg","adult":false,"overview":"Baker Dill is a fishing boat captain leading tours off a tranquil, tropical enclave called Plymouth Island. His quiet life is shattered, however, when his ex-wife Karen tracks him down with a desperate plea for help.","release_date":"2019-01-24"},{"vote_count":1113,"id":424783,"video":false,"vote_average":6.5,"title":"Bumblebee","popularity":141.056,"poster_path":"\/fw02ONlDhrYjTSZV8XO6hhU3ds3.jpg","original_language":"en","original_title":"Bumblebee","genre_ids":[28,12,878],"backdrop_path":"\/hMANgfPHR1tRObNp2oPiOi9mMlz.jpg","adult":false,"overview":"On the run in the year 1987, Bumblebee finds refuge in a junkyard in a small Californian beach town. Charlie, on the cusp of turning 18 and trying to find her place in the world, discovers Bumblebee, battle-scarred and broken.  When Charlie revives him, she quickly learns this is no ordinary yellow VW bug.","release_date":"2018-12-15"},{"vote_count":250,"id":166428,"video":false,"vote_average":8.1,"title":"How to Train Your Dragon: The Hidden World","popularity":127.042,"poster_path":"\/ij0xoc13hGhrYIlXGGuPXWTh3vi.jpg","original_language":"en","original_title":"How to Train Your Dragon: The Hidden World","genre_ids":[16,10751,12],"backdrop_path":"\/c56qP2v5vDeYd6Kre9DL47VMcUH.jpg","adult":false,"overview":"As Hiccup fulfills his dream of creating a peaceful dragon utopia, Toothless’ discovery of an untamed, elusive mate draws the Night Fury away.  When danger mounts at home and Hiccup’s reign as village chief is tested, both dragon and rider must make impossible decisions to save their kind.","release_date":"2019-01-03"},{"vote_count":3315,"id":332562,"video":false,"vote_average":7.4,"title":"A Star Is Born","popularity":125.774,"poster_path":"\/wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg","original_language":"en","original_title":"A Star Is Born","genre_ids":[18,10402,10749],"backdrop_path":"\/wqtaHWOEZ3rXDJ8c6ZZShulbo18.jpg","adult":false,"overview":"Seasoned musician Jackson Maine discovers — and falls in love with — struggling artist Ally. She has just about given up on her dream to make it big as a singer — until Jack coaxes her into the spotlight. But even as Ally's career takes off, the personal side of their relationship is breaking down, as Jack fights an ongoing battle with his own internal demons.","release_date":"2018-10-03"},{"vote_count":495,"id":401469,"video":false,"vote_average":6.7,"title":"Widows","popularity":124.332,"poster_path":"\/tvmPiTShsfp4vSUBFsCHYaX9M7i.jpg","original_language":"en","original_title":"Widows","genre_ids":[80,18,53],"backdrop_path":"\/71OjxI27tK7kTIiPnMkdQDx14pe.jpg","adult":false,"overview":"A police shootout leaves four thieves dead during an explosive armed robbery attempt in Chicago. Their widows have nothing in common except a debt left behind by their spouses' criminal activities. Hoping to forge a future on their own terms, they join forces to pull off a heist.","release_date":"2018-11-06"},{"vote_count":362,"id":504172,"video":false,"vote_average":6.3,"title":"The Mule","popularity":115.986,"poster_path":"\/t0idiLMalKMj2pLsvqHrOM4LPdQ.jpg","original_language":"en","original_title":"The Mule","genre_ids":[80,18,53],"backdrop_path":"\/bkc4AY6FTa3yNqrshE9b1elDzPt.jpg","adult":false,"overview":"A 90 year old horticulturalist and Korean War veteran is caught transporting $3 million worth of cocaine through Illinois for a Mexican drug cartel.","release_date":"2018-12-14"},{"vote_count":516,"id":375588,"video":false,"vote_average":5.8,"title":"Robin Hood","popularity":115.959,"poster_path":"\/AiRfixFcfTkNbn2A73qVJPlpkUo.jpg","original_language":"en","original_title":"Robin Hood","genre_ids":[12,28,53],"backdrop_path":"\/AuA50D7T7S7OEVcGo0ZKaMhERn0.jpg","adult":false,"overview":"A war-hardened Crusader and his Moorish commander mount an audacious revolt against the corrupt English crown.","release_date":"2018-11-20"},{"vote_count":11224,"id":299536,"video":false,"vote_average":8.3,"title":"Avengers: Infinity War","popularity":114.933,"poster_path":"\/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg","original_language":"en","original_title":"Avengers: Infinity War","genre_ids":[12,28,14],"backdrop_path":"\/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg","adult":false,"overview":"As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.","release_date":"2018-04-25"},{"vote_count":1470,"id":324857,"video":false,"vote_average":8.5,"title":"Spider-Man: Into the Spider-Verse","popularity":111.186,"poster_path":"\/laMM4lpQSh5z6KIBPwWogkjzBVQ.jpg","original_language":"en","original_title":"Spider-Man: Into the Spider-Verse","genre_ids":[28,12,16,878,35],"backdrop_path":"\/7d6EY00g1c39SGZOoCJ5Py9nNth.jpg","adult":false,"overview":"Miles Morales is juggling his life between being a high school student and being a spider-man. When Wilson \"Kingpin\" Fisk uses a super collider, others from across the Spider-Verse are transported to this dimension.","release_date":"2018-12-07"},{"vote_count":241,"id":463684,"video":false,"vote_average":5.8,"title":"Velvet Buzzsaw","popularity":109.378,"poster_path":"\/3rViQPcrWthMNecp5XnkKev6BzW.jpg","original_language":"en","original_title":"Velvet Buzzsaw","genre_ids":[53,9648,27,35],"backdrop_path":"\/ckNp6LPhp1roR8dVI16q5u3LUMg.jpg","adult":false,"overview":"Big money artists and mega-collectors pay a high price when art collides with commerce. After a series of paintings by an unknown artist are discovered, a supernatural force enacts revenge on those who have allowed their greed to get in the way of art.","release_date":"2019-02-01"},{"vote_count":338,"id":483906,"video":false,"vote_average":6.3,"title":"Polar","popularity":105.577,"poster_path":"\/qOBEpKVLl8Q9CZScbOcRRVISezV.jpg","original_language":"en","original_title":"Polar","genre_ids":[28,80,35,18],"backdrop_path":"\/u8CP7EeWbYMlIVqEoKAt6OYsEe1.jpg","adult":false,"overview":"When a retiring assassin realizes that he is the target of a hit, he winds up back in the game going head to head with a gang of younger, ruthless killers.","release_date":"2019-01-25"},{"vote_count":4681,"id":335983,"video":false,"vote_average":6.6,"title":"Venom","popularity":96.258,"poster_path":"\/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg","original_language":"en","original_title":"Venom","genre_ids":[878,28],"backdrop_path":"\/VuukZLgaCrho2Ar8Scl9HtV3yD.jpg","adult":false,"overview":"Investigative journalist Eddie Brock attempts a comeback following a scandal, but accidentally becomes the host of Venom, a violent, super powerful alien symbiote. Soon, he must rely on his newfound powers to protect the world from a shadowy organization looking for a symbiote of their own.","release_date":"2018-09-28"}]};


class CenteredTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;

        return (

            <Paper className={classes.root}>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor='primary'
                    textColor="primary"
                    centered
                >
                    <Tab label="Popular" />
                    <Tab label="Top Rated" />
                    <Tab label="Now Playing" />
                    <Tab label="Favourites" />
                </Tabs>
            </Paper>

        );
    }
}

const StyledTabs = withStyles(styles)(CenteredTabs);

class MoviesContainer extends Component {
    render() {
        return (
            <Fragment>
                <MuiThemeProvider theme={theme}>
                <StyledTabs />
                <h1>It's movies time!</h1>
                <div className='moviesContainer'>
                {this.props.movies.map((movie) => <Movie key={movie.id} movie={movie}/> )}
                </div>
                </MuiThemeProvider>
            </Fragment>
        );
    }
}

export default MoviesContainer = withTracker(() => {
    return {
        movies: json.results,
    };
})(MoviesContainer);
