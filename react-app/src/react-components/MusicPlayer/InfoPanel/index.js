import React from 'react';
import './styles.css';
import {Collapse, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore, MusicNote, Settings} from "@mui/icons-material";
import {songData} from "../../HardCodedData";

class InfoPanel extends React.Component {
    state = {
        infoOpen: true,
        settingOpen: false,
    }

    updateSong() {
        let song = this.props.song
        let infoList = []
        for (let i = 0; i < songData.length; i++) {
            if (songData[i]["title"] === song) {
                infoList.push("Title: " + songData[i]["title"])
                infoList.push("Artist: " + songData[i]["artist"])
                infoList.push("Album: " + songData[i]["album"])
                infoList.push("Genre: " + songData[i]["genre"])
                infoList.push("Year: " + songData[i]["year"])
                break;
            }
        }

        this.songInfoList = infoList
        this.songInfoListItems = []
        for (let i = 0; i < this.songInfoList.length; i++) {
            this.songInfoListItems.push(<ListItemText className="songInfoListItem" primary={this.songInfoList[i]}
                                                      key={'i' + i}/>)
        }


    }

    handleClick(openState, open) {
        this.setState({[openState]: !open});
    }

    render() {
        this.updateSong()
        return (
            <div className="infoPanel">
                <List>
                    <ListItemButton onClick={() => this.handleClick("infoOpen", this.state.infoOpen)}>
                        <ListItemIcon>
                            <MusicNote/>
                        </ListItemIcon>
                        <ListItemText primary="Song Info"/>
                        {this.state.infoOpen ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>
                    <Collapse in={this.state.infoOpen} timeout="auto" unmountOnExit>
                        <List>
                            {this.songInfoListItems}
                        </List>
                    </Collapse>
                </List>
            </div>
        );
    }
}

export default InfoPanel;