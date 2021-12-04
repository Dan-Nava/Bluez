import React from 'react'
import List from '@mui/material/List'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import SongCell from './SongCell';

import './styles.css'

export default class PlayList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            playlist: [],
            pID: 0,
        }
    }

    songList = this.props.state.playList;

    renderPlaylist() {
        const plist = [];
        for (let i = 0; i < this.state.playlist.length; i++) {
            plist.push(
                <SongCell
                    key={Math.random()}
                    songName={this.state.playlist[i].name} //this will eventually change to songInfo
                    pID={this.state.playlist[i].pID}
                    favorite={this.state.playlist[i].favorite} 
                    searching={false} 
                    // extras={null} 
                    // addToPlaylistCallback={null}
                    setSongCallback={this.setSongCallback}
                    deleteSongCallback={this.deleteSongCallback}
                    favoriteSongCallback={this.favoriteSongCallback}
                />
            );
        }
        return (plist)
    }

    setSongCallback = (songName) => {
        this.props.setSong(songName);
    }

    addToPlaylistCallback = (songName) => {
        this.setState({
            //TODO: favourite is defaulted to false ATM, needs to be based on user's favorites
            playlist: [...this.state.playlist, {name: songName, pID: this.state.pID, favorite: false}],
            pID: this.state.pID + 1
        })

    }

    deleteSongCallback = (songName, pID) => {
        this.setState({
            playlist:  this.state.playlist.filter((data) => data.songName !== songName && data.pID !== pID)
        })
    }

    favoriteSongCallback = (songName, favorite) => {
        this.setState({playlist: this.state.playlist.map((data) => {
            let newData = data;
            if (newData.name === songName){
                newData.favorite = favorite;
            }
            return newData;
        })});
    }

    renderPlaylistSearch() {
        return (
            <div id='playlist-search-div'>
                <Autocomplete
                    id="playlist-search-autocomplete"
                    options={this.songList}
                    freeSolo
                    size='small'
                    //changes value shown in searchbox after selection
                    // and is the value the user must search for to find the song
                    getOptionLabel = {(option) => (option)} 
                    renderInput={(params) => 
                        <TextField 
                            {...params} 
                            label="Search Song Title"
                            InputProps={{ 
                                ...params.InputProps,
                                startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon/>
                                </InputAdornment>
                                ),
                            }}
                        />
                    }
                    renderOption={(props, song) => (
                        <SongCell
                            key={Math.random()}
                            songName={song}
                            // pID={this.state.playlist[i].pID}
                            searching={true} 
                            extras={props}
                            // favorite={this.state.playlist[i].favorite}
                            addToPlaylistCallback={this.addToPlaylistCallback}
                            // setSongCallback={null}
                            // deleteSongCallback={null}
                        />
                    )}  
                />
            </div>
        )
    }

    render() {
        return (
            <>  
                {this.renderPlaylistSearch()}
                <div id='play-list-container'>
                    <p><b>Playlist</b></p>
                    <List id='play-list' variant='outlined'>
                        {this.renderPlaylist()}
                    </List>
                </div>
            </>
        )
    }
}
