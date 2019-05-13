import React, {Component, Fragment} from 'react'
import { Link } from 'react-router-dom'

import {connect} from "react-redux";

export class Topbar extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className={"topbar"}>
                <Link to={"/"}>Home</Link>&nbsp;/&nbsp;
                <Link to={"/sign_in"}>Sign In</Link>&nbsp;/&nbsp;
                <Link to={"/sign_up"}>Sign Up</Link>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        auth: state.auth,

    };
}
export default connect(mapStateToProps)(Topbar)