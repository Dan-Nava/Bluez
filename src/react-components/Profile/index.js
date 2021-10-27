import "./styles.css";
import React from "react";

import Button from "@mui/material/Button";
import {Input, TextField} from "@mui/material";

import banner from "./static/banner.png";

class Profile extends React.Component {
    render() {
        return (
            <div className="profile">
                <img src={banner} id="banner" alt=""/>
            </div>
        );
    }
}

export default Profile;