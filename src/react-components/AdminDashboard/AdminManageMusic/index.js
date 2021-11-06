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
import './styles.css';

/* Component for Admin's Music Edit view*/
export default class AdminManagemusic extends React.Component {
    
    //hardcoded data, won't exist in phase 2
    songData=[
        {sID: '1', title: "Stayin Alive", artist: "Bee Gees", 
            album:"How Can You Mend A Broken Heart", genre:"Disco", year: '1971'}, 
        {sID: '2', title: "Secrets", artist: "The Weeknd", 
            album:"Starboy", genre:"New Wave, R&B", year: '2016'},
        {sID: '3', title: "Midnight City", artist: "M83", 
            album:"Hurry Up, We're Dreaming", genre:"Pop", year: '2011'},
        {sID: '4', title: "Amor a Primera Vista", artist: "Belinda, Los Angeles Azules", 
            album:"Single", genre:"Regional Mexican", year: '2019'},
        {sID: '5', title: "Dancing Queen", artist: "ABBA", 
            album:"Arrival", genre:"Disco", year: '1976'}, 
        {sID: '6', title: "Livin' On a Prayer", artist: "Bon Jovi", 
            album:"Slippery When Wet", genre:"Rock", year: '1971'},
        {sID: '7', title: "Kids", artist: "MGMT", 
            album:"Oracular Spectacular", genre:"Indie, Electronic", year: '2007'},
        {sID: '8', title: "The Veldt", artist: "Deadmau5", 
            album:"Album Title Goes Here", genre:"House", year: '2012'}]

    state={
        searchValue: '',
        currentView: 'DEFAULT', //possible views: DEFAULT, EDIT_SONG, ADD_SONG
        songToBeEdited: null,
        filterValue: 'title' //possible options: title, artist, album, genre, year

    }

    //edit button callback
    editCallback = (song) => {
        this.setState({songToBeEdited: song, currentView: 'EDIT_SONG'});
    }

    //DATABASE CALL: deletes song from the database
    deleteCallback = (song) => {
       const newlist = this.songData.filter((s) => s !== song);
       this.songData = newlist;
    }

    //callback for return button from any child views
    returnCallback = (newView) => this.setState({currentView: newView})

    //return button handler
    handleReturn = () => this.props.returnCallback("DEFAULT");

    //add music button handler
    handleAddMusic = () => this.setState({currentView: 'ADD_SONG'});

    //default view of the MANAGE MUSIC menu
    defaultView() { 
        return(
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
                        songData={this.songData} 
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
        return(<EditAddMusic returnCallback={this.returnCallback} song={song} edit={edit}/>)
    }

    render() {

        let view;

        switch(this.state.currentView){
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
