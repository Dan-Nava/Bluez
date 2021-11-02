import "./styles.css";
import React from "react";

import Button from "@mui/material/Button";

import hero from "./static/hero.png";
import avatar from "./static/avatar.png";
import cover from "./static/cover.png";

class Profile extends React.Component {
    render() {
        return (
            <div className="profile">
                <div className="card">
                    {/*<img src={banner} className="banner" alt=""/>*/}
                    <div className="hero" style={{backgroundImage: 'url(' + hero + ')'}}>
                        <img src={avatar} className="avatar" alt=""/>
                        <h1>NAME</h1>
                    </div>
                    <div className="info_container">
                        <br/>
                        <span>Music Enthusiast</span>
                        <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                            in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                            occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                            laborum.</p>
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