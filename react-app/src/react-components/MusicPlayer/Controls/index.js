import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Button from "@mui/material/Button";
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import {withRouter} from 'react-router-dom';
import './styles.css';
import {ExitToApp, Loop, Person,} from "@mui/icons-material";


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';

import configs from '../../../config'
import Cookies from "js-cookie";
import constructRequest from "../../../utils/requestConstructor";


// This component allows us to control playing music, pausing, fastforwarding, going back etc.
class Controls extends React.Component {

    constructor(props) {
	super(props);
	this.props.audio_object.ontimeupdate = (e) => {this.incrementProgress()};
    }

    clickBack(e) {
        if ((this.props.audio_object.currentTime - 10) < 0) {
            this.props.audio_object.currentTime = 0;
        } else {
            this.props.audio_object.currentTime = this.props.audio_object.currentTime - 10;
            this.props.stateChangeHandler('changeTime', this.props.state.changeTime - 1);
        }
    }

    clickForward(e) {
        if ((this.props.audio_object.currentTime + 10) > this.props.audio_object.duration) {
            this.props.audio_object.currentTime = this.props.audio_object.duration;
        } else {
            this.props.audio_object.currentTime = this.props.audio_object.currentTime + 10;
            this.props.stateChangeHandler('changeTime', this.props.state.changeTime + 1);
        }
    }

    incrementProgress() {
	if ((this.props.audio_object) && (this.props.state.timestamps)) {
	    for (let i = 0; i <(this.props.state.timestamps.length - 1); i++) {
	        if ((this.props.audio_object.currentTime >= this.props.state.timestamps[i]) && (this.props.audio_object.currentTime < this.props.state.timestamps[i+1]) && (i !== this.props.state.pos)) {
		    this.props.stateChangeHandler("pos", i);
	        }
	    }
        }
	if (this.props.audio_object) {
		let currentProgress = this.props.audio_object.currentTime * 100 / this.props.audio_object.duration;
		if (Math.abs(currentProgress - this.props.progress) > 1) {
			this.props.stateChangeHandler("progress", currentProgress);
		}
	}
    }

    play(e) {
        this.props.stateChangeHandler('playState', true);
        this.props.audio_object.play();
    }

    stop(e) {
        this.props.stateChangeHandler('playState', false);
        this.props.audio_object.pause();
    }

    clickIncreaseVol(e) {
        if ((this.props.audio_object.volume + 0.1) > 1) {
            this.props.audio_object.volume = 1;
        } else {
            this.props.audio_object.volume = this.props.audio_object.volume + 0.1;
        }
    }

    clickDecreaseVol(e) {
        if ((this.props.audio_object.volume - 0.1) < 0) {
            this.props.audio_object.volume = 0;
        } else {
            this.props.audio_object.volume = this.props.audio_object.volume - 0.1;
        }
    }

    clickMute(e) {
        if (this.props.state.muted === false) {
            this.props.audio_object.muted = true;
	    this.props.stateChangeHandler('muted', true);

        } else {
            this.props.audio_object.muted = false;
	    this.props.stateChangeHandler('muted', false);
        }
    }

    clickLoop(e) {
        if (this.props.state.loop === false) {
            this.props.audio_object.loop = true;
	    this.props.stateChangeHandler('loop', true);
        } else {
            this.props.audio_object.loop = false;
            this.props.stateChangeHandler('loop', false);
        }
    }

    redirect(url) {
        this.props.history.push(url)
        this.props.stateChangeHandler('redirect', true)
    }

    async userOrAdmin() {
        this.tabValue = null;
        let token = Cookies.get('token');
        let data = await fetch(`${configs.SERVER_URL}/accessLevel?token=${token}`).then(res => res.json());
        if (data.accessLevel > 0) {
            this.redirect('/admin');
        } else {
            this.redirect('/profile');
        }
    }

    async logout() {
        this.tabValue = null;
        let token = Cookies.get('token');
        let username = Cookies.get('username');
        const body = {
            'username': username,
            'token': token,
        };
        Cookies.remove('token');
        Cookies.remove('username');
        await fetch(`${configs.SERVER_URL}/logout`, constructRequest(body, 'POST')).then(res => res.json());
        this.redirect('/login');
    }

    renderIfLoggedIn() {
        if (this.props.authed) {
            return (
                <div>
                    <Avatar onClick={() => this.userOrAdmin()} className="avatar-float">
                        <Person/>
                    </Avatar>
                    <Avatar onClick={() => this.logout()} className="avatar-float">
                        <ExitToApp/>
                    </Avatar>
                </div>
	    );
        }
    }

    render() {
        return (
            <div>
                {this.renderIfLoggedIn()}
                <Box>
                    <Tabs value={this.tabValue} centered className="tabs">
                        <Tab label="Album Art" onClick={() => {
                            this.redirect('/albumArt');
                            this.tabValue = 0;
                        }}/>
                        <Tab label="Video" onClick={() => {
                            this.redirect('/video');
                            this.tabValue = 1;
                        }}/>
                        <Tab label="Lyrics" onClick={() => {
                            this.redirect('/lyrics');
                            this.tabValue = 2;
                        }}/>
                        <Tab label="Chords" onClick={() => {
                            this.redirect('/musician');
                            this.tabValue = 3;
                        }}/>
                    </Tabs>
                </Box>
                <div className="controlBar">
                    <div>
                        <LinearProgress variant="determinate" value={this.props.progress}/>
                    </div>
                    <div>
                        <ul id="controlButtons">
                            {this.props.state.loop
                            	? <li><Button variant="contained" color="secondary" startIcon={<Loop/>} 
						onClick={(e) => this.clickLoop(e)}/></li>
			    	: <li><Button variant="contained" color="primary" startIcon={<Loop/>} 
						onClick={(e) => this.clickLoop(e)}/></li>}
                            <li><Button variant="contained" color="primary" startIcon={<VolumeDownIcon/>}
                                        onClick={(e) => this.clickDecreaseVol(e)}/></li>
                            <li><Button variant="contained" color="primary" startIcon={<FastRewindIcon/>}
                                        onClick={(e) => this.clickBack(e)}/></li>
                            {this.props.state.playState
                                ? <li><Button variant="contained" color="primary" startIcon={<StopIcon/>}
                                              onClick={(e) => this.stop(e)}/></li>
                                : <li><Button variant="contained" color="primary" startIcon={<PlayArrowIcon/>}
                                              onClick={(e) => this.play(e)}/></li>}
                            <li><Button variant="contained" color="primary" startIcon={<FastForwardIcon/>}
                                        onClick={(e) => this.clickForward(e)}/></li>
                            <li><Button variant="contained" color="primary" startIcon={<VolumeUpIcon/>}
                                        onClick={(e) => this.clickIncreaseVol(e)}/></li>
                            {this.props.state.muted
                        	? <li><Button variant="contained" color="secondary" startIcon={<VolumeOffIcon/>} onClick={(e) => this.clickMute(e)}/></li>
				: <li><Button variant="contained" color="primary" startIcon={<VolumeOffIcon/>} onClick={(e) => this.clickMute(e)}/></li>}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Controls);