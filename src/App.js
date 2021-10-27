import './App.css';
import React from 'react';
import Home from "./react-components/Landing/landing";
import {Route, Switch, BrowserRouter} from 'react-router-dom';

class App extends React.Component {
    state = {}

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/' render={() =>
                                (<Home appState={this.state}/>)}/>
                        </Switch>
                    </BrowserRouter>
                </header>
            </div>
        );
    }
}

export default App;
