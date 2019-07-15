import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import {sign_out} from "../actions/userActions";



class Topbar extends Component{
    constructor(props){
        super(props)
        this.logOut = this.logOut.bind(this)
    }

    logOut(event){
        event.preventDefault()
        // this.props.dispatch(sign_out(this.props.auth.token));
    }


    render(){
        // const {auth} = this.props
        return (
            <div className="top-bar">
                <div className="top-bar-left">
                    <ul className="dropdown menu" >
                        <li className="menu-text">P4 Play</li>
                        <li><Link to={"/"}>Home</Link></li>
                             <Fragment>
                                <li><Link to={"/profile"}>Profile</Link></li>
                                <li><Link to={"/game"}>Play</Link></li>
                            </Fragment>

                    </ul>
                </div>
                <div className="top-bar-right">
                    <ul className="menu">
                        {true
                            ?
                            <Fragment>
                                <li><Link to={"/sign_in"}>Sign In</Link></li>
                                <li><Link to={"/sign_up"}>Join Us</Link></li>
                            </Fragment>
                            :
                            <Fragment>
                                <li><a onClick={this.logOut}>Log out</a></li>
                            </Fragment>
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state,ownProps) {
    return {
        // auth: state.app.auth,

    };
}
export default connect(mapStateToProps)(Topbar)