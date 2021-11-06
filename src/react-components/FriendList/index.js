import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import ListItemButton from "@mui/material/ListItemButton";

import './styles.css'

export default class FriendList extends React.Component {

    //static data: will be remove for P2 (user and song should be objects)
    friends = [{
        user: 'MusicMan123', currentSongTitle: 'Eye of the Tiger',
        currentSongArtist: 'Survivor'
    },
        {
            user: 'MusicMan123', currentSongTitle: 'Eye of the Tiger',
            currentSongArtist: 'Survivor'
        },
        {
            user: 'MusicMan123', currentSongTitle: 'Eye of the Tiger',
            currentSongArtist: 'Survivor'
        },
        {
            user: 'MusicMan123', currentSongTitle: 'Eye of the Tiger',
            currentSongArtist: 'Survivor'
        },
        {
            user: 'MusicMan123', currentSongTitle: 'Eye of the Tiger',
            currentSongArtist: 'Survivor'
        },
        {
            user: 'MusicMan123', currentSongTitle: 'Eye of the Tiger',
            currentSongArtist: 'Survivor'
        },
        {
            user: 'MusicMan123', currentSongTitle: 'Eye of the Tiger',
            currentSongArtist: 'Survivor'
        },
        {
            user: 'MusicMan123', currentSongTitle: 'Eye of the Tiger',
            currentSongArtist: 'Survivor'
        },
        {
            user: 'MusicMan123', currentSongTitle: 'Eye of the Tiger',
            currentSongArtist: 'Survivor'
        }]

    renderFriendCell(userName, title, artist) {
        return (
            <>
                <Divider/>
                <ListItem>
                    <ListItemButton>
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
            </>
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
