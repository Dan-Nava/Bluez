import './App.css';
import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Profile from "./react-components/Profile";

class App extends React.Component {
    state = {
        authorized: false
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/profile' render={() =>
                            (<Profile appState={this.state}/>)}/>
                        <Route exact path='/' render={() =>
                            (<p>Home Page</p>)}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
