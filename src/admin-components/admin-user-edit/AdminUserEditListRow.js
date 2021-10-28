import React from 'react'
import {TableCell, TableRow} from '@mui/material'
import Button from '@mui/material/Button'

export default class AdminUserEditListRow extends React.Component {

    //handles user ban
    handleBan = () => this.props.banCallback(this.props.user);

    handleEdit(){
        //open user profile
        console.log("open user profile")
    }

    render() {

        const {user} = this.props;

        return (
            <TableRow key = {user.uID}> 
                <TableCell> {user.uID} </TableCell>
                <TableCell> {user.userName} </TableCell>
                <TableCell> {user.password} </TableCell>
                <TableCell> {user.type} </TableCell>
                <TableCell> 
                    <Button 
                        className='edit-button' 
                        variant="contained" 
                        onClick={this.handleEdit}
                        color='primary'> 
                        EDIT     
                    </Button> 
                </TableCell>
                <TableCell> 
                    <Button 
                        className='ban-button' 
                        variant="contained" 
                        onClick={this.handleBan}
                        color='secondary'> 
                        BAN     
                    </Button> 
                </TableCell>

            </TableRow>
        )
    }
}
