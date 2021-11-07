import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Button from "@mui/material/Button";
import ReplayIcon from '@mui/icons-material/Replay';
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
import {AccountCircle, AdminPanelSettingsRounded, ForumRounded, LoginRounded} from "@mui/icons-material";


// This component allows us to control playing music, pausing, fastforwarding, going back etc.
class Controls extends React.Component {

    // This file should be taken from the server, for our purposes, we have saved it locally for phase1
    constructor(props) {
        super(props);
        this.state = this.props.state;

        const {history} = this.props;
        this.hisitory = history;
    };


    clickBack(e) {
        if ((this.props.audio_object.currentTime - 10) < 0) {
            this.props.audio_object.currentTime = 0;
        } else {
            this.props.audio_object.currentTime = this.props.audio_object.currentTime - 10;
	    this.props.stateChangeHandler('changeTime', this.props.state.changeTime-1);
        }
    }

    clickForward(e) {
        if ((this.props.audio_object.currentTime + 10) > this.props.audio_object.duration) {
            this.props.audio_object.currentTime = this.props.audio_object.duration;
        } else {
            this.props.audio_object.currentTime = this.props.audio_object.currentTime + 10;
	    this.props.stateChangeHandler('changeTime', this.props.state.changeTime+1);
        }
    }

    clickToggle(e) {
        if (this.state.playState === false) {
            this.setState({playState: true}, () => this.props.stateChangeHandler(this.state.playState));
            this.setState({toggleButton: 'stopButton'});
            this.props.audio_object.play();
        } else {
            this.setState({playState: false}, () => this.props.stateChangeHandler(this.state.playState));
            this.setState({toggleButton: 'playButton'});
            this.props.audio_object.pause();
        }
    }

    clickStop(e) {
        this.props.audio_object.pause();
        this.setState({playState: false});
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
        if (this.props.audio_object.muted == false) {
            this.props.audio_object.muted = true;

        } else {
            this.props.audio_object.muted = false;
        }
    }

    clickLoop(e) {
        if (this.props.audio_object.loop == false) {
            this.props.audio_object.loop = true;
        } else {
            this.props.audio_object.loop = false;
            this.props.stateChangeHandler('loop', !this.props.state.loop);
        }
    }

    getPlayIcon() {
        if (this.state.playState == true) {
            return (<StopIcon/>)
        } else {
            return (<PlayArrowIcon/>)
        }
    }

    redirect(url) {
        this.props.history.push(url)
        this.props.stateChangeHandler('redirect', true)
    }

    render() {
        return (
            <div className="controlBar">
                <div>
                    <LinearProgress variant="determinate" value={this.props.audio_object.currentTime}/>
                </div>
                <div>
                    <ul id="controlButtons">
                        <li><Button variant="contained" color="primary" startIcon={<ReplayIcon/>}
                                    onClick={(e) => this.clickLoop(e)}/></li>
                        <li><Button variant="contained" color="primary" startIcon={<VolumeDownIcon/>}
                                    onClick={(e) => this.clickDecreaseVol(e)}/></li>
                        <li><Button variant="contained" color="primary" startIcon={<FastRewindIcon/>}
                                    onClick={(e) => this.clickBack(e)}/></li>
                        <li><Button variant="contained" color="primary" startIcon={this.getPlayIcon()}
                                    onClick={(e) => this.clickToggle(e)}/></li>
                        <li><Button variant="contained" color="primary" startIcon={<FastForwardIcon/>}
                                    onClick={(e) => this.clickForward(e)}/></li>
                        <li><Button variant="contained" color="primary" startIcon={<VolumeUpIcon/>}
                                    onClick={(e) => this.clickIncreaseVol(e)}/></li>
                        <li><Button variant="contained" color="primary" startIcon={<VolumeOffIcon/>}
                                    onClick={(e) => this.clickMute(e)}/></li>

                        <li><Button variant="contained" color="primary" startIcon={<LoginRounded/>}
                                    onClick={() => this.redirect('/login')}/></li>
                        <li><Button variant="contained" color="primary" startIcon={<AccountCircle/>}
                                    onClick={() => this.redirect('/profile')}/></li>
			            <li><Button variant="contained" color="primary" startIcon={<MusicVideoIcon/>}
                                    onClick={() => this.redirect('/video')}/></li>
                        <li><Button variant="contained" color="primary" startIcon={<ForumRounded/>}
                                    onClick={() => this.redirect('/social')}/></li>
			            {/*<li><Button variant="contained" color="primary" startIcon={<ForumRounded/>}
                                    onClick={() => this.props.setSong("SoundHelix-Song-9")}/></li>*/}
                        <li><Button variant="contained" color="primary" startIcon={<AdminPanelSettingsRounded/>}
                                    onClick={() => this.redirect('/admin')}/></li>
                    </ul>
                </div>
            </div>
        )

    };
}

export default withRouter(Controls);