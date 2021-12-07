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
		    this.videoRef.src = `${configs.SERVER_URL}/music/video?name=${this.props.state.song}`;
		    await this.videoRef.load();
		    this.videoRef.muted = true;
		    this.videoRef.currentTime = this.props.audio_object.currentTime;
		}
	}

	async pause() {
		await this.videoRef.pause();
	}

	async play() {
		await this.videoRef.play();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.state.song !== prevProps.state.song) {
			this.load();
		}
		this.videoRef.currentTime = this.props.audio_object.currentTime;
		if (this.videoRef.duration < this.props.audio_object.duration) {
			this.videoRef.loop = true;
		} else {
		    this.videoRef.loop = this.props.audio_object.loop;
		}
		if (this.props.audio_object.paused) {
			this.pause();
		} else {
			this.play();
		}
	}

	render() {
		return (
			<div>
				<video className="Video" muted ref={ref => (this.videoRef = ref)} src={`${configs.SERVER_URL}/music/video?name=${this.props.state.song}`} preload="auto" loop autoPlay={this.autoplay}/>
			</div>
		)
	}
}

export default VideoMode;