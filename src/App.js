import './App.css';
import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Login from "./react-components/Auth";
import Button from "@material-ui/core/Button";
import MusicPlayer from './react-components/MusicPlayer';

class App extends React.Component {
    state = {}

    render() {
        return (
            <div className="App">
                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/login' render={() =>
                                (<Login/>)}/>
			
			    <Route exact path='/MusicPlayer' render={() => 
      					(<MusicPlayer />)}/>
                        </Switch>
			
                    </BrowserRouter>

		{/* This creates a button that when pressed goes to the Music Player, just putting it here if needed */}
		{/* <Link to={"./MusicPlayer"}><Button size='large' variant='contained' color='primary'>Music Streaming App</Button></Link>*/}

            </div>
        );
    }
}


export default App;
