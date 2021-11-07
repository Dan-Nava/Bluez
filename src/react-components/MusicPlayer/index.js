import React from 'react';
import './styles.css';
import Controls from './Controls';
import AlbumArtMode from './AlbumArtMode'
import LyricMode from './LyricMode';
import MusicianMode from './MusicianMode';
import SocialMode from './SocialMode';
import VideoMode from './VideoMode';
import InfoPanel from "./InfoPanel";

import song from "./Controls/static/SoundHelix-Song-1.mp3";
import Login from "../Auth";
import {Route, Switch} from "react-router-dom";
import Profile from "../Profile";
import Admin from "../AdminDashboard";
import FriendList from "../FriendList";
import PrivateRoute from "../Auth/privateroute";
import PlayList from "../PlayList";

// This component is the parent component that will be used to display whichever Music Player is suitable. 
//I.E depending on the mode, the music player will change
export default class MusicPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.state;
        this.mode_comp = React.createRef();
        this.setSong("See You Again");
	    this.audio_object = new Audio(process.env.PUBLIC_URL+"/"+this.state.song+".mp3");
	    this.audio_object.addEventListener('ended', () => (function () {
                                                            if (!this.audio_object.loop) {
                                                                const idx = (this.state.playList.indexOf(this.state.song)+1)%this.state.playList.length;
                                                                this.setSong(this.state.playList[idx]);
                                                            }
                                                          }));
        this.addSong("See You Again");
    }

    setMode(modeName) {
        this.setState({mode: modeName});
    }

    setSong(songName) {
	    if (this.audio_object) {
	        this.audio_object.pause();
	        this.audio_object.src = process.env.PUBLIC_URL+"/"+songName+".mp3";
	        this.audio_object.load();
	    } else {
	        this.audio_object = new Audio(process.env.PUBLIC_URL+"/"+songName+".mp3");
	    }
	    this.stateChangeHandler('playState', false);
        this.stateChangeHandler('song', songName);
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

    stateChangeHandler(stateName, state) {
        this.props.stateChangeHandler(stateName, state)
        this.setState({[stateName]: state})
        this.mode_comp.current?.stateChangeHandler()
    }

    playScreenRouting() {
        return (
            <Switch>
                <Route exact path='/' render={() => (<p>Home Page</p>)}/>

                <Route exact path='/login' render={() => (
                    <Login stateChangeHandler={this.stateChangeHandler.bind(this)}/>)}/>

                <PrivateRoute exact path='/profile' authed={this.state.loggedIn} comp={<Profile/>}/>

                <PrivateRoute exact path='/social' authed={this.state.loggedIn} comp={
                    <SocialMode state={this.state} audio_object={this.audio_object}/>}/>

                <PrivateRoute exact path='/albumArt' authed={this.state.loggedIn} comp={<AlbumArtMode/>}/>

                <PrivateRoute exact path='/lyrics' authed={this.state.loggedIn} comp={<LyricMode/>}/>

                <PrivateRoute exact path='/musician' authed={this.state.loggedIn} comp={<MusicianMode/>}/>

                <PrivateRoute exact path='/video' authed={this.state.loggedIn} comp={<VideoMode state={this.state} song={this.state.song} audio_object={this.audio_object}/>}/>

                <PrivateRoute exact path='/admin' authed={this.state.adminAuthed} comp={<Admin/>}/>
            </Switch>
        );
    }

    leftPanelRouting() {
        return (
            <Switch>
                <PrivateRoute exact path='/social' authed={this.state.loggedIn} comp={<FriendList/>}/>
                <PrivateRoute exact path='/video' authed={this.state.loggedIn} comp={<PlayList state={this.state} setSong={this.setSong.bind(this)}/>}/>
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
                          stateChangeHandler={this.stateChangeHandler.bind(this)} setSong={this.setSong.bind(this)}/>
            </div>
        );
    }
}
