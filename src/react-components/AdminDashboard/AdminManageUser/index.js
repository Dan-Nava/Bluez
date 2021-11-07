import React from 'react'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import AdminMUList from './AdminMUList';
import EditUser from './EditUser';
import './styles.css';
import {accountData} from "../../HardCodedData";
/* Component for Admin's User Edit view*/
export default class AdminManageUser extends React.Component {
    state = {
        searchValue: '',
        currentView: 'DEFAULT', //possible views: DEFAULT, EDIT_USER_PROFILE
        userToBeEdited: null
    }

    constructor(props) {
        super(props);
        this.accountData = accountData
    }


    //edit button callback - returns user account object of user being edited
    editCallback = (newView, user) => {
        this.setState({userToBeEdited: user, currentView: newView});
    }

    //callback for return button from any child views
    returnCallback = (newView) => this.setState({currentView: newView})

    //return button handler
    handleReturn = () => this.props.returnCallback("DEFAULT");

    //default view of MANAGE USER menu
    defaultView() {
        return (
            <>
                <div className='admin-user-edit-header'>
                    <Button
                        className='return-button'
                        variant="contained"
                        onClick={this.handleReturn}
                    >
                        Return
                    </Button>
                    <Input
                        value={this.state.searchValue}
                        type="text"
                        className="user-search-bar"
                        placeholder="Search User Name"
                        onChange={e => this.setState({searchValue: e.target.value})}
                    />
                </div>
                <div>
                    <AdminMUList
                        accountData={this.accountData}
                        searchValue={this.state.searchValue}
                        editCallback={this.editCallback}
                    />
                </div>
            </>
        )
    }

    //view where admin can edit the respective user's profile
    //DATABASE CALL: any changes to given user here will be saved to database
    editUserProfile() {
        console.log("should open user edit profile page");
        return (
            <EditUser returnCallback={this.returnCallback} user={this.state.userToBeEdited}/>
        )
    }

    render() {

        let view;

        switch (this.state.currentView) {
            case 'DEFAULT':
                view = this.defaultView();
                break;
            case 'EDIT_USER_PROFILE':
                view = this.editUserProfile();
                break;
            default:
                return null;

        }

        return (<>{view}</>)
    }
}
