import React from 'react';
import './styles.css';

// This component is the component that will display the screen for LyricMode. 
class VideoMode extends React.Component {
	constructor(props) {
		super(props);
		this.song = this.props.song;
		this.state = this.props.state;
		this.audio = this.props.audio_object;
		this.videoRef = null;
	}

	async load() {
		this.videoRef.src = process.env.PUBLIC_URL+"/"+this.song+".mp4";
		await this.videoRef.load();
	}

	async pause() {
		await this.videoRef.pause();
	}

	async play() {
		await this.videoRef.play();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.song != prevState.song) {
			this.load();
		}
		this.videoRef.currentTime = this.audio.currentTime;
		this.videoRef.loop = this.audio.loop;
		this.videoRef.muted = true;
		if ((this.videoRef.ended == true) && (this.audio.ended == false)) {
			this.videoRef.loop = true;
		} 
		if (this.audio.paused) {
			this.pause();
		} else {
			this.play();
		}
	}

	render() {
		return (
			<div className="Video">
				<video ref={ref => (this.videoRef = ref)} src={process.env.PUBLIC_URL+"/"+this.song+".mp4"} preload="auto"/>
			</div>
		)
	}
}

export default VideoMode;