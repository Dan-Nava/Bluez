import './App.css';
import React from 'react';
import MusicPlayer from './react-components/MusicPlayer';
import {BrowserRouter} from "react-router-dom";

class App extends React.Component {
    state = {
        loggedIn: false,
        adminAuthed:false,
        playState: false,
	    loop: false,
	    changeTime: 0,
        toggleButton: 'playButton',
        progress: 0,
        redirect: false,
        modeList: ["Video", "Lyric", "Musician", "Social"],
        favList: [],
        playList: ["SoundHelix-Song-1", "SoundHelix-Song-9", "SoundHelix-Song-14", "SoundHelix-Song-15", "SoundHelix-Song-16"],
        song: "SoundHelix-Song-1",
        songMap: (new Map())
    };

    stateChangeHandler(stateName, state) {
        this.setState({[stateName]: state})
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <MusicPlayer state={this.state} stateChangeHandler={this.stateChangeHandler.bind(this)}/>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
