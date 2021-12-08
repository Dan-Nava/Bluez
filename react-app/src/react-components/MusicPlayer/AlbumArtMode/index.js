import React from 'react'
import configs from '../../../config';
import "./styles.css";
export default class AlbumArtMode extends React.Component {

    async get_art() {
	let art = await fetch(`${configs.SERVER_URL}/music/albumArt?name=${this.props.song}`).then(res => res.json());
	this.props.stateChangeHandler("albumArt", art.album_art);
    }

    componentDidMount() {
	if (this.props.albumArt === null) {
	    this.get_art();
	}
    }

    componentDidUpdate(prevProps, prevState) {
	if (prevProps.song !== this.props.song) {
		this.get_art();
	}
    }
    
    render() {
    	return (
        	<div>
			{(this.props.albumArt) 
			? <img src={this.props.albumArt} className="front-cover" alt=""/>
            		: <div></div>}
			{(this.props.albumArt) 
			? <img src={this.props.albumArt} className="back-cover" alt=""/>
            		: <div></div>}
        	</div>
    	);
    }
}
