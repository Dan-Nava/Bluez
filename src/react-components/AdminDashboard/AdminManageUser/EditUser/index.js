import React from 'react'
import Button from '@mui/material/Button'

export default class EditUser extends React.Component {

    //return button handler
    handleReturn = () => this.props.returnCallback("DEFAULT");  

    render() {
        return (
            <div>
                <Button 
                    variant="contained"
                    onClick={this.handleReturn}
                >
                    Return
                </Button>
            </div>
        )
    }
}
