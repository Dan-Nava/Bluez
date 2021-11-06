import React from 'react'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import AdminMUList from './AdminMUList';
import EditUser from './EditUser';
import './styles.css';

/* Component for Admin's User Edit view*/
export default class AdminManageUser extends React.Component {

    //hardcoded data, will not exist in phase 2
    accountData = [
        {uID: '1', userName: "admin1", password: "asdf23", type:"admin", banned: false}, 
        {uID: '2', userName: "elephant", password: "12312owoe", type:"regular", banned: false},
        {uID: '3', userName: "shoe", password: "Ape334", type:"regular", banned: true},
        {uID: '4', userName: "walnut34", password: "sadfvmk21", type:"regular", banned: false},
        {uID: '5', userName: "admin2", password: "info3", type:"admin", banned: false}, 
        {uID: '6', userName: "giraffe12", password: "safariTime98", type:"regular", banned: false},
        {uID: '7', userName: "bigman123", password: "cheese3", type:"regular", banned: true},
        {uID: '8', userName: "musicMan34", password: "info3", type:"regular", banned: false}]

    state={
        searchValue: '',
        currentView: 'DEFAULT', //possible views: DEFAULT, EDIT_USER_PROFILE
        userToBeEdited: null
    }

    //edit button callback - returns user account object of user being edited
    editCallback = (newView, user) => {this.setState({userToBeEdited: user, currentView: newView});}

    //callback for return button from any child views
    returnCallback = (newView) => this.setState({currentView: newView})

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
        return(
            <EditUser returnCallback={this.returnCallback} user={this.state.userToBeEdited}/>
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
