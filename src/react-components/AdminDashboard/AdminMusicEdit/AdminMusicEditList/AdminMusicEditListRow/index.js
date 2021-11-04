import React from 'react'
import {TableCell, TableRow} from '@mui/material'
import Button from '@mui/material/Button'

/* Component for a single row in the list of songs in admin edit music menu
    each row represents one song */
export default class AdminMusicEditListRow extends React.Component {

    //handles song delete
    handleDelete = () => this.props.deleteCallback(this.props.song);


    handleEdit = () => this.props.editCallback('EDIT_SONG', this.props.song);

    render() {

        const {song} = this.props;

        return (
            <TableRow key = {song.sID}> 
                <TableCell>{song.title}</TableCell>
                <TableCell>{song.artist}</TableCell>
                <TableCell>{song.album}</TableCell>
                <TableCell>{song.genre}</TableCell>
                <TableCell>{song.year}</TableCell>
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
                        onClick={this.handleDelete}
                        color='secondary'> 
                        DELETE
                    </Button>
                </TableCell>
            </TableRow>
        )
    }
}
