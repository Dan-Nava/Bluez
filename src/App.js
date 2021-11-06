import './App.css';
import React from 'react';
import MusicPlayer from './react-components/MusicPlayer';
import {BrowserRouter} from "react-router-dom";

class App extends React.Component {
    state = {
        loggedIn: false,
        adminAuthed:false,
        playState: false,
        toggleButton: 'playButton',
        progress: 0,
        redirect: false,
        modeList: ["Video", "Lyric", "Musician", "Social"],
        favList: [],
        song: "",
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
