import React from "react";

import "./styles.css";
import {Button, TextField} from "@mui/material";
import {withRouter} from "react-router-dom";
import {users, admins} from "../HardCodedData";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.signInForm = React.createRef();
        this.userCredentials = users
        this.adminCredentials = admins
    }

    stateChangeHandler(stateName, state) {
        this.props.stateChangeHandler(stateName, state)
    }

    componentDidMount() {
        alert("Please Login First")
    }

    redirect(url) {
        this.props.history.push(url)
        this.props.stateChangeHandler('redirect', true)
    }

    signIn() {
        let username = this.signInForm.current['username'].value
        let password = this.signInForm.current['password'].value
        if (this.userCredentials[username] !== undefined) {
            if (password === this.userCredentials[username]) {
                this.stateChangeHandler('loggedIn', true);
                this.stateChangeHandler('userId', 1);
                this.redirect('/profile');
            } else {
                alert("Invalid Username/Password")
            }
        } else if (this.adminCredentials[username] !== undefined) {
            if (password === this.adminCredentials[username]) {
                this.stateChangeHandler('loggedIn', true);
                this.stateChangeHandler('adminAuthed', true);
                this.stateChangeHandler('userId', 2);
                this.redirect('/admin');
            } else {
                alert("Invalid Username/Password")
            }
        } else {
            alert("Username Not Found")
        }
    }

    render() {
        return (
            <div className="auth-container">
                <div className="sign-up-container">
                    <form className="auth-form" action="#">
                        <h1>Create Account</h1><br/>
                        <TextField required label="Username" type="text"/><br/>
                        <TextField required label="Password" type="password"/><br/>
                        <TextField required label="Repeat Password" type="password"/><br/>
                        <Button variant="outlined">Sign Up</Button>
                    </form>
                </div>
                <div className="sign-in-container">
                    <form className="auth-form" ref={this.signInForm} action="#">
                        <h1>Sign in</h1><br/>
                        <TextField required label="Username" type="text" name={'username'}/><br/>
                        <TextField required label="Password" type="password" name={'password'}/>
                        <a href="/">Forgot your password?</a>
                        <Button variant="outlined" onClick={() => this.signIn()}>Sign In</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);