import './App.css';
import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Login from "./react-components/Auth";
import MusicPlayer from './react-components/MusicPlayer';

class App extends React.Component {
    constructor(props) {
	super(props);
    	this.state = {mode: "Video",
		      modeList: ["Video", "Lyric", "Musician", "Social"],
		      favList: [],
		      song: "",
	     	      songMap: (new Map())
	    	      };

        this.stateFunc = {
         	setMode: (modeName) => function(modeName) {
			this.setState({mode: modeName});
    		},

    		setSong: (songName) => function(songName) {
			this.setState({song: songName});
    		},

    		addSong: (songName) => function(songName) {
			this.state.songMap.set(songName, this.state.songMap.size);
    		},

    		delSong: (songName) => function(songName) {
			this.state.songMap.delete(songName);
    		},

    		hasSong: (songName) => function(songName) {
			return this.state.songMap.has(songName);
    		},
    	};

    	this.stateFunc.setSong("SoundHelix-Song-1.mp3");
    	this.stateFunc.addSong("SoundHelix-Song-1.mp3");
    };

    render() {
        return (
            <div className="App">
                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/login' render={() =>
                                (<Login/>)}/>
			
			                <Route exact path='/MusicPlayer' render={() =>
      					        (<MusicPlayer state={this.state} stateFunc={this.stateFunc}/>)}/>
                        </Switch>
			
                    </BrowserRouter>

		{/* This creates a button that when pressed goes to the Music Player, just putting it here if needed */}
		{/* <Link to={"./MusicPlayer"}><Button size='large' variant='contained' color='primary'>Music Streaming App</Button></Link>*/}

            </div>
        );
    }
}


export default App;
