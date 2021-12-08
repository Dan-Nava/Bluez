import React from 'react'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import AdminMUList from './AdminMUList';
import configs from '../../../config';
import Cookies from 'js-cookie';

import './styles.css';

/* Component for Admin's User Edit view*/
export default class AdminManageUser extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            currentView: 'DEFAULT', //possible views: DEFAULT, EDIT_USER_PROFILE
            userToBeEdited: null,
            accountData: null
        }
    }

    //callback for return button from any child views
    returnCallback = (newView) => this.setState({currentView: newView})

    //return button handler
    handleReturn = () => this.props.returnCallback("DEFAULT");

    async componentDidMount () {
        let token = Cookies.get('token');
        let data = await fetch(`${configs.SERVER_URL}/admin/users?token=${token}`).then(res => res.json());
        this.setState({accountData: data.users})
    }

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
                    {this.state.accountData ?
                    <AdminMUList
                        accountData={this.state.accountData}
                        searchValue={this.state.searchValue}
                    /> 
                    : null}
                </div>
            </>
        )
    }

    render() {

        let view;

        switch (this.state.currentView) {
            case 'DEFAULT':
                view = this.defaultView();
                break;
            default:
                return null;

        }

        return (<>{view}</>)
    }
}
