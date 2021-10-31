import React from 'react';
import ReactDOM from 'react-dom';
import Controls from './Controls';
import LyricMode from './LyricMode';
import MusicianMode from './MusicianMode';
import SocialMode from './SocialMode';
import VideoMode from './VideoMode';
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
		
		this.modes = ["Video", "Lyric", "Musician", "Social"];
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
				<div className='mediaPlayer'>
					<VideoMode music={this.state.song} />
					<Button size='large' variant='outlined' startIcon={<ArrowBackIosIcon/>} className="toggleLeft" color="secondary" onClick={(e) => this.clickChangeModeLeft(e)}>{this.modes[(this.state.idx+3)%4]}</Button>
					<Button size='large' variant='outlined' endIcon={<ArrowForwardIosIcon/>} className="toggleRight" color="secondary" onClick={(e) => this.clickChangeModeRight(e)}>{this.modes[(this.state.idx+1)%4]}</Button>
				</div>
				<Controls version={this.state.mode} music={this.state.song} />
			</div>)
	}
}
