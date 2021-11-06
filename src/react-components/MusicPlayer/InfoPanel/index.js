import React from 'react';
import './styles.css';
import {Collapse, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore, MusicNote, Settings} from "@mui/icons-material";

class InfoPanel extends React.Component {
    state = {
        infoOpen: true,
        settingOpen: false
    }

    constructor(props) {
        super(props);
        this.songInfoList = ["Artist: NAME", "Album: NAME", "Year: YEAR", "ETC."]
        this.songInfoListItems = []
        for (let i = 0; i < this.songInfoList.length; i++) {
            this.songInfoListItems.push(<ListItemText className="songInfoListItem" primary={this.songInfoList[i]} key={'i'+i}/>)
        }


        this.songSettingList = ["Setting 1", "Setting 2", "Setting 3", "Setting 4"]
        this.songSettingListItems = []
        for (let i = 0; i < this.songSettingList.length; i++) {
            this.songSettingListItems.push(<ListItemText className="songSettingListItem" primary={this.songSettingList[i]} key={'s'+i}/>)
        }
    }

    handleClick(openState, open) {
        this.setState({[openState]: !open});
    }

    render() {
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

                    <ListItemButton onClick={() => this.handleClick("settingOpen", this.state.settingOpen)}>
                        <ListItemIcon>
                            <Settings/>
                        </ListItemIcon>
                        <ListItemText primary="Settings"/>
                        {this.state.settingOpen ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>
                    <Collapse in={this.state.settingOpen} timeout="auto" unmountOnExit>
                        <List>
                            {this.songSettingListItems}
                        </List>
                    </Collapse>
                </List>
            </div>
        );
    }
}

export default InfoPanel;