import React from 'react';
import song from './static/SoundHelix-Song-1.mp3';
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
import './styles.css';

// This component allows us to control playing music, pausing, fastforwarding, going back etc.
class Controls extends React.Component {

	// This file should be taken from the server, for our purposes, we have saved it locally for phase1
	constructor(props) {
		super(props);
		const {version, music} = this.props;
	};

	state = {
		playState: false,
		toggleButton: 'playButton',
		progress: 0
	};

	audio_object = new Audio(song); 

	clickBack(e) {
		if ((this.audio_object.currentTime - 10) < 0) {
			this.audio_object.currentTime = 0;
		} else {
			this.audio_object.currentTime = this.audio_object.currentTime - 10;
		}
	}

	clickForward(e) {
		if ((this.audio_object.currentTime + 10) > this.audio_object.duration) {
			this.audio_object.currentTime = this.audio_object.duration;
		} else {
			this.audio_object.currentTime = this.audio_object.currentTime + 10;
		}
	}

	clickToggle(e) {
		if (this.state.playState == false) {
			this.audio_object.play();
			this.setState({playState: true});
			this.setState({toggleButton: 'stopButton'});	
		} else {
			this.audio_object.pause();
			this.setState({playState: false});
			this.setState({toggleButton: 'playButton'});	
		}
	}

	clickStop(e) {
		this.audio_object.pause();
		this.setState({playState: false});
	}

	clickIncreaseVol(e) {
		if ((this.audio_object.volume + 0.1) > 1) {
			this.audio_object.volume = 1;
		} else {
			this.audio_object.volume = this.audio_object.volume + 0.1;
		}
	}

	clickDecreaseVol(e) {
		if ((this.audio_object.volume - 0.1) < 0) {
			this.audio_object.volume = 0;
		} else {
			this.audio_object.volume = this.audio_object.volume - 0.1;
		}
	}

	clickMute(e) {
		if (this.audio_object.muted == false) {
			this.audio_object.muted = true;
		
		} else {
			this.audio_object.muted = false;
		}
	}

	clickLoop(e) {
		if (this.audio_object.loop == false) {
			this.audio_object.loop = true;
		} else {
			this.audio_object.loop = false;
		}
	}

	getPlayIcon() {
		if (this.state.playState == true) {
			return (<StopIcon />)
		} else {
			return (<PlayArrowIcon />)
		}
	}

	render() {
		return (
			<div>
				<div>
					<LinearProgress variant="determinate" value={this.audio_object.currentTime} />
				</div>
				<div>
					<ul id="controlButtons">
						<li><Button variant="contained" color="primary" startIcon={<ReplayIcon />} onClick={(e) => this.clickLoop(e)}></Button></li>
						<li><Button variant="contained" color="primary" startIcon={<VolumeDownIcon />} onClick={(e) => this.clickDecreaseVol(e)}></Button></li>
						<li><Button variant="contained" color="primary" startIcon={<FastRewindIcon />} onClick={(e) => this.clickBack(e)}></Button></li>
						<li><Button variant="contained" color="primary" startIcon={this.getPlayIcon()} onClick={(e) => this.clickToggle(e)}></Button></li>
						<li><Button variant="contained" color="primary" startIcon={<FastForwardIcon />} onClick={(e) => this.clickForward(e)}></Button></li>
						<li><Button variant="contained" color="primary" startIcon={<VolumeUpIcon />} onClick={(e) => this.clickIncreaseVol(e)}></Button></li>
						<li><Button variant="contained" color="primary" startIcon={<VolumeOffIcon />} onClick={(e) => this.clickMute(e)}></Button></li>
					</ul>
				</div>
			</div>
		)

	};
}

export default Controls;