import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSave, faTrash, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
import {BreadcrumbItem, Breadcrumbs, Button, Callout, Cell, Colors, Grid} from "react-foundation";
import {Link, Redirect} from "react-router-dom";
import {sign_in, sign_up} from "../actions/userActions";

class SignIn extends Component{
    constructor(props) {
        super(props)
        this.signUp = this.signUp.bind(this)
        this.updateEmail = this.updateEmail.bind(this)
        this.updatePassword = this.updatePassword.bind(this)
        this.updatePasswordConfirm = this.updatePasswordConfirm.bind(this)
        this.updateUsername = this.updateUsername.bind(this)
        this.state = {username: "", password: "", password_confirmation: "", email: ""}
    }

    componentDidMount() {
    }

    signUp(event) {
        event.preventDefault()
        const payload = this.state
        console.table(payload)
        this.props.dispatch(sign_up(JSON.stringify(payload)))
    }

    updateUsername(event) {
        this.setState({nickname: event.target.value})
    }

    updatePassword(event) {
        this.setState({password: event.target.value})
    }

    updatePasswordConfirm(event) {
        this.setState({password_confirmation: event.target.value})
    }

    updateEmail(event) {
        this.setState({email: event.target.value})
    }

    render(){
        return (
            !this.props.redirect_to ?
                <Fragment>
                    <form method={"post"} onSubmit={this.signUp}>
                        <Grid gutters={"padding"}>
                            <Cell className={"input-field"} small={12} medium={6}>
                                <label>Username</label>
                                <input type={"text"} name={"username"} onChange={this.updateUsername} required
                                       value={this.state.nickname}/>

                            </Cell>
                            <Cell className={"input-field"} small={12} medium={6}>
                                <label>Email</label>
                                <input type={"text"} name={"email"} onChange={this.updateEmail} value={this.state.email}
                                       required/>
                            </Cell>
                            <Cell className={"input-field"} small={12} medium={6}>
                                <label>Password</label>
                                <input type="password" name={"password"} onChange={this.updatePassword} required
                                       value={this.state.password}/>
                            </Cell>
                            <Cell className={"input-field"} small={12} medium={6}>
                                <label>Password Confirmation</label>
                                <input type="password" name={"password_confirmation"} onChange={this.updatePasswordConfirm}
                                       required
                                       value={this.state.password_confirmation}/>
                            </Cell>

                            <Cell small={12}>
                                <Button type={"submit"} style={{marginTop: "0.5rem"}}>Sign Up</Button>
                            </Cell>
                        </Grid>
                    </form>
                </Fragment>
            : <Redirect to={"/home"}/>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{

    const props = {
        token: state.app.auth.token
    }
    if(props.token && props.token !== "") return {redirect_to: "/home"}
    return props
}

export default connect(mapStateToProps)(SignIn)