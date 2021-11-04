import React from 'react'
import AdminUserEdit from './AdminUserEdit'
import AdminMusicEdit from './AdminMusicEdit'
import Button from '@mui/material/Button'
import './styles.css'

/* Component for Admin Dashboard */
export default class AdminDashboard extends React.Component {

    state = {
        // all possible states = DEFAULT, USER_EDIT, MUSIC_EDIT
        currentView: 'DEFAULT'
    }

    //base view for admin dashboard
    defaultView() {
        return(
            <div className='admin-db-button-div'>
                <Button 
                    variant="outlined" 
                    className='admin-db-button' 
                    sx={{margin: '1em'}} 
                    onClick={this.handleUserEditPress}
                >
                    Manage Users
                </Button>
                <Button 
                    variant="outlined" 
                    className='admin-db-button' 
                    sx={{margin: '1em'}} 
                    onClick={this.handleMusicEditPress}
                >
                    Manage Music
                </Button>
            </div>
        )
    }

    //handler for edit user button
    handleUserEditPress = () => {this.setState({currentView: 'USER_EDIT'})}

    //handler for edit user button
    handleMusicEditPress = () => {this.setState({currentView: 'MUSIC_EDIT'})}

    //callback for return button from any child views
    returnCallback = (newView) => this.setState({currentView: newView})

    render() {

        let view;   

        switch (this.state.currentView) {
            case 'DEFAULT':
                view = this.defaultView();
                break;
            case 'USER_EDIT':
                view = <AdminUserEdit returnCallback={this.returnCallback}/>;
                break; 
            case 'MUSIC_EDIT':
                view = <AdminMusicEdit returnCallback={this.returnCallback}/>;
                break;
            default:
                return null;    
        }
        return (<div  className='admin-container'>{view}</div>)
    }
}
