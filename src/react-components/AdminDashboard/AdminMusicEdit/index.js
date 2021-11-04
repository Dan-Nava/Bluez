import React from 'react'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import AdminMusicEditList from './AdminMusicEditList';
import AddMusic from './AddMusic';
import './styles.css'

/* Component for Admin's Music Edit view*/
export default class AdminMusicEdit extends React.Component {
    
    //hardcoded data, won't exist in phase 2
    songData=[
        {sID: '1', title: "Stayin Alive", artist: "Bee Gees", album:"How Can You Mend A Broken Heart", genre:"pop", year: '1971'}, 
        {sID: '2', title: "Secrets", artist: "The Weeknd", album:"Starboy", genre:"new wave, R&B", year: '2016'},
        {sID: '3', title: "musicfan44", artist: "oval45", album:"shoebox", genre:"tree", year: '2012'},
        {sID: '4', title: "seesaw68", artist: "info3", album:"nuts", genre:"chicken", year: '1998'},
        {sID: '5', title: "Stayin Alive", artist: "Bee Gees", album:"How Can You Mend A Broken Heart", genre:"pop", year: '1971'}, 
        {sID: '6', title: "Secrets", artist: "The Weeknd", album:"Starboy", genre:"new wave, R&B", year: '2016'},
        {sID: '7', title: "musicfan44", artist: "oval45", album:"shoebox", genre:"tree", year: '2012'},
        {sID: '8', title: "seesaw68", artist: "info3", album:"nuts", genre:"chicken", year: '1998'}]

    state={
        searchValue: '',
        currentView: 'DEFAULT', //possible views: DEFAULT, EDIT_SONG, ADD_SONG
        songToBeEdited: null,
        filterValue: 'title' //possible options: title, artist, album, genre, year

    }

    //edit button callback
    editCallback = (newView, song) => {
        this.setState({songToBeEdited: song, currentView: newView});
    }

    //DATABASE CALL: deletes song from the database
    deleteCallback = (song) => {
       const newlist = this.songData.filter((s) => s !== song);
       this.songData = newlist;
    }

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
                    <AdminMusicEditList 
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

    //DATABASE CALL: will modify the given song
    editMusic() {
        console.log("should open song edit profile page");
        return(
            <>
                <div>
                    <Button 
                        className='return' 
                        variant="contained"
                        onClick={e => this.setState({currentView: 'DEFAULT', songToBeEdited: null})}
                    >
                        Return
                    </Button>
                </div>
            </>
        )
    }

    addMusic() {
        console.log("should open song add profile page");
        return(<AddMusic/>)
    }

    render() {

        let view;

        switch(this.state.currentView){
            case 'DEFAULT':
                view = this.defaultView();
                break;
            case 'EDIT_SONG':
                view = this.editMusic();
                break;
            case 'ADD_SONG':
                view = this.addMusic();
                break;
            default:
                return null;     
        }
        return (<>{view}</>)
    }
}
