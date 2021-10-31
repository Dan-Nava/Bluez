import React from 'react'
import AdminUserEdit from './admin-user-edit/AdminUserEdit'
import Button from '@mui/material/Button'

/* Component for Admin Dashboard */
export default class AdminDashboard extends React.Component {

    state = {
        // all possible states = DEFAULT, USER_EDIT, MUSIC_EDIT
        currentView: 'DEFAULT'
    }

    //base view for admin dashboard
    defaultView() {
        return(
            <>
                <Button className='userEditButton' onClick={this.handleUserEditPress}> User Edit </Button>
                <Button className='MusicEditButton'> Music Edit </Button>
            </>
        )
    }

    //handler for edit user button
    handleUserEditPress = () => {
        this.setState({
            currentView: 'USER_EDIT'
        })
    }

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
            default:
                return null;    
        }

        return (<div>{view}</div>)
    }
}
