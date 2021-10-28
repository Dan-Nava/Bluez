import React from 'react';
import song from './Music/SoundHelix-Song-1.mp3';
import './styles.css';

// This component allows us to control playing music, pausing, fastforwarding, going back etc.
class Controls extends React.Component {

	// This file should be taken from the server, for our purposes, we have saved it locally for phase1
	constructor(props) {
		super(props);
		const {version, music} = this.props;
	}

	state = {
		playState: false,
	};

	audio_object = new Audio(song); 

	togglePlay() {
		if (this.state.playState == false) {
			this.setState({playState: true});
				return (<button type="button" className="playButton" onClick={(e) => this.clickPlay(e)}></button>)
		} else {
			this.setState({playState: false});
				return (<button type="button" className="stopButton" onClick={(e) => this.clickStop(e)}></button>)
		}

	}

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

	clickPlay(e) {
		this.audio_object.play();
	}

	clickStop(e) {
		this.audio_object.pause();
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

	render() {
		return (
			<div>
				<ul className="controlButtons">
					<li><button type="button" className="loopButton" onClick={(e) => this.clickLoop(e)}></button></li>
					<li><button type="button" className="decreaseVolButton" onClick={(e) => this.clickDecreaseVol(e)}></button></li>
					<li><button type="button" className="goBackwardButton" onClick={(e) => this.clickBack(e)}></button></li>
					<li><button type="button" className="playButton" onClick={(e) => this.clickPlay(e)}></button></li>
					<li><button type="button" className="goForwardButton" onClick={(e) => this.clickForward(e)}></button></li>
					<li><button type="button" className="increaseVolButton" onClick={(e) => this.clickIncreaseVol(e)}></button></li>
					<li><button type="button" className="muteButton" onClick={(e) => this.clickMute(e)}></button></li>
				</ul>
			</div>
		)

	}
}

export default Controls;