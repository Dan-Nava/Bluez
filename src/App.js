import './App.css';
import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Login from "./react-components/Auth";

class App extends React.Component {
    state = {}

    render() {
        return (
            <div className="App">
                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/login' render={() =>
                                (<Login/>)}/>
                        </Switch>
                    </BrowserRouter>
            </div>
        );
    }
}

export default App;
