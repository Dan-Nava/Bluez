import React from 'react';
import ReactDOM from 'react-dom';
import Controls from './Controls';
import LyricMode from './LyricMode';
import MusicianMode from './MusicianMode';
import SocialMode from './SocialMode';
import VideoMode from './VideoMode';
import Button from "@mui/material/Button";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import './styles.css';

// This component is the parent component that will be used to display whichever Music Player is suitable. 
//I.E depending on the mode, the music player will change
export default class MusicPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.state;
		this.stateFunc = this.props.stateFunc;
		this.mode_idx = this.state.modeList.indexOf(this.state.mode, 0);
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
		this.setState({mode: this.state.modeList[(this.mode_idx+4-1)%4]});
		this.mode_idx = (this.mode_idx+4-1)%4;
	}

	clickChangeModeRight(e) {
		this.setState({mode: this.state.modeList[(this.mode_idx+1)%4]});
		this.mode_idx = (this.mode_idx+1)%4;
	}

	render() {
		return (<div>
				<div className='mediaPlayer'>
					<VideoMode music={this.state.song} />
				</div>
				<Button size='large' variant='outlined' startIcon={<ArrowBackIosIcon/>} className="toggleLeft" color="secondary" onClick={(e) => this.clickChangeModeLeft(e)}>{this.state.modeList[(this.mode_idx+3)%4]}</Button>
				<Button size='large' variant='outlined' endIcon={<ArrowForwardIosIcon/>} className="toggleRight" color="secondary" onClick={(e) => this.clickChangeModeRight(e)}>{this.state.modeList[(this.mode_idx+1)%4]}</Button>
				<Controls version={this.state.mode} music={this.state.song} />
			</div>)
	}
}
