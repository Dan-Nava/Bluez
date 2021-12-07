import React from 'react';
import configs from '../../../config';
import Button from "@mui/material/Button";
import {
    CoverFlowerBoy
} from '../../HardCodedData'

import './styles.css'

export default class LyricMode extends React.Component {
    constructor(props) {
	super(props);
	this.props.audio_object.ontimeupdate = this.pos_value.bind(this);
    }

    async get_data() {
	let result = await fetch(`${configs.SERVER_URL}/music/lyrics?name=${this.props.song}`).then(res => res.json());
	let timestamps = result.timestamps.replaceAll("\\n", " ").split(" ").map(function(x) {
											return parseInt(x);
										});
	let lyrics = result.lyrics.split("\\n");
	this.props.stateChangeHandler("lyrics", lyrics);
	this.props.stateChangeHandler("timestamps", timestamps);
    }

    componentDidUpdate(prevProps, prevState) {
	if ((this.props.lyrics === null) || (prevProps.song !== this.props.song)) {
		this.get_data();
	}
    }

    componentDidMount() {
	if (this.props.lyrics === null) {
		this.get_data();
	}
    }

    pos_value() {
	if ((this.props.audio_object) && (this.props.timestamps)) {
	    for (let i = 0; i <(this.props.timestamps.length - 1); i++) {
	        if ((this.props.audio_object.currentTime >= this.props.timestamps[i]) && (this.props.audio_object.currentTime < this.props.timestamps[i+1]) && (i !== this.props.pos)) {
		    this.props.stateChangeHandler("pos", i);
	        }
	    }
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
            <div >
		{this.loaded_lyrics()}
            <div className='settingButton'>
                <Button variant="contained" onClick={(e) => this.scrollUp()}>
                    Previous
                </Button>
                <Button variant="contained" onClick={(e) => this.scrollDown()}>
                    Next
                </Button>
            </div>
                <img src={CoverFlowerBoy} className="back-cover" alt=""/>
            </div>
    	)
    }
}
