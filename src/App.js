import './App.css';
import {Route, Switch, BrowserRouter, Link} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import MusicPlayer from './react-components/MusicPlayer';

function App() {
  return (
  	<div className="App">
		<BrowserRouter>
			<Switch>
				<Route exact path='/' render={() => 
      					(<header className="App-header">
        				<p>
          					Edit src/App.js and save to reload.
        				</p>
					<p>
						<Link to={"./MusicPlayer"}>
							<Button size='large' variant='contained' color='primary'>Music Streaming App</Button>
						</Link>
					</p>
      					</header>)}/>
      				<Route exact path='/MusicPlayer' render={() => 
      					(<MusicPlayer />)}/>
			</Switch>
		</BrowserRouter>
    	</div>
  )
}


export default App;
