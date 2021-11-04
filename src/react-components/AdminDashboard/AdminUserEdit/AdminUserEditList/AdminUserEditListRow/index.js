import React from 'react'
import {TableCell, TableRow} from '@mui/material'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'

/* Component for a single row in the list of user accounts in admin edit user menu
    each row represents one account */
export default class AdminUserEditListRow extends React.Component {

    //handles user ban
    handleBan = () => this.props.banCallback(this.props.user);

    handleEdit = () => {
        //open user profile
        // this should effectively be a copy of the user profile edit page for the specific user being edited
        this.props.editCallback('EDIT_USER_PROFILE', this.props.user);
    }

    render() {

        const {user} = this.props;

        return (
            <TableRow key = {user.uID}>
                <TableCell><Avatar></Avatar></TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{user.type}</TableCell>
                <TableCell>{user.uID}</TableCell>
                <TableCell> 
                    <Button 
                        className='edit-button' 
                        variant="outlined" 
                        onClick={this.handleEdit}
                        color='primary'> 
                        EDIT     
                    </Button> 
                </TableCell>
                <TableCell>
                    <Button 
                        className='ban-button' 
                        variant="outlined" 
                        onClick={this.handleBan}
                        color='secondary'> 
                        {user.banned ? 'UNBAN' : 'BAN'}
                    </Button>
                </TableCell>
            </TableRow>
        )
    }
}
