import React from 'react'
import AdminUserEditList from './AdminUserEditList';
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import './styles.css';

/* Component for Admin's User Edit view*/
export default class AdminUserEdit extends React.Component {

    //hardcoded data, will not exist in phase 2
    accountData = [
        {uID: '1', userName: "user1", password: "info3", type:"admin", banned: false}, 
        {uID: '2', userName: "elephant", password: "info3", type:"regular", banned: false},
        {uID: '3', userName: "shoe", password: "info3", type:"regular", banned: true},
        {uID: '4', userName: "walnut34", password: "info3", type:"regular", banned: false},
        {uID: '5', userName: "user1", password: "info3", type:"admin", banned: false}, 
        {uID: '6', userName: "elephant", password: "info3", type:"regular", banned: false},
        {uID: '7', userName: "bigman123", password: "cheese3", type:"regular", banned: true},
        {uID: '8', userName: "walnut34", password: "info3", type:"regular", banned: false}]

    state={
        searchValue: '',
        currentView: 'DEFAULT', //possible views: DEFAULT, EDIT_USER_PROFILE
        userToBeEdited: null
    }

    //edit button callback - returns user account object of user being edited
    editCallback = (newView, user) => {this.setState({userToBeEdited: user, currentView: newView});}

    //return button handler
    handleReturn = () => this.props.returnCallback("DEFAULT");

    //default view of MANAGE USER menu
    defaultView() { 
        return(
            <>
                <div className= 'admin-user-edit-header'>
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
                    <AdminUserEditList 
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
        return(
            <div>
                <Button 
                    className='return' 
                    variant="contained"
                    onClick={e => this.setState({currentView: 'DEFAULT', userToBeEdited: null})}
                >
                    Return
                </Button>
            </div>
        )
    }

    render() {

        let view;

        switch(this.state.currentView){
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
