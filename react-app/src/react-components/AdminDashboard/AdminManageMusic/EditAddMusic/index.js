import React from 'react'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import AlbumIcon from '@mui/icons-material/Album'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import './styles.css'

/* Component for Admin views to edit and add a song, 
we effectively create a new song object here or edit an existing one*/
export default class EditAddMusic extends React.Component {

    constructor(props) {
        super(props);
        if(this.props.song !== null){
            this.state = {
                title: this.props.song.title, 
                artist: this.props.song.Artist, 
                album: this.props.song.Album,
                genre: this.props.song.Genres, 
                year: this.props.song.Released,
                musicFile: 'song.mp3',
                lyricFile: 'lyrics.txt',
                imageFile: <img className='cover-art-admin-edit' src={this.props.song.coverArt} alt='Cover Art'/>
            }
        }
    }

    state={
        musicFile: 'No File Selected',
        lyricFile: 'No File Selected',
        imageFile: <AlbumIcon id='add-music-placeholder'/>,
        title: '',
        artist: '',
        album: '',
        genre: '',
        year: ''
    }

    //DATABASE CALL: would create a new song object and add it to database
    addSong(){
        return null;
    }

    //DATABASE CALL: would update song object in database
    updateSong(){
        return null;
    }

    //return button handler
    handleReturn = () => this.props.returnCallback("DEFAULT");  

    //renders all text inputs
    renderInput(inputLabel, change, val){
        return(
            <TextField 
                error={val.length === 0 ? true : false}
                className='add-music-input' 
                required={true} 
                label={inputLabel} 
                onChange={change}
                value={val}
            />
        )
    }

    render() {
        return (
        <>
            <Grid id='add-music-grid' container spacing={10}>
                <Grid item>
                    <Stack spacing={2}>
                        {this.renderInput('Title', (e) => this.setState({title: e.target.value}), this.state.title)}
                        {this.renderInput('Album', (e) => this.setState({album: e.target.value}), this.state.album)}
                        {this.renderInput('Artist', (e) => this.setState({artist: e.target.value}), this.state.artist)}
                        {this.renderInput('Genre', (e) => this.setState({genre: e.target.value}), this.state.genre)}
                        {this.renderInput('Year', (e) => this.setState({year: e.target.value}), this.state.year)}
                    </Stack>
                </Grid>                
                <Grid item>
                    <Stack id='music-upload-stack' spacing={2}>
                        <label htmlFor='upload-image-file'>
                            <Input 
                                id='upload-image-file' 
                                type='file'
                                accept='image/*'
                            />
                            <Avatar id='add-music-image' variant='square'>
                                {this.state.imageFile}
                            </Avatar>
                        </label>
                        <Stack spacing={2}>
                            <Stack className='stack-row-upload' spacing={2} direction='row'>
                                <label htmlFor='upload-music-file'>
                                    <Input 
                                        id='upload-music-file' 
                                        type='file'
                                        accept='audio/*'
                                        onChange={e => {
                                            if (e.target.value !== ''){
                                                this.setState({musicFile: e.target.value.slice(12)})
                                            }
                                        }}
                                    />
                                    <Button id='add-music-button' component='span' variant='outlined' >
                                        UPLOAD SONG
                                    </Button>
                                </label>
                                <p className='upload-file-string'>{this.state.musicFile}</p>
                            </Stack>
                            <Stack className='stack-row-upload' spacing={2} direction='row'>
                                <label htmlFor='upload-lyric-file'>
                                    <Input 
                                        id='upload-lyric-file' 
                                        type='file'
                                        accept='.txt'
                                        onChange={e => {
                                            if (e.target.value !== ''){
                                                this.setState({lyricFile: e.target.value.slice(12)})
                                            }
                                        }}
                                    />
                                    <Button id='add-lyric-button' component='span' variant='outlined' >
                                        UPLOAD LYRICS
                                    </Button>
                                </label>
                                <p className='upload-file-string'>{this.state.lyricFile}</p>
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
            <Stack id='stack-confirmation-buttons' spacing={2} direction='row'>
                <Button 
                    variant="contained"
                    onClick={this.handleReturn}
                >
                    Return
                </Button>
                <Button 
                    variant="contained"
                    type='submit'
                    onClick={this.props.edit ? this.updateSong() : this.addSong()}
                >
                    Submit
                </Button>
            </Stack>
        </>
        )
    }
}
