import "./styles.css";
import React from "react";

import Button from "@mui/material/Button";

import cover from "./static/cover.png";
import configs from "../../config";
import Cookies from "js-cookie";

class Profile extends React.Component {
    state = {
        name: '',
        title: '',
        description: '',
        avatar:'',
        hero:'',
    }

    componentDidMount() {
        this.loadUserProfile()
    }

    loadUserProfile() {
        let token = Cookies.get('token');
        fetch(`${configs.SERVER_URL}/account/info?token=${token}`).then(res => res.json()).then(data => {
            let account = data.account;
            this.setState({
                name: account.name,
                title: account.title,
                description: account.description,
            });
        });
        fetch(`${configs.SERVER_URL}/account/avatar?token=${token}`).then(res => res.json()).then(data => {
            let account = data.account;
            this.setState({
                avatar: account.avatar
            });
        });

        fetch(`${configs.SERVER_URL}/account/hero?token=${token}`).then(res => res.json()).then(data => {
            let account = data.account;
            this.setState({
                hero: account.hero
            });
        });
    }

    render() {
        let hero = this.state.hero;
        return (
            <div className="profile">
                <div className="card">
                    <div className="hero" style={{backgroundImage: 'url(' + hero + ')'}}>
                        <img src={this.state.avatar} className="avatar" alt=""/>
                        <h1>{this.state.name}</h1>
                    </div>
                    <div className="info_container">
                        <br/>
                        <span>{this.state.title}</span>
                        <p className="description">{this.state.description}</p>
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