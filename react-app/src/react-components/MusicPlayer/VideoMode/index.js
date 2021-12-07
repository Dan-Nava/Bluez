import React from 'react';
import configs from '../../../config';
import './styles.css';

// This component is the component that will display the screen for LyricMode. 
class VideoMode extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.state;
		this.audio = this.props.audio_object;
		this.autoplay = !this.props.audio_object.paused;
		this.videoRef = null;
	}

	async load() {
	    if (this.videoRef != null) {
		    await this.videoRef.pause();
		    this.videoRef.src = `${configs.SERVER_URL}/music/video?name=${this.state.song}`;
		    await this.videoRef.load();
		    this.videoRef.muted = true;
		    this.videoRef.currentTime = this.audio.currentTime;
		}
	}

	async pause() {
		await this.videoRef.pause();
	}

	async play() {
		await this.videoRef.play();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.song !== prevState.song) {
			this.load();
		}
		this.videoRef.currentTime = this.audio.currentTime;
		if (this.videoRef.duration < this.audio.duration) {
			this.videoRef.loop = true;
		} else {
		    this.videoRef.loop = this.audio.loop;
		}
		if (this.audio.paused) {
			this.pause();
		} else {
			this.play();
		}
	}

	render() {
		return (
			<div>
				<video className="Video" muted ref={ref => (this.videoRef = ref)} src={`${configs.SERVER_URL}/music/video?name=${this.state.song}`} preload="auto" loop autoPlay={this.autoplay}/>
			</div>
		)
	}
}

export default VideoMode;