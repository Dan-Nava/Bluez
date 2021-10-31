import React from 'react'
import './AdminUserEditList.css'
import {Table, TableBody, TableRow, TableCell, TableHead} from '@mui/material'
import ListRow from './AdminUserEditListRow.js'

/* Component for the list of User accounts in Admin's User Edit view */
export default class AdminUserEditList extends React.Component {

    state={
        accountList:this.props.accountData
    }

    componentDidUpdate(prevProps) {
        //if search input is changed then the list must be re-rendered
        if (prevProps.searchValue !== this.props.searchValue){
           this.setState({accountList: this.search()});
        }
    }

    search(){
        //if the search input is empty, then just return the full list
        if(!this.props.searchValue){
            return this.props.accountData
        }
        //otherwise return a filtered list based on the search input
        else{
            return this.props.accountData.filter((u) => {return u.userName.includes(this.props.searchValue)})
        }
    }

    //at the moment this just outright deletes the user account, but that will change
    // once the database is implemented. (in that scenario a banned user will be a special type of user account
    // that still exists in the database but cannot be accessed by anyone but an admin).
    banCallback = (user) =>{
        if (user.banned){
            //sets the accounts banned property to true
            user.banned = false;
        }
        else{
            user.banned = true;
        }
        //forces re-render
        this.setState({accountList: this.props.accountData});
       
    }

    renderTableHeader(){
        const tableHeaders = ["User Name", "Password", "Account Type", "UID", "", ""]
        const cellHeaders = [];
        for (let i = 0; i < tableHeaders.length; i++){
            cellHeaders.push(<TableCell width="80" sx={{fontWeight: 'bold'}}>{tableHeaders[i]}</TableCell>)
        }
        return cellHeaders;
    }

    render() {
        return (
            <div>
                <Table className="user-list" align="center">
                <TableHead className="table-head">
                        <TableRow>{this.renderTableHeader()}</TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.accountList.map((userAcc) => (
                            <ListRow user={userAcc} banCallback={this.banCallback} editCallback={this.props.editCallback}/>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }
}
