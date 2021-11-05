import './App.css';
import React from 'react';
import MusicPlayer from './react-components/MusicPlayer';
import {BrowserRouter} from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter forceRefresh={true}>
                    <MusicPlayer/>
                </BrowserRouter>
            </div>
        );
    }
}


export default App;
