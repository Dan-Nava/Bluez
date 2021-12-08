import './App.css';
import React from 'react';
import MusicPlayer from './react-components/MusicPlayer';
import {BrowserRouter} from "react-router-dom";
import {createTheme} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
class App extends React.Component {
    state = {
        loggedIn: false,
        adminAuthed: false,
        playState: false,
	loop: false,
	changeTime: 0,
	muted: false,
        redirect: false,
        modeList: ["Video", "Lyric", "Musician", "Social"],
        favList: [],
        playList: ["After The Love Has Gone", "Woman", "How Deep Is Your Love"],
        song: "After The Love Has Gone",
        albumArt: null,
        lyrics: null,
        timestamps: null,
        pos: 0,
	progress: 0,
        songMap: (new Map())
    };

    stateChangeHandler(stateName, state) {
        this.setState({[stateName]: state})
    }

    render() {
        return (

            <ThemeProvider theme={darkTheme}>
            <div className="App">
                <BrowserRouter>
                    <MusicPlayer state={this.state} stateChangeHandler={this.stateChangeHandler.bind(this)}/>
                </BrowserRouter>
            </div>

                </ThemeProvider>
        );
    }
}

export default App;
