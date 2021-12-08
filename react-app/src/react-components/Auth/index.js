import React from "react";

import "./styles.css";
import {Button, InputLabel, TextField} from "@mui/material";
import {withRouter} from "react-router-dom";
import configs from '../../config'
import constructRequest from '../../utils/requestConstructor'
import Cookies from 'js-cookie';

class Login extends React.Component {
    state = {
        signInHelperText: '',
        signUpHelperText: ''
    }

    constructor(props) {
        super(props);
        this.signInForm = React.createRef();
        this.signUpForm = React.createRef();
    }

    stateChangeHandler(stateName, state) {
        this.props.stateChangeHandler(stateName, state)
    }

    componentDidMount() {
        let token = Cookies.get('token');
        let username = Cookies.get('username');
        const body = {
            'username': username,
            'token': token,
        };
        if(token && username){
            fetch(`${configs.SERVER_URL}/isLoggedIn`, constructRequest(body, 'POST')).then(res => res.json()).then(data=>{
                console.log(data)
                if (data.loggedIn) {
                    fetch(`${configs.SERVER_URL}/accessLevel?token=${token}`).then(res => res.json()).then(data=>{
                        if (data.accessLevel > 0) {
                            this.stateChangeHandler('loggedIn', true);
                            this.stateChangeHandler('adminAuthed', true);
                            this.redirect('/admin');
                        } else {
                            this.stateChangeHandler('loggedIn', true);
                            this.redirect('/profile');
                        }
                    });
                } else {
                    this.stateChangeHandler('loggedIn', false);
                    this.stateChangeHandler('adminAuthed', false);
                    this.setState({signInHelperText: "Please Login First"})
                }
            });
        }else{
            this.stateChangeHandler('loggedIn', false);
            this.stateChangeHandler('adminAuthed', false);
            this.setState({signInHelperText: "Please Login First"})
        }
    }

    redirect(url) {
        this.props.history.push(url)
        this.props.stateChangeHandler('redirect', true)
    }

    async signIn() {
        let username = this.signInForm.current['username'].value
        let password = this.signInForm.current['password'].value
        const body = {
            'username': username,
            'password': password,
        };

        let tokenData = await fetch(`${configs.SERVER_URL}/login`, constructRequest(body, 'POST')).then(res => res.json());
        let token = tokenData.token;
        if (token) {
            Cookies.set('token', token);
            Cookies.set('username', username);
            let data = await fetch(`${configs.SERVER_URL}/accessLevel?token=${token}`).then(res => res.json());
            if (data.accessLevel > 0) {
                this.stateChangeHandler('loggedIn', true);
                this.stateChangeHandler('adminAuthed', true);
                this.redirect('/admin');
            } else {
                this.stateChangeHandler('loggedIn', true);
                this.redirect('/profile');
            }
        } else {
            this.setState({signInHelperText: tokenData.message})
        }
    }


    async signUp() {
        let username = this.signUpForm.current['username'].value
        let password = this.signUpForm.current['password'].value
        let password2 = this.signUpForm.current['password2'].value
        if(password!==password2){
            this.setState({signUpHelperText: "Password don't match"})
        }else{
            const body = {
                'username': username,
                'password': password,
            };

            let data = await fetch(`${configs.SERVER_URL}/register`, constructRequest(body, 'POST')).then(res => res.json());
            if (data.success) {
                this.setState({signUpHelperText: "Success! Please login."})
            } else {
                this.setState({signUpHelperText: data.message})
            }
        }
    }

    render() {
        return (
            <div className="auth-container">
                <div className="sign-up-container">
                    <form className="auth-form" ref={this.signUpForm} action="#">
                        <h1>Create Account</h1><br/>
                        <TextField required label="Username" type="text" name={'username'}/><br/>
                        <TextField required label="Password" type="password" name={'password'}/><br/>
                        <TextField required label="Repeat Password" type="password" name={'password2'}/><br/>
                        <InputLabel id="helper">{this.state.signUpHelperText}</InputLabel><br/>
                        <Button variant="outlined" onClick={() => this.signUp()}>Sign Up</Button>
                    </form>
                </div>
                <div className="sign-in-container">
                    <form className="auth-form" ref={this.signInForm} action="#">
                        <h1>Sign in</h1><br/>
                        <TextField required label="Username" type="text" name={'username'}/><br/>
                        <TextField required label="Password" type="password" name={'password'}/>
                        <a href="/">Forgot your password?</a>
                        <InputLabel id="helper">{this.state.signInHelperText}</InputLabel><br/>
                        <Button variant="outlined" onClick={() => this.signIn()}>Sign In</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);