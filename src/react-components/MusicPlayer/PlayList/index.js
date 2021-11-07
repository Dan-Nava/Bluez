import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import ListItemButton from "@mui/material/ListItemButton";

import './styles.css'

export default class PlayList extends React.Component {

    constructor(props) {
        super(props);
        this.playList = this.props.state.playList;
    }

    playListPanel(songName) {
        return (
            <>
                <Divider/>
                <ListItem key={Math.random()}>
                    <ListItemButton onClick={(e) => (this.props.setSong(songName))} key={Math.random()}>
                        <Grid container direction='row' spacing={1}>
                            <Grid item>
                                <Avatar></Avatar>
                            </Grid>
                            <Grid item>
                                <Grid item className='playlist-song-name'>
                                    {songName}
                                </Grid>
                            </Grid>
                        </Grid>
                    </ListItemButton>
                </ListItem>
            </>
        )
    }

    playListRendering(list) {
        const plist = []
        for (let i = 0; i < list.length; i++) {
            plist.push(this.playListPanel(list[i]));
        }
        return (plist)
    }

    render() {
        return (
            <div id='play-list-container'>
                <p><b>Playlist</b></p>
                <List id='play-list' variant='outlined'>
                    {this.playListRendering(this.playList)}
                </List>
            </div>
        )
    }
}
