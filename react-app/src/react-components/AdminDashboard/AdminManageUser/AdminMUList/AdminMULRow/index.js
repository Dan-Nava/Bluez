import React from 'react'
import {TableCell, TableRow} from '@mui/material'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Cookies from 'js-cookie';

import './styles.css'

/* Component for a single row in the list of user accounts in admin edit user menu
    each row represents one account */
export default class AdminMULRow extends React.Component {

    //handles user ban
    handleBan = () => this.props.banCallback(this.props.user);

    handleSetAdmin = () => {
        //modify DOM
        //database call
        this.props.setAdminCallback(this.props.user);
    }

    render() {
        const {user} = this.props;
        let accountType;
        switch (user.access_level) {
            case -1:
                accountType = 'Banned';
                break;
            case 0:
                accountType = 'Regular';
                break;
            case 1:
                accountType = 'Admin';
                break;
            default:
                break;
        }

        return (
            <TableRow key = {Math.random()}>
                <TableCell className='admin-user-table-cell-image'><Avatar></Avatar></TableCell>
                <TableCell className='admin-user-table-cell-text'>{user.username}</TableCell>
                <TableCell className='admin-user-table-cell-text'>{accountType}</TableCell>
                <TableCell> 
                    <Button 
                        id='set-admin-button' 
                        variant="outlined" 
                        onClick={this.handleSetAdmin}
                        color='primary'
                        disabled={(accountType === 'Banned' 
                        || !(Cookies.get('username') === user.username)) ? false : true}
                    >
                        {!(accountType === 'Admin') ? 'SET ADMIN' : 'REVERT ADMIN'}   
                    </Button> 
                </TableCell>
                <TableCell>
                    <Button 
                        id='ban-button' 
                        variant="outlined" 
                        onClick={this.handleBan}
                        color='secondary'
                        disabled={Cookies.get('username') === user.username ? true : false}
                    >
                        {(accountType === 'Banned') ? 'UNBAN' : 'BAN'}
                    </Button>
                </TableCell>
            </TableRow>
        )
    }
}
