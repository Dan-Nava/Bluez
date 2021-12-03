import React from 'react'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import ListItemButton from "@mui/material/ListItemButton";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AlbumIcon from '@mui/icons-material/Album';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

import './styles.css'


export default class SongCell extends React.Component {

    state = {
        anchorElement: null,
        openOptionsMenu: false,
    }

    handleOnClick = () => {
        if (this.props.searching){
            return this.props.addToPlaylistCallback(this.props.songName);
        }
        else{return this.props.setSongCallback(this.props.songName)}
    }

        //'extras' only relevant to search popup, 
    // it lets autocomplete component know that an element has been clicked
    playListPanel(songName, searching, extras) {
        return (
            <div>
                <Divider/>
                <ListItem id='playlist-song-cell'{...extras}>
                    <ListItemButton
                    onClick={this.handleOnClick} 
                    >
                        <Grid container direction='row' spacing={1} sx={{padding: 0 + 'em'}}>
                            <Grid item>
                                <Avatar variant='square'><AlbumIcon/></Avatar>
                            </Grid>
                            <Grid item>
                                <Grid container direction='column' spacing={1}>
                                    <Grid item id='playlist-song-name'>
                                        {songName}
                                    </Grid>
                                    <Grid item id='playlist-artist-name'>
                                        {'The name of the artist goes here'}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ListItemButton>
                    {searching ? null : this.renderOptionsButton()}
                </ListItem>
            </div>
        )
    }

    renderOptionsButton() {
        let handleOptionsClick = (e) => {
            this.setState({ anchorElement: e.currentTarget, openOptionsMenu: true});
        }
    
        let handleOptionsClose = () => {
            this.setState({anchorElement: null, openOptionsMenu: false});
        }

        return (
            <>
                <Button
                    id='playlist-song-options-button'
                    aria-controls='playlist-song-options-menu'
                    aria-haspopup='true'
                    aria-expanded={this.state.openOptionsMenu ? 'true' : undefined}
                    onClick={handleOptionsClick}
                >
                    <MoreVertIcon/>
                </Button>
                <Menu
                  id="playlist-song-options-menu"
                  aria-labelledby="playlist-song-options-button"
                  anchorEl={this.state.anchorElement}
                  open={this.state.openOptionsMenu}
                  onClose={handleOptionsClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                <MenuItem id="playlist-song-options-delete" onClick={null}><DeleteIcon/>Delete</MenuItem>
                <MenuItem id="playlist-song-options-favorite" onClick={null}><FavoriteBorderIcon/>Favourite</MenuItem>
                </Menu>
            </>
        )
    }

    render() {
        return (
                <>
                    {this.playListPanel(this.props.songName, this.props.searching, this.props.extras)}
                </>
            )
        }

}