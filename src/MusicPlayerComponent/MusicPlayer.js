import React from 'react';
import ReactDOM from 'react-dom';
import Controls from './ControlComponent/Controls';
import LyricMode from './LyricModeComponent/LyricMode';
import MusicianMode from './MusicianModeComponent/MusicianMode';
import SocialMode from './SocialModeComponent/SocialMode';
import VideoMode from './VideoModeComponent/VideoMode';
import './styles.css';

// This component is the parent component that will be used to display whichever Music Player is suitable. 
//I.E depending on the mode, the music player will change
export default class MusicPlayer extends React.Component {
	state = {
		mode: "Video",
		song: "SoundHelix-Song-1.mp3",
		idx: 0
	};
	constructor(props) {
		super(props);
		
		const modes = ["Video", "Lyric", "Musician", "Social"];
	}

	playScreen() {
		if (this.state.mode == "Video") {
			return <VideoMode music={this.state.song} />
		} else if (this.state.mode == "Lyric") {
			return <LyricMode music={this.state.song} />
		} else if (this.state.mode == "Musician") {
			return <MusicianMode music={this.state.song} />
		} else {
			return <SocialMode music={this.state.song} />
		}
	}

	clickChangeModeLeft(e) {
		this.setState({mode: this.modes[(this.state.idx+4-1)%4]});
		this.setState({idx: (this.state.idx+4-1)%4});
	}

	clickChangeModeRight(e) {
		this.setState({mode: this.modes[(this.state.idx+1)%4]});
		this.setState({idx: (this.state.idx+1)%4});
	}

	render() {
		return (<div>
				<div className='player'>
					<VideoMode music={this.state.song} />
				</div>
				<div>
					<button type="button" className="changeModeButtonLeft" onClick={(e) => this.clickChangeModeLeft(e)}></button>
					<button type="button" className="changeModeButtonRight" onClick={(e) => this.clickChangeModeRight(e)}></button>
				</div>
				<div>
					<Controls version={this.state.mode} music={this.state.song} />
				</div>
			</div>)
	}
}
