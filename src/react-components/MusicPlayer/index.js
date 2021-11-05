import React from 'react';
import './styles.css';
import Controls from './Controls';
import LyricMode from './LyricMode';
import MusicianMode from './MusicianMode';
import SocialMode from './SocialMode';
import VideoMode from './VideoMode';
import InfoPanel from "./InfoPanel";

import song from "./Controls/static/SoundHelix-Song-1.mp3";
import Login from "../Auth";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Profile from "../Profile";
import Admin from "../AdminDashboard";

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

    stateChangeHandler(playState) {
        this.setState({playState: playState})
        this.mode_comp.current?.stateChangeHandler(playState)
    }

    playScreenRouting() {
        return (
            <Switch>
                <Route exact path='/' render={() =>
                    (<p>Home Page</p>)}/>
                <Route exact path='/profile' render={() =>
                    (<Profile/>)}/>
                <Route exact path='/login' render={() =>
                    (<Login/>)}/>
                <Route exact path='/social' render={() =>
                    (<SocialMode state={this.state} ref={this.mode_comp}
                                 audio_object={this.audio_object}/>)}/>
                <Route exact path='/lyric' render={() =>
                    (<LyricMode music={this.state.song}/>)}/>
                <Route exact path='/musician' render={() =>
                    (<MusicianMode music={this.state.song}/>)}/>
                <Route exact path='/video' render={() =>
                    (<VideoMode music={this.state.song}/>)}/>
                <Route exact path='/admin' render={() =>
                    (<Admin/>)}/>
            </Switch>);
    }

    leftPanelRouting() {
        return (
            <Switch>

            </Switch>
        );
    }

    rightPanelRouting() {
        return (
            <Switch>
                <InfoPanel/>
            </Switch>
        );
    }

    render() {
        return (
            <div className="musicPlayer">
                <div className='mediaPlayer'>
                    {this.playScreenRouting()}
                </div>
                <div className='leftPanel'>
                    {this.leftPanelRouting()}
                </div>
                <div className='rightPanel'>
                    {this.rightPanelRouting()}
                </div>
                <Controls state={this.state} audio_object={this.audio_object}
                          stateChangeHandler={this.stateChangeHandler.bind(this)}/>
            </div>
        );
    }
}
