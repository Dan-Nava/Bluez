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
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import {
    AccountCircle,
    AdminPanelSettingsRounded, EmojiSymbols,
    ForumRounded,
    Loop,
    PhotoAlbum,
    TextSnippet
} from "@mui/icons-material";


import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import AssignmentIcon from '@mui/icons-material/Assignment';

import configs from '../../../config'
import constructRequest from '../../../utils/requestConstructor'


// This component allows us to control playing music, pausing, fastforwarding, going back etc.
class Controls extends React.Component {

    // This file should be taken from the server, for our purposes, we have saved it locally for phase1

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
        if (this.props.audio_object.muted === false) {
            this.props.audio_object.muted = true;

        } else {
            this.props.audio_object.muted = false;
        }
    }

    clickLoop(e) {
        if (this.props.audio_object.loop === false) {
            this.props.audio_object.loop = true;
        } else {
            this.props.audio_object.loop = false;
            this.props.stateChangeHandler('loop', !this.props.state.loop);
        }
    }

    redirect(url) {
        this.props.history.push(url)
        this.props.stateChangeHandler('redirect', true)
    }

    userOrAdmin() {
        // stuff for redirecting to user or admin
    }

    render() {
        return (
            <div>
                <Avatar onClick={() => this.userOrAdmin()} className="avatar">
                    <AssignmentIcon />
                </Avatar>
                <Box> 
                    <Tabs centered className="tabs">
                        <Tab label="Album Art"  onClick={() => this.redirect('/albumArt')}/>
                        <Tab label="Video"      onClick={() => this.redirect('/video')}/>
                        <Tab label="Lyrics"     onClick={() => this.redirect('/lyrics')}/>
                        <Tab label="Chords"     onClick={() => this.redirect('/musician')}/>
                    </Tabs>
                </Box>
                <div className="controlBar">  
                    <div>
                        <LinearProgress variant="determinate" value={this.props.audio_object.currentTime}/>
                    </div>
                    <div>
                        <ul id="controlButtons">
                            <li><Button variant="contained" color="primary" startIcon={<Loop/>}
                                        onClick={(e) => this.clickLoop(e)}/></li>
                            <li><Button variant="contained" color="primary" startIcon={<VolumeDownIcon/>}
                                        onClick={(e) => this.clickDecreaseVol(e)}/></li>
                            <li><Button variant="contained" color="primary" startIcon={<FastRewindIcon/>}
                                        onClick={(e) => this.clickBack(e)}/></li>
                {this.props.state.playState 
                            ? <li><Button variant="contained" color="primary" startIcon={<StopIcon/>} onClick={(e) => this.stop(e)}/></li>
                : <li><Button variant="contained" color="primary" startIcon={<PlayArrowIcon/>} onClick={(e) => this.play(e)}/></li>}
                            <li><Button variant="contained" color="primary" startIcon={<FastForwardIcon/>}
                                        onClick={(e) => this.clickForward(e)}/></li>
                            <li><Button variant="contained" color="primary" startIcon={<VolumeUpIcon/>}
                                        onClick={(e) => this.clickIncreaseVol(e)}/></li>
                            <li><Button variant="contained" color="primary" startIcon={<VolumeOffIcon/>}
                                        onClick={(e) => this.clickMute(e)}/></li>
                        </ul>
                    </div>
                </div>
            </div>
        )

    };
}

export default withRouter(Controls);