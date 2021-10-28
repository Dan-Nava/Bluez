import "./styles.css";
import React from "react";

import Button from "@mui/material/Button";
import {Input, TextField} from "@mui/material";

import banner from "./static/banner.png";
import avatar from "./static/avatar.png";

class Profile extends React.Component {
    render() {
        return (
            <div className="profile">
                <div>
                <img src={banner} id="banner" alt=""/>
                <img src={avatar} id="avatar" alt=""/>
                <Button id="add_friend" variant="contained">Add Friend</Button>
                </div>
                <div className="content">
                    <p>test</p>
                </div>
            </div>
        );
    }
}

export default Profile;