import React from 'react'
import AdminUserEditList from './AdminUserEditList';
import './AdminUserEdit.css';
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'

/* Component for Admin's User Edit view*/
export default class AdminUserEdit extends React.Component {

    //return button handler
    handleReturn = () => this.props.returnCallback("DEFAULT")

    //things in render() is what is rendered when the component is showing up in the browser
    render() {
 
        return (
        <>
            <div className= 'header'>
                    <Button className='return-button' 
                    variant="contained" 
                    onClick={this.handleReturn}> Return </Button>
                    <Input type="text" className="search-bar" placeholder="Search User"/>   
            </div>
            <div><AdminUserEditList/> </div>
        </>
        )
    }
}