import React from 'react'
import AdminManageUser from './AdminManageUser'
import AdminManageMusic from './AdminManageMusic'
import Button from '@mui/material/Button'
import './styles.css'

/* Component for Admin Dashboard */
export default class AdminDashboard extends React.Component {

    state = {
        // all possible states = DEFAULT, MANAGE_USER, MANAGE_MUSIC
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
    handleUserEditPress = () => {this.setState({currentView: 'MANAGE_USER'})}

    //handler for edit user button
    handleMusicEditPress = () => {this.setState({currentView: 'MANAGE_MUSIC'})}

    //callback for return button from any child views
    returnCallback = (newView) => this.setState({currentView: newView})

    render() {

        let view;   

        switch (this.state.currentView) {
            case 'DEFAULT':
                view = this.defaultView();
                break;
            case 'MANAGE_USER':
                view = <AdminManageUser returnCallback={this.returnCallback}/>;
                break; 
            case 'MANAGE_MUSIC':
                view = <AdminManageMusic returnCallback={this.returnCallback}/>;
                break;
            default:
                return null;    
        }
        return (<div  className='admin-container'>{view}</div>)
    }
}
