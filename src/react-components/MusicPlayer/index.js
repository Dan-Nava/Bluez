import React from 'react';
import Controls from './Controls';
import LyricMode from './LyricMode';
import MusicianMode from './MusicianMode';
import SocialMode from './SocialMode';
import VideoMode from './VideoMode';
import Button from "@mui/material/Button";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import './styles.css';
import song from "./Controls/static/SoundHelix-Song-1.mp3";

// This component is the parent component that will be used to display whichever Music Player is suitable. 
//I.E depending on the mode, the music player will change
export default class MusicPlayer extends React.Component {
    state = {
        playState: false,
        toggleButton: 'playButton',
        progress: 0,
        mode: "Video",
        modeList: ["Video", "Lyric", "Musician", "Social"],
        favList: [],
        song: "",
        songMap: (new Map())
    };

    constructor(props) {
        super(props);
        this.audio_object = new Audio(song);
        this.mode_comp = React.createRef();
        this.setSong("SoundHelix-Song-1.mp3");
        this.addSong("SoundHelix-Song-1.mp3");
        this.mode_idx = this.state.modeList.indexOf(this.state.mode, 0);
    }

    setMode(modeName) {
        this.setState({mode: modeName});
    }

    setSong(songName) {
        this.setState({song: songName});
    }

    addSong(songName) {
        this.state.songMap.set(songName, this.state.songMap.size);
    }

    delSong(songName) {
        this.state.songMap.delete(songName);
    }

    hasSong(songName) {
        return this.state.songMap.has(songName);
    }

    playScreen() {
        if (this.state.mode === "Video") {
            return <VideoMode music={this.state.song}/>
        } else if (this.state.mode === "Lyric") {
            return <LyricMode music={this.state.song}/>
        } else if (this.state.mode === "Musician") {
            return <MusicianMode music={this.state.song}/>
        } else {
            return <SocialMode music={this.state.song}/>
        }
    }

    stateChangeHandler(playState) {
        this.setState({playState: playState})
        this.mode_comp.current.stateChangeHandler(playState)
    }

    clickChangeModeLeft(e) {
        this.setState({mode: this.state.modeList[(this.mode_idx + 4 - 1) % 4]});
        this.mode_idx = (this.mode_idx + 4 - 1) % 4;
    }

    clickChangeModeRight(e) {
        this.setState({mode: this.state.modeList[(this.mode_idx + 1) % 4]});
        this.mode_idx = (this.mode_idx + 1) % 4;
    }

    render() {
        return (<div>
            <div className='mediaPlayer'>
                <SocialMode state={this.state} ref={this.mode_comp} audio_object={this.audio_object}/>
            </div>
            <Button size='large' variant='outlined' startIcon={<ArrowBackIosIcon/>} className="toggleLeft"
                    color="secondary"
                    onClick={(e) => this.clickChangeModeLeft(e)}>{this.state.modeList[(this.mode_idx + 3) % 4]}</Button>
            <Button size='large' variant='outlined' endIcon={<ArrowForwardIosIcon/>} className="toggleRight"
                    color="secondary"
                    onClick={(e) => this.clickChangeModeRight(e)}>{this.state.modeList[(this.mode_idx + 1) % 4]}</Button>
            <Controls state={this.state} audio_object={this.audio_object} stateChangeHandler={this.stateChangeHandler.bind(this)}/>
        </div>)
    }
}
