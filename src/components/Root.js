import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router,Redirect,Route,Switch } from 'react-router-dom'
import Index from "./Index";
import App from "./App";
import SignIn from "./SignIn";
import Game from "./Game";



const Root = ({ store }) =>  (
    <Provider store={store}>
        <Router>
            <App>
                <Route exact path="/" component={Index}/>
                <Route exact path="/sign_in" component={SignIn}/>
                <Route exact path={"/game"} component={Game} />
            </App>
        </Router>
    </Provider>
)



Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root