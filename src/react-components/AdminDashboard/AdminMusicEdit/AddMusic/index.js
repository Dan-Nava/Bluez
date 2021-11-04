import React from 'react'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import AlbumIcon from '@mui/icons-material/Album'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import './styles.css'

/* Component for Admin's Music Add view, we effectively create a new song object here*/
export default class AddMusic extends React.Component {

    state={
        musicFile: 'No File Selected',
        lyricFile: 'No File Selected',
        imageFile: <AlbumIcon id='add-music-placeholder'/>
    }
    
    //return button handler
    handleReturn = () => this.props.returnCallback("DEFAULT");

    //DATABASE CALL: placeholder for Phase 1
    updateImage(e) {

    }

    render() {
        return (
        <>
            <Grid id='add-music-grid' container spacing={10}>
                <Grid item>
                    <Stack spacing={2}>
                        <TextField className='add-music-input' required='true' label='Song Title'/>
                        <TextField className='add-music-input' required='true'  label='Artist'/>
                        <TextField className='add-music-input' required='true' label='Album'/>
                        <TextField className='add-music-input' required='true' label='Genre'/>
                        <TextField className='add-music-input' required='true' label='Year'/>
                    </Stack>
                </Grid>                
                <Grid item>
                    <Stack id='add-music-file-upload-stack' spacing={2}>
                        <label htmlFor='upload-image-file' id='music-label'>
                            <Input 
                                id='upload-image-file' 
                                type='file'
                                accept='image/*'
                                onChange={e => this.updateImage(e) }
                            />
                            <Avatar id='add-music-image' variant='square'>
                                {this.state.imageFile}
                            </Avatar>
                        </label>
                        <Stack className='stack-row' spacing={2} direction='row'>
                            <label htmlFor='upload-music-file' id='music-label'>
                                <Input 
                                    id='upload-music-file' 
                                    type='file'
                                    accept='audio/*'
                                    onChange={e => {
                                        if (e.target.value !== ''){
                                            return this.setState({musicFile: e.target.value.slice(12)})
                                        }
                                    }}
                                />
                                <Button id='add-music-button' component='span' variant='outlined' >
                                    UPLOAD SONG
                                </Button>
                            </label>
                            <p>{this.state.musicFile}</p>
                        </Stack>
                        <Stack className='stack-row' spacing={2} direction='row'>
                            <label htmlFor='upload-lyric-file'>
                                <Input 
                                    id='upload-lyric-file' 
                                    type='file'
                                    accept='.txt'
                                    onChange={e => {
                                        if (e.target.value !== ''){
                                            return this.setState({lyricFile: e.target.value.slice(12)})
                                        }
                                    }}
                                />
                                <Button id='add-lyric-button' component='span' variant='outlined' >
                                    UPLOAD LYRICS
                                </Button>
                            </label>
                            <p>{this.state.lyricFile}</p>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
            <div>
                <Button 
                    className='return-button' 
                    variant="contained"
                    onClick={this.handleReturn}
                >
                    Return
                </Button>
            </div>
        </>
        )
    }
}
