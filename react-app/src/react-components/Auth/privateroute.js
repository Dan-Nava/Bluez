import React from "react";
import {Redirect, Route} from "react-router-dom";

class PrivateRoute extends Route {
    render() {
        return (
            this.props.authed ? this.props.comp : <Redirect to="/login"/>
        );
    }
}

export default PrivateRoute;