import React from 'react';
import App from '../components/App'
import {Route} from 'react-router-dom';
import SignIn from "./components/SignIn";



export default (
    <Router>

        <Route exact path="/" component={App}/>
        <Route exact path="/sign_in" component={SignIn}/>
    </Router>
)