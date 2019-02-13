import {Fragment} from "react";
import React from "react";
import AccountsUIWrapper from './AccountsUIWrapper';


function Home(props) {

    return (
        <Fragment>
            <h1>It's home page!</h1>
            <AccountsUIWrapper />
        </Fragment>
    );
}

export default Home;