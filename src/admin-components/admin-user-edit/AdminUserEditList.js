import React from 'react'
import './AdminUserEditList.css'
import {Table, TableBody, TableRow, TableCell, TableHead} from '@mui/material'
import ListRow from './AdminUserEditListRow.js'

/* Component for the list of User accounts in Admin's User Edit view */
export default class AdminUserEditList extends React.Component {

    //instead of this data, this component will acquire all user account data from the server and store it in an array.
    // It'll then create the row components for each account
    state={
        users:[
            {uID: 1, userName: "info2", password: "info3", type:"admin"}, 
            {uID: 2, userName: "info2", password: "info3", type:"regular"},
            {uID: 3, userName: "info2", password: "info3", type:"regular"},
            {uID: 4, userName: "info2", password: "info3", type:"regular"}]
    }

    banCallback = (user) =>{
        //creates a list of accounts that is missing the banned account
         const newList = this.state.users.filter((u) =>{
             return u !== user;
         })

        //updates list of user accounts so it doesn't include banned account
         this.setState({
             users: newList
         })
    }

    renderTableHeader(){
        const tableHeaders = ["uID", "User Name", "Password", "Account Type", "", ""]
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
                <TableHead className="table-head" >
                        <TableRow> {this.renderTableHeader()} </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map((userAcc) => (
                            <ListRow user={userAcc} banCallback={this.banCallback} />
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }
}
