import React from 'react';
import configs from '../../../config';
import './styles.css';

// This component is the component that will display the screen for LyricMode. 
class VideoMode extends React.Component {
	constructor(props) {
		super(props);
		this.autoplay = !this.props.audio_object.paused;
		this.videoRef = null;
	}

	async load() {
	    if (this.videoRef != null) {
		    await this.videoRef.pause();
		    this.videoRef.src = `${configs.SERVER_URL}/music/video?name=${this.props.song}`;
		    await this.videoRef.load();
		    this.videoRef.muted = true;
		    this.videoRef.currentTime = this.props.audio_object.currentTime;
		    if (this.props.audio_object.paused) {
		    	await this.videoRef.pause();
		    } else {
			await this.videoRef.play();
		    }
		}
	}

	async pause() {
		await this.videoRef.pause();
	}

	async play() {
		await this.videoRef.play();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.song !== prevProps.song) {
			this.load();
		}
		if (this.props.changeTime !== prevProps.changeTime) {
			this.videoRef.currentTime = this.props.audio_object.currentTime;
		} else if (this.videoRef.currentTime !== this.props.audio_object.currentTime) {
			this.videoRef.currentTime = this.props.audio_object.currentTime;
		}
		if (this.videoRef.duration < this.props.audio_object.duration) {
			this.videoRef.loop = true;
		} else {
		    this.videoRef.loop = this.props.audio_object.loop;
		}
		if ((this.props.playState === false) && (this.props.playState !== prevProps.playState)) {
			this.pause();
		} else if ((this.props.playState === true) && (prevProps.PlayState !== this.props.playState)) {
			this.play();
		}
	}

	render() {
		return (
			<div>
				<video className="Video" muted ref={ref => (this.videoRef = ref)} src={`${configs.SERVER_URL}/music/video?name=${this.props.song}`} preload="auto" loop autoPlay={this.autoplay}/>
			</div>
		)
	}
}

export default VideoMode;