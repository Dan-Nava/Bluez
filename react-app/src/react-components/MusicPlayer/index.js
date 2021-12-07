import React from 'react';
import './styles.css';
import Controls from './Controls';
import AlbumArtMode from './AlbumArtMode'
import LyricMode from './LyricMode';
import MusicianMode from './MusicianMode';
import SocialMode from './SocialMode';
import VideoMode from './VideoMode';
import configs from '../../config';
import Login from "../Auth";
import {Redirect, Route, Switch} from "react-router-dom";
import Profile from "../Profile";
import Admin from "../AdminDashboard";
import FriendList from "./FriendList";
import PrivateRoute from "../Auth/privateroute";
import PlayList from "./PlayList";
import InfoPanel from "./InfoPanel";


// This component is the parent component that will be used to display whichever Music Player is suitable. 
//I.E depending on the mode, the music player will change
export default class MusicPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.state;
        this.mode_comp = React.createRef();
        this.audio_object = new Audio(`${configs.SERVER_URL}/music/audio?name=${this.state.song}`);
        this.addSong(this.state.song);
        this.audio_object.addEventListener('ended', () => {
            this.incrementSong()
        });
    }

    incrementSong() {
        if (!this.audio_object.loop) {
            let idx = (this.state.playList.indexOf(this.state.song) + 1) % this.state.playList.length;
            this.setSong(this.state.playList[idx]);
        }
    }

    setMode(modeName) {
        this.setState({mode: modeName});
    }

    async setSong(songName) {
        if (this.audio_object) {
            this.audio_object.pause();
            this.audio_object.src = `${configs.SERVER_URL}/music/audio?name=${songName}`;
            this.audio_object.load();
        } else {
            this.audio_object = new Audio(`${configs.SERVER_URL}/music/audio?name=${songName}`);
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
                <Route exact path='/' render={() => (<Redirect to="/login"/>)}/>

                <Route exact path='/login' render={() => (
                    <Login stateChangeHandler={this.stateChangeHandler.bind(this)}/>)}/>

                <PrivateRoute exact path='/profile' authed={this.state.loggedIn}
                              comp={<Profile userId={this.state.userId}/>}/>

                <PrivateRoute exact path='/social' authed={this.state.loggedIn} comp={
                    <SocialMode state={this.state} ref={this.mode_comp} audio_object={this.audio_object}/>}/>

                <PrivateRoute exact path='/albumArt' authed={this.state.loggedIn}
                              comp={<AlbumArtMode song={this.state.song}/>}/>

                <PrivateRoute exact path='/lyrics' authed={this.state.loggedIn}
                              comp={<LyricMode song={this.state.song} pos={this.state.pos}
                                               albumArt={this.state.albumArt} lyrics={this.state.lyrics}
                                               timestamps={this.state.timestamps}
                                               stateChangeHandler={this.stateChangeHandler.bind(this)}
                                               audio_object={this.audio_object}/>}/>

                <PrivateRoute exact path='/musician' authed={this.state.loggedIn}
                              comp={<MusicianMode song={this.state.song} pos={this.state.pos} albumArt={this.state.albumArt} chords = {this.state.chords} lyrics={this.state.lyrics} timestamps={this.state.timestamps} stateChangeHandler={this.stateChangeHandler.bind(this)} audio_object={this.audio_object}/>}/>

                <PrivateRoute exact path='/video' authed={this.state.loggedIn}
                              comp={<VideoMode state={this.state} audio_object={this.audio_object}/>}/>

                <PrivateRoute exact path='/admin' authed={this.state.adminAuthed} comp={<Admin/>}/>
            </Switch>
        );
    }

    leftPanelRouting() {
        return (
            <Switch>
                <Route exact path='/login' render={() => (<div/>)}/>
                <PrivateRoute exact path='/profile' authed={this.state.loggedIn} comp={(<div/>)}/>
                <PrivateRoute exact path='/social' authed={this.state.loggedIn} comp={<FriendList/>}/>
                <PrivateRoute exact path='/albumArt' authed={this.state.loggedIn}
                              comp={(<PlayList state={this.state} setSong={this.setSong.bind(this)}/>)}/>
                <PrivateRoute exact path='/lyrics' authed={this.state.loggedIn}
                              comp={(<PlayList state={this.state} setSong={this.setSong.bind(this)}/>)}/>
                <PrivateRoute exact path='/musician' authed={this.state.loggedIn}
                              comp={(<PlayList state={this.state} setSong={this.setSong.bind(this)}/>)}/>
                <PrivateRoute exact path='/video' authed={this.state.loggedIn}
                              comp={<PlayList state={this.state} setSong={this.setSong.bind(this)}/>}/>
                <PrivateRoute exact path='/admin' authed={this.state.adminAuthed} comp={(<div/>)}/>
            </Switch>
        );
    }

    rightPanelRouting() {
        return (
            <Switch>
                <Route exact path='/login' render={() => (<div/>)}/>
                <PrivateRoute exact path='/profile' authed={this.state.loggedIn} comp={(<div/>)}/>
                <PrivateRoute exact path='/social' authed={this.state.loggedIn}
                              comp={<InfoPanel state={this.state} song={this.state.song}/>}/>
                <PrivateRoute exact path='/albumArt' authed={this.state.loggedIn}
                              comp={(<InfoPanel state={this.state} song={this.state.song}/>)}/>
                <PrivateRoute exact path='/lyrics' authed={this.state.loggedIn}
                              comp={(<InfoPanel state={this.state} song={this.state.song}/>)}/>
                <PrivateRoute exact path='/musician' authed={this.state.loggedIn}
                              comp={(<InfoPanel state={this.state} song={this.state.song}/>)}/>
                <PrivateRoute exact path='/video' authed={this.state.loggedIn}
                              comp={(<InfoPanel state={this.state} song={this.state.song}/>)}/>
                <PrivateRoute exact path='/admin' authed={this.state.adminAuthed} comp={(<div/>)}/>
            </Switch>
        );
    }

    renderControls() {
        if (this.state.loggedIn) {
            return (
                <Controls state={this.state} authed={this.state.loggedIn} audio_object={this.audio_object}
                          stateChangeHandler={this.stateChangeHandler.bind(this)} setSong={this.setSong.bind(this)}/>
            )
        }
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
                {this.renderControls()}
            </div>
        );
    }
}
