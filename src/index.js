import React from "react";
import ReactDOM from "react-dom";
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {applyMiddleware, createStore} from 'redux'
import userReducer from './reducers/userReducer'
import {sign_up,sign_in,sign_out} from "./actions/userActions";
import Root from "./components/Root";
import "../scss/app.scss"
// import "sockjs-client"

const loggerMiddleware = createLogger()
const store = createStore(
    userReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
)

ReactDOM.render(
    <Root store={store} />,
    document.getElementById("root")
);


// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.log(store.getState()))
unsubscribe()


