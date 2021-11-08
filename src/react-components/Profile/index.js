import "./styles.css";
import React from "react";

import Button from "@mui/material/Button";

import hero from "./static/hero.png";
import avatar from "./static/avatar.png";
import cover from "./static/cover.png";
import {userProfiles} from "../HardCodedData";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.state
    }

    loadUserProfile() {
        for (let i = 0; i < userProfiles.length; i++) {
            if (parseInt(this.props.userId) === parseInt(userProfiles[i]['id'])) {
                this.username = userProfiles[i]['name'];
                this.description = userProfiles[i]['description'];
                break;
            }
        }
    }

    render() {
        this.loadUserProfile()
        return (
            <div className="profile">
                <div className="card">
                    <div className="hero" style={{backgroundImage: 'url(' + hero + ')'}}>
                        <img src={avatar} className="avatar" alt=""/>
                        <h1>{this.username}</h1>
                    </div>
                    <div className="info_container">
                        <br/>
                        <span>Music Enthusiast</span>
                        <p className="description">{this.description}</p>
                        <br/>
                        <h1>Favorites</h1>
                        <div className="favs">
                            <Button className="song_cover" variant="outlined"
                                    style={{backgroundImage: 'url(' + cover + ')'}}/>
                            <Button className="song_cover" variant="outlined"
                                    style={{backgroundImage: 'url(' + cover + ')'}}/>
                            <Button className="song_cover" variant="outlined"
                                    style={{backgroundImage: 'url(' + cover + ')'}}/>
                            <Button className="song_cover" variant="outlined"
                                    style={{backgroundImage: 'url(' + cover + ')'}}/>
                            <Button className="song_cover" variant="outlined"
                                    style={{backgroundImage: 'url(' + cover + ')'}}/>
                        </div>
                        <Button variant="outlined">Add Friend</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;