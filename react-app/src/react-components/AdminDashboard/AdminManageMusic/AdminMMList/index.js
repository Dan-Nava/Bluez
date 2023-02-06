import React from 'react'
import {Table, TableBody, TableRow, TableCell, TableHead} from '@mui/material'
import ListRow from './AdminMMLRow'
import './styles.css'

/* Component for the list of User accounts in Admin's User Edit view */
export default class AdminMMList extends React.Component {

    state={
        songList:this.props.songData
    }

    componentDidUpdate(prevProps) {
        //if search input is changed then the list must be re-rendered
        if (prevProps.searchValue !== this.props.searchValue){
           this.setState({songList: this.search()});
        }
    }

    //DATABASE CALL: will return a filtered list of all songs in database based on input
    search(){
        //if the search input is empty, then just return the full list
        if(!this.props.searchValue){
            return this.props.songData
        }
        //otherwise return a filtered list based on the search input and filter option
        else {
            const search = this.props.searchValue.toLowerCase();
            return this.props.songData.filter((u) => {
                switch(this.props.filterValue){
                    case 'title':
                        return u.title.toLowerCase().includes(search);
                    case 'artist':
                        return u.Artist.toLowerCase().includes(search);
                    case 'album':
                        return u.Album.toLowerCase().includes(search);
                    case 'genre':
                        return u.Genres.toLowerCase().includes(search);
                    case 'year':
                        return u.Released.toLowerCase().includes(search);
                    default:
                        return null;
                } 
            })
        }
    }


    deleteCallback = (song) =>{
        //removes song from filtered list
        this.setState({songList: this.state.songList.filter((s) => s !== song)})
        //removes song from data
        this.props.deleteCallback(song);
       
    }

    renderTableHeader(){
        const tableHeaders = [" ", "Title", "Artist", "Album", "Genre", "Year", " ", " "]
        const cellHeaders = [];
        for (let i = 0; i < tableHeaders.length; i++){
            cellHeaders.push(<TableCell width="100" sx={{fontWeight: 'bold'}}>{tableHeaders[i]}</TableCell>)
        }
        return cellHeaders;
    }

    render() {
        return (
            <div className='music-list'>
                <Table>
                <TableHead className="table-head">
                        <TableRow>{this.renderTableHeader()}</TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.songList.map((music) => (
                            <ListRow
                                key={Math.random()}
                                song={music}
                                albumArt={this.props.albumArt[music.title]}
                                deleteCallback={this.deleteCallback} 
                                editCallback={this.props.editCallback}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }
}
