import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import ListItemButton from "@mui/material/ListItemButton";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import AlbumIcon from '@mui/icons-material/Album';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';


import './styles.css'

export default class PlayList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            playList: [],
        }
    }

    songList = this.props.state.playList;

    //'extras' only relevant to search popup, 
    // it lets autocomplete component know that an element has been clicked
    playListPanel(songName, searching, extras) {
        return (
            <div key={Math.random()}>
                <Divider/>
                <ListItem key={Math.random()} {...extras}>
                    <ListItemButton onClick={() => {
                        if (searching) {
                            this.addToPlaylist(songName);
                        } else {
                            this.props.setSong(songName);
                        }  
                    }} 
                    key={Math.random()}
                    >
                        <Grid container direction='row' spacing={1}>
                            <Grid item>
                                <Avatar variant='square'><AlbumIcon/></Avatar>
                            </Grid>
                            <Grid item>
                                <Grid container direction='column' spacing={1}>
                                    <Grid item id='playlist-song-name'>
                                        {songName}
                                    </Grid>
                                    <Grid item id='playlist-artist-name'>
                                        {'The name of the 2artist goes here'}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Button
                                    id='playlist-song-options-button'
                                    aria-controls='playlist-song-options-menu'
                                    aria-haspopup='true'
                                    //aria-expanded={open ? 'true' : null}
                                >
                                    <MoreVertIcon fontSize="small"/>
                                </Button>
                            </Grid>
                        </Grid>
                    </ListItemButton>
                </ListItem>
            </div>
        )
    }

    renderPlaylist() {
        const plist = [];
        for (let i = 0; i < this.state.playList.length; i++) {
            plist.push(this.playListPanel(this.state.playList[i], false));
        }
        return (plist)
    }

    addToPlaylist(songName) {
        this.setState({
            playList: [...this.state.playList, songName]
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
                    renderOption={(props, song) => (this.playListPanel(song, true, props))}  
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
