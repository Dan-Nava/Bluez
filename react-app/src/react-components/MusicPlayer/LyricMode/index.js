import React from 'react'
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
        this.lyrics = seeYouAgainLyrics;
        this.timeStamps = seeYouAgainTimeStamps;
	this.albumArt = undefined;
        //These album covers and lyrics would be stored on an external server and would be retrieved

    	switch (this.props.song) {
            case "See You Again":
                this.albumArt = CoverFlowerBoy
            	this.lyrics = seeYouAgainLyrics
            	this.timeStamps = seeYouAgainTimeStamps
            	break;
            case "Pure Comedy":
            	this.albumArt = CoverPureComedy
            	this.lyrics = pureComedLyrics
	    	//timeStamps = pureComedTimeStamps
            	break;
            case "Stay And Decay":
            	this.albumArt = CoverStayAndDecay
                this.lyrics = stayAndDecayLyrics
	    	//timeStamps = stayAndDecayTimeStamps
            	break;
            default:
            	this.albumArt = CoverWhite
            	break;
    	}
	this.props.audio_object.ontimeupdate = this.pos_value.bind(this);

    }

    pos_value() {
	if (this.props.audio_object) {
	    for (let i = 0; i < (this.timeStamps.length - 1); i++) {
	        if ((this.props.audio_object.currentTime >= this.timeStamps[i]) && (this.props.audio_object.currentTime < this.timeStamps[i+1]) && (i != this.props.pos)) {
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
        if (this.props.pos < this.lyrics.length - 5) {
            this.props.stateChangeHandler("pos", this.props.pos+1);
        }
    }

    render () {
        return (
            <div >
                <div className="lyrics">
                    <p className="lyric">{this.lyrics[this.props.pos]}</p>
                    <p className="lyric">{this.lyrics[this.props.pos + 1]}</p>
                    <p className="lyric">{this.lyrics[this.props.pos + 2]}</p>
                    <p className="lyric">{this.lyrics[this.props.pos + 3]}</p>
                    <p className="lyric">{this.lyrics[this.props.pos + 4]}</p>
                </div>
            <div className='settingButton'>
                <Button variant="contained" onClick={(e) => this.scrollUp()}>
                    Previous
                </Button>
                <Button variant="contained" onClick={(e) => this.scrollDown()}>
                    Next
                </Button>
            </div>
                <img src={this.albumArt} className="back-cover" alt=""/>
            </div>
    	)
    }
}
