import './App.css';
import React from 'react';
import MusicPlayer from './react-components/MusicPlayer';
import {BrowserRouter} from "react-router-dom";

class App extends React.Component {
    state = {
        loggedIn: false,
        adminAuthed: false,
        userId: 1,
        playState: false,
        loop: false,
        changeTime: 0,
        progress: 0,
        redirect: false,
        modeList: ["Video", "Lyric", "Musician", "Social"],
        favList: [],
        playList: ["After The Love Has Gone", "Woman", "How Deep Is Your Love"],
        song: "After The Love Has Gone",
        albumArt: null,
        lyrics: null,
        timestamps: null,
        pos: 0,
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
