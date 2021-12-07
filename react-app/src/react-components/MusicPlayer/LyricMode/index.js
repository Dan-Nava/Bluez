import React from 'react';
import configs from '../../../config';

import './styles.css'

export default class LyricMode extends React.Component {

    async get_data() {
	let result = await fetch(`${configs.SERVER_URL}/music/lyrics?name=${this.props.song}`).then(res => res.json());
	let timestamps = result.timestamps.replaceAll("\\n", " ").split(" ").map(function(x) {
											return parseInt(x);
										});
	let lyrics = result.lyrics.split("\\n");
	this.props.stateChangeHandler("lyrics", lyrics);
	this.props.stateChangeHandler("timestamps", timestamps);
    }

    async get_art() {
	let art = await fetch(`${configs.SERVER_URL}/music/albumArt?name=${this.props.song}`).then(res => res.json());
	this.props.stateChangeHandler("albumArt", art.album_art);
    }

    get_album() {
	return this.props.albumArt;
    }

    componentDidUpdate(prevProps, prevState) {
	if ((this.props.lyrics === null) || (prevProps.song !== this.props.song)) {
		this.get_data();
		if (prevProps.song !== this.props.song) {
			this.get_art();
		}
	}
    }

    componentDidMount() {
	if (this.props.lyrics === null) {
		this.get_data();
	}
	if (this.props.albumArt === null) {
		this.get_art();
	}
    }

    scrollUp() {
        if (this.props.pos > 0) {
            this.props.stateChangeHandler("pos", this.props.pos-1);
        }
    }

    scrollDown() {
        if (this.props.pos < this.props.timestamps.length - 5) {
            this.props.stateChangeHandler("pos", this.props.pos+1);
        }
    }

    loaded_lyrics() {
	if (this.props.lyrics) {
		return (
			<div className="lyrics">
		    		<p className="lyric">{this.props.lyrics[this.props.pos]}</p>
		    		<p className="lyric">{this.props.lyrics[this.props.pos + 1]}</p>
		    		<p className="lyric">{this.props.lyrics[this.props.pos + 2]}</p>
		    		<p className="lyric">{this.props.lyrics[this.props.pos + 3]}</p>
     		    		<p className="lyric">{this.props.lyrics[this.props.pos + 4]}</p>
			</div>
			);
	} else {
		return (
			<div className="lyrics">
				<p className="lyric"></p>
				<p className="lyric"></p>
				<p className="lyric"></p>
				<p className="lyric"></p>
				<p className="lyric"></p>
			</div>
			);
	}		
    }

    render () {
        return (
            <div>
		{this.loaded_lyrics()}
	    	{(this.props.albumArt) ? <img src={this.props.albumArt} className="back-cover" alt=""/> : <div></div>}
	    </div>
		
    	)
    }
}
