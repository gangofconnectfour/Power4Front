import React, {Component, Fragment} from 'react'
import { Link } from 'react-router-dom'

import {connect} from "react-redux";
import {Topbar} from "./Topbar";

class Index extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Fragment>
                <p>Hello react!</p>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {

    return {
        auth: state.auth,

    };
}
export default connect(mapStateToProps)(Index)