import React from "react";

import "./styles.css";
import {Button, TextField} from "@mui/material";

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container"  id="container">
                <div className="sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1><br/>
                        <TextField required label="Username" type="text"/><br/>
                        <TextField required label="Password" type="password" /><br/>
                        <TextField required label="Repeat Password" type="password" /><br/>
                        <Button variant="outlined">Sign Up</Button>
                    </form>
                </div>
                <div className="sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1><br/>
                        <TextField required label="Username" type="text"/><br/>
                        <TextField required label="Password" type="password" />
                        <a href="#">Forgot your password?</a>
                        <Button variant="outlined">Sign In</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;