import React from 'react'
import List from '@mui/material/List'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import SongCell from './SongCell';
import configs from '../../../config'
import Cookies from 'js-cookie';
import constructRequest from '../../../utils/requestConstructor'

import './styles.css'

export default class PlayList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            playlist: [], // ex: [{name: 'abc', pID: 0, favorite: false}, ...]
            pID: 0,
            songList: [], // ex: ['songname1', 'songname2', ...]
            favorites: [] // ex: ['favorite1', 'favorite2', ...]
        }
    }

    async componentDidMount() {
        //server call for all songs in database
        const songData = await fetch(`${configs.SERVER_URL}/music/all`).then(res => res.json());
        let songNames = [];
        for (let i = 0; i < songData.names.length; i++) {
            songNames.push(songData.names[i].name);
        }
        this.setState({songList: songNames})

        //server call for favorites of user
        await this.getFavorites();
        let fav;

        //server call for user's playlist
        this.getPlaylist(fav);
    }

    async getPlaylist(fav) {
        const token = Cookies.get('token');
        const data = await fetch(`${configs.SERVER_URL}/account/playlist?token=${token}`).then(res => res.json());
        const userPL = JSON.parse(data.account.playlist);
        //populates playlist based on user's pre-existing playlist
        if (userPL) { //ie. if its not empty
            let currentPlaylist = [];
            let pID = 0;
            for (let i = 0; i < userPL.length; i++){
                if (this.state.favorites && this.state.favorites.includes(userPL[i])){
                    fav = true;
                } else {
                    fav = false;
                }
                currentPlaylist.push({name: userPL[i], pID: pID, favorite: fav});
                pID += 1;
            }
            this.setState({playlist: currentPlaylist, pID: pID})
        }
    }

    async updatePlaylist (pl) {
        const token = Cookies.get('token');
        const body = {token: token, newValues: {playlist: JSON.stringify(pl)}};
        await fetch(`${configs.SERVER_URL}/account/update`, constructRequest(body, 'POST')).then(res => res.json());
    }

    async getFavorites () {
        const token = Cookies.get('token');
        const favData = await fetch(`${configs.SERVER_URL}/account/favorites?token=${token}`).then(res => res.json());
        this.setState({favorites: JSON.parse(favData.account.favorites)});
    }

    async updateFavorites (favs) {
        const token = Cookies.get('token');
        const body = {token: token, newValues: {favorites: JSON.stringify(favs)}};
        await fetch(`${configs.SERVER_URL}/account/update`, constructRequest(body, 'POST')).then(res => res.json());
    }

    renderPlaylist() {
        const plist = [];
        if (!this.state.playlist){
            return null;
        }
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

    addToPlaylistCallback = async (songName) => {
        let fav;
        if (this.state.favorites.length && this.state.favorites.includes(songName)){
            fav = true;
        } else {
            fav = false;
        }

        await this.setState({
            playlist: [...this.state.playlist, {name: songName, pID: this.state.pID, favorite: fav}],
            pID: this.state.pID + 1
        })

        let songNames = [];
        for (let i = 0; i < this.state.playlist.length; i++) {
            songNames.push(this.state.playlist[i].name);
        }

        //server call to update database playlist
        this.updatePlaylist(songNames);
        //updates app.js playlist state
        this.props.stateChangeHandler('playList', songNames);
    }

    deleteSongCallback = async (songName, pID) => {
        await this.setState({
            playlist:  this.state.playlist.filter((data) => data.songName !== songName && data.pID !== pID)
        })
        //updates app.js playlist state
        let songNames = [];
        for (let i = 0; i < this.state.playlist.length; i++) {
            songNames.push(this.state.playlist[i].name);
        }
        //server call to update database playlist
        this.updatePlaylist(songNames);
        //updates app.js playlist state
        this.props.stateChangeHandler('playList', songNames);
    }

    favoriteSongCallback = async (songName, favorite) => {
        //this effectively updates the front-end 
        await this.setState({playlist: this.state.playlist.map((data) => {
            let newData = data;
            if (newData.name === songName){
                newData.favorite = favorite;
            }
            return newData;
        })});

        if (favorite){ //favoriting the song
            //non-empty favorites list and this song isnt already in it
            if (this.state.favorites.length > 0 && !this.state.favorites.includes(songName)){
                this.setState({favorites: [...this.state.favorites, songName]});
            //empty favorites list
            } else if (this.state.favorites.length === 0){  
                this.setState({favorites: [...this.state.favorites, songName]});
            }
        } else { //un-favoriting the song
            this.setState({favorites: this.state.favorites.filter((song) => song !== songName)});
        }
    
        //server call
        this.updateFavorites(this.state.favorites);
        
    }

    renderPlaylistSearch() {
        return (
            <div id='playlist-search-div'>
                <Autocomplete
                    id="playlist-search-autocomplete"
                    options={this.state.songList}
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
