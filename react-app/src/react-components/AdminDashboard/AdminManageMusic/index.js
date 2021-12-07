import React from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import AdminMMList from './AdminMMList';
import EditAddMusic from './EditAddMusic';
import configs from '../../../config';
import constructRequest from '../../../utils/requestConstructor';
import Cookies from 'js-cookie';

import './styles.css';
import {songData} from "../../HardCodedData";

/* Component for Admin's Music Edit view*/
export default class AdminManageMusic extends React.Component {
    constructor(props) {
        super(props);
         
        this.state = {
            songData: songData,
            searchValue: '',
            currentView: 'DEFAULT', //possible views: DEFAULT, EDIT_SONG, ADD_SONG
            songToBeEdited: null,
            filterValue: 'title' //possible options: title, artist, album, genre, year
        }
    }

    //edit button callback
    editCallback = (song) => {
        this.setState({songToBeEdited: song, currentView: 'EDIT_SONG'});
    }

    //DATABASE CALL: deletes song from the database
    deleteCallback = (song) => {
        const newlist = this.state.songData.filter((s) => s !== song);
        this.setState({songData: newlist})
    }

    //callback for return button from any child views
    returnCallback = (newView) => this.setState({currentView: newView})

    //return button handler
    handleReturn = () => this.props.returnCallback("DEFAULT");

    //add music button handler
    handleAddMusic = () => this.setState({currentView: 'ADD_SONG'});

    async componentDidMount () {
        const data = await fetch(`${configs.SERVER_URL}/music/all`).then(res => res.json());
        const songNames = data.names;
        let songInfo = [];
        for (let i=0; i < songNames.length; i++){
            songInfo.push(await fetch(`${configs.SERVER_URL}/music/info?name=${songNames[i].name}`).then(res => res.json()))
        }
        console.log(songInfo)
        // this.setState({songData: data.users})
    }

    //default view of the MANAGE MUSIC menu
    defaultView() {
        return (
            <>
                <div className='admin-music-edit-header'>
                    <Button
                        className='admin-music-return-button'
                        variant="contained"
                        onClick={this.handleReturn}
                    >
                        Return
                    </Button>
                    <Input
                        value={this.state.searchValue}
                        type="text"
                        className="music-search-bar"
                        placeholder="Search"
                        onChange={e => this.setState({searchValue: e.target.value})}
                    />
                    <Button
                        className='admin-add-music'
                        variant="contained"
                        onClick={this.handleAddMusic}
                    >
                        Add Music
                    </Button>
                </div>
                <div>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Filter By:</FormLabel>
                        <RadioGroup
                            onChange={e => this.setState({filterValue: e.target.value})}
                            row
                            defaultValue="title"
                            className="music-edit-filter-radio-buttons"
                        >
                            <FormControlLabel value="title" control={<Radio/>} label="Title"/>
                            <FormControlLabel value="artist" control={<Radio/>} label="Artist"/>
                            <FormControlLabel value="album" control={<Radio/>} label="Album"/>
                            <FormControlLabel value="genre" control={<Radio/>} label="Genre"/>
                            <FormControlLabel value="year" control={<Radio/>} label="Year"/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div>
                    <AdminMMList
                        songData={this.state.songData}
                        searchValue={this.state.searchValue}
                        filterValue={this.state.filterValue}
                        editCallback={this.editCallback}
                        deleteCallback={this.deleteCallback}
                    />
                </div>
            </>
        )
    }

    EditAddMusic(song, edit) {
        return (<EditAddMusic returnCallback={this.returnCallback} song={song} edit={edit}/>)
    }

    render() {

        let view;

        switch (this.state.currentView) {
            case 'DEFAULT':
                view = this.defaultView();
                break;
            case 'EDIT_SONG':
                view = this.EditAddMusic(this.state.songToBeEdited, true);
                break;
            case 'ADD_SONG':
                view = this.EditAddMusic(null, false);
                break;
            default:
                return null;
        }
        return (<>{view}</>)
    }
}
