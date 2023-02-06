import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import ListItemButton from "@mui/material/ListItemButton";

import './styles.css'
import {Friends} from '../../HardCodedData'

export default class FriendList extends React.Component {

    constructor(props) {
        super(props);
        this.friends = Friends
    }

    renderFriendCell(userName, title, artist) {
        return (
            <div key={Math.random()}>
                <Divider/>
                <ListItem key={Math.random()}>
                    <ListItemButton key={Math.random()}>
                        <Grid container direction='row' spacing={1}>
                            <Grid item>
                                <Avatar></Avatar>
                            </Grid>
                            <Grid item>
                                <Grid item className='friends-user-name'>
                                    {userName}
                                </Grid>
                                <Grid item className='friends-song-info'>
                                    Listening: {title} - {artist}
                                </Grid>
                            </Grid>
                        </Grid>
                    </ListItemButton>
                </ListItem>
            </div>
        )
    }

    renderFriendList(array) {
        const friendCells = []
        for (let i = 0; i < array.length; i++) {
            friendCells.push(this.renderFriendCell(array[i].user,
                array[i].currentSongTitle, array[i].currentSongArtist));
        }
        return (friendCells)
    }

    render() {
        return (
            <div id='friend-list-container'>
                <p><b>Friends</b></p>
                <List id='friend-list' variant='outlined'>
                    {this.renderFriendList(this.friends)}
                </List>
            </div>
        )
    }
}
