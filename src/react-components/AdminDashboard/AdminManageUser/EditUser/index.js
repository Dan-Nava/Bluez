import React from 'react'
import Button from '@mui/material/Button'
import './styles.css'
import Input from '@mui/material/Input'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

export default class EditUser extends React.Component {

    state={
        userName: this.props.user.userName,
        password: this.props.user.password
    }

    //return button handler
    handleReturn = () => this.props.returnCallback("DEFAULT");  

    //DATABASE CALL: should update user object in database
    handleUserEdit(){
        return null
    }

    //renders all text inputs
    renderInput(inputLabel, change, val){
        return(
            <TextField 
                error={val.length === 0 ? true : false}
                className='add-user-input' 
                required={true} 
                label={inputLabel} 
                onChange={change}
                value={val}
            />
        )
    }


    render() {
        return (
            <Stack spacing={2} id='edit-user-stack'>
                <label htmlFor='upload-userimg-file' id='user-image-input-label'>
                    <Input 
                        id='upload-userimg-file' 
                        type='file'
                        accept='image/*'
                    />
                    <Avatar id='add-user-image'></Avatar>
                </label>
                {this.renderInput('User Name', (e) => this.setState({userName: e.target.value}), this.state.userName)}
                {this.renderInput('Password', (e) => this.setState({password: e.target.value}), this.state.password)}
                <Stack spacing={3} direction='row'>
                    <Button
                        variant="contained"
                        onClick={this.handleReturn}
                    >
                        Return
                    </Button>
                    <Button
                        variant="contained"
                        onClick={this.handleUserEdit}
                    >
                        Submit
                    </Button>
                </Stack>
            </Stack>
        )
    }
}
