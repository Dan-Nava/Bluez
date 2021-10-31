import React from 'react'
import AdminUserEditList from './AdminUserEditList';
import './AdminUserEdit.css';
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'

/* Component for Admin's User Edit view*/
export default class AdminUserEdit extends React.Component {

    //instead of this data, this component will acquire all user account data from the server and store it in an array.
    // It'll then create the row components for each account
    accountData = [
        {uID: '1', userName: "user1", password: "info3", type:"admin", banned: false}, 
        {uID: '2', userName: "elephant", password: "info3", type:"regular", banned: false},
        {uID: '3', userName: "shoe", password: "info3", type:"regular", banned: false},
        {uID: '4', userName: "walnut34", password: "info3", type:"regular", banned: false}]

    state={
        searchValue: '',
        //possible views: DEFAULT, EDIT_USER_PROFILE
        currentView: 'DEFAULT',
        userToBeEdited: null
    }

    //edit button callback
    editCallback = (newView, user) => {
        this.setState({userToBeEdited: user, currentView: newView});
    }

    //return button handler
    handleReturn = () => this.props.returnCallback("DEFAULT");

    //default view of the USER_EDIT menu
    defaultView() { 
        return(
            <>
                <div className= 'header'>
                    <Button className='return-button' 
                        variant="contained"
                        onClick={this.handleReturn}>Return</Button>
                    <Input value={this.state.searchValue} type="text" className="search-bar" placeholder="Search User Name"
                        onChange={e => this.setState({searchValue: e.target.value})}/> 
                </div>
                <div>
                    <AdminUserEditList accountData={this.accountData} searchValue={this.state.searchValue} editCallback={this.editCallback}/>
                </div>
            </>
        )
    }

    //view where admin can edit the respective user's profile
    // this should save any changes to the imported data array or straight to the database
    editUserProfile() {
        console.log("should open user edit profile page");
        return(
            <>
                <div>
                    <Button className='return' 
                            variant="contained"
                            onClick={e => this.setState({currentView: 'DEFAULT', userToBeEdited: null})}>Return</Button>
                </div>
            </>
        )
    }

    //things in render() is what is rendered when the component is showing up in the browser
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
