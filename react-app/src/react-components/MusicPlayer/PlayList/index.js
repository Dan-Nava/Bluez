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
        }
    }

    songList = this.props.state.playList;

    renderPlaylist() {
        const plist = [];
        for (let i = 0; i < this.state.playlist.length; i++) {
            plist.push(
                <SongCell
                    key={Math.random()}
                    songName={this.state.playlist[i]} 
                    searching={false} 
                    extras={null} 
                    addToPlaylistCallback={null}
                    setSongCallback={this.setSongCallback}
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
            playlist: [...this.state.playlist, songName]
        });
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
                            songName={song} 
                            searching={true} 
                            extras={props}
                            addToPlaylistCallback={this.addToPlaylistCallback}
                            setSongCallback={null}
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
