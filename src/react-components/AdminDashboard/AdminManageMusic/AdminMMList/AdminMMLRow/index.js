import React from 'react'
import {TableCell, TableRow} from '@mui/material'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import AlbumIcon from '@mui/icons-material/Album'
import './styles.css'

/* Component for a single row in the list of songs in admin edit music menu
    each row represents one song */
export default class AdminMMLRow extends React.Component {

    //handles song delete
    handleDelete = () => this.props.deleteCallback(this.props.song);

    handleEdit = () => this.props.editCallback(this.props.song);

    addImage(){
        if (this.props.song.coverArt === null ){
            return <AlbumIcon/>
        }
        else{
            return <img className='cover-art-admin-manage-music' alt='' src={this.props.song.coverArt}/>
        }
    }

    render() {

        const {song} = this.props;

        return (
            <TableRow key={song.sID}>
                <TableCell><Avatar variant="square">{this.addImage()}</Avatar></TableCell>
                <TableCell className="music-edit-cell">{song.title}</TableCell>
                <TableCell className="music-edit-cell">{song.artist}</TableCell>
                <TableCell className="music-edit-cell">{song.album}</TableCell>
                <TableCell className="music-edit-cell">{song.genre}</TableCell>
                <TableCell className="music-edit-cell">{song.year}</TableCell>
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
