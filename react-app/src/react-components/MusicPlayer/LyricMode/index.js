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
	this.map = new Map();
	this.map.set("See You Again", [seeYouAgainLyrics, seeYouAgainTimeStamps, CoverFlowerBoy]);
	this.map.set("Pure Comedy", [pureComedLyrics, seeYouAgainTimeStamps, CoverPureComedy]);
	this.map.set("Stay And Decay", [stayAndDecayLyrics, seeYouAgainTimeStamps, CoverStayAndDecay]);
	this.props.audio_object.ontimeupdate = this.pos_value.bind(this);

    }

    pos_value() {
	if (this.props.audio_object) {
	    for (let i = 0; i < (this.map.get(this.props.song)[1].length - 1); i++) {
	        if ((this.props.audio_object.currentTime >= this.map.get(this.props.song)[1][i]) && (this.props.audio_object.currentTime < this.map.get(this.props.song)[1][i+1]) && (i != this.props.pos)) {
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
        if (this.props.pos < this.map.get(this.props.song)[0].length - 5) {
            this.props.stateChangeHandler("pos", this.props.pos+1);
        }
    }

    render () {
        return (
            <div >
                <div className="lyrics">
                    <p className="lyric">{this.map.get(this.props.song)[0][this.props.pos]}</p>
                    <p className="lyric">{this.map.get(this.props.song)[0][this.props.pos + 1]}</p>
                    <p className="lyric">{this.map.get(this.props.song)[0][this.props.pos + 2]}</p>
                    <p className="lyric">{this.map.get(this.props.song)[0][this.props.pos + 3]}</p>
                    <p className="lyric">{this.map.get(this.props.song)[0][this.props.pos + 4]}</p>
                </div>
            <div className='settingButton'>
                <Button variant="contained" onClick={(e) => this.scrollUp()}>
                    Previous
                </Button>
                <Button variant="contained" onClick={(e) => this.scrollDown()}>
                    Next
                </Button>
            </div>
                <img src={this.map.get(this.props.song)[2]} className="back-cover" alt=""/>
            </div>
    	)
    }
}
