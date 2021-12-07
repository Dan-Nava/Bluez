import React from 'react';
import configs from '../../../config';
import Button from "@mui/material/Button";
import {
    CoverFlowerBoy,
    CoverPureComedy,
    CoverWhite,
    pureComedLyrics,
    CoverStayAndDecay,
    stayAndDecayLyrics,
    seeYouAgainLyrics,
    //pureComedTimeStamps,
    //stayAndDecayTimeStamps,
    seeYouAgainTimeStamps,
} from '../../HardCodedData'

import './styles.css'

export default class LyricMode extends React.Component {
    constructor(props) {
	super(props);
	this.lyrics = null;
	this.timestamps = null;
	console.log(this.lyrics);
	this.props.audio_object.ontimeupdate = this.pos_value.bind(this);
    }

    async get_data() {
	let result = await fetch(`${configs.SERVER_URL}/music/lyrics?name=${this.props.song}`).then(res => res.json());
	this.timestamps = result.timestamps.replaceAll("\\n", " ").split(" ").map(function(x) {
											return parseInt(x);
										});
	this.lyrics = result.lyrics.split("\\n");
    }

    componentDidUpdate(prevProps, prevState) {
	if ((this.lyrics == null) || (prevProps.song != this.props.song)) {
		this.get_data();
	}
    }

    pos_value() {
	if ((this.props.audio_object) && (this.timestamps)) {
	    for (let i = 0; i <(this.timestamps.length - 1); i++) {
	        if ((this.props.audio_object.currentTime >= this.timestamps[i]) && (this.props.audio_object.currentTime < this.timestamps[i+1]) && (i != this.props.pos)) {
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
        if (this.props.pos < this.timestamps.length - 5) {
            this.props.stateChangeHandler("pos", this.props.pos+1);
        }
    }

    loaded_lyrics() {
	if (this.lyrics) {
		return (
			<div className="lyrics">
		    		<p className="lyric">{this.lyrics[this.props.pos]}</p>
		    		<p className="lyric">{this.lyrics[this.props.pos + 1]}</p>
		    		<p className="lyric">{this.lyrics[this.props.pos + 2]}</p>
		    		<p className="lyric">{this.lyrics[this.props.pos + 3]}</p>
     		    		<p className="lyric">{this.lyrics[this.props.pos + 4]}</p>
			</div>
			);
	} else {
		return (
			<div className="lyrics">
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
