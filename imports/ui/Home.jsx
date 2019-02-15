import {Fragment} from "react";
import React from "react";
import AccountsUIWrapper from './AccountsUIWrapper';


function Home(props) {

    return (
        <Fragment>
            <AccountsUIWrapper />
            <h1 className='home-title'>Welcome to</h1>
            <h2 className='home-subtitle'>What to Watch</h2>
        </Fragment>
    );
}

export default Home;