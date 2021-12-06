import React from 'react'
import {Table, TableBody, TableRow, TableCell, TableHead} from '@mui/material'
import ListRow from './AdminMULRow'
import './styles.css'
import configs from '../../../../config';
import constructRequest from '../../../../utils/requestConstructor';
import Cookies from 'js-cookie';

/* Component for the list of all accounts in Admin's User Edit view */
export default class AdminMUList extends React.Component {

    state={
        accountData: this.props.accountData
    }

    componentDidUpdate(prevProps) {
        //if search input is changed then the list must be re-rendered
        if (prevProps.searchValue !== this.props.searchValue){
           this.setState({accountData: this.search()});
        }
    }

    //returns a list of users based on the filtering specifications
    search() {
        //if the search input is empty, then just return the full list
        if(!this.props.searchValue){
            return this.props.accountData
        }
        //otherwise return a filtered list based on the search input
        else {
            return this.props.accountData.filter((u) => {return u.username.includes(this.props.searchValue)})
        }
    }

    banCallback = (user) => {
        let token = Cookies.get('token');
        let body = {token: token, username: user.username};
        
        if (user.access_level === -1){ // if accounts already banned, unban it and revert it to a regular user
            user.access_level = 0;            
            this.modifyBanState('unban', body);
        } else { //otherwise ban it
            user.access_level = -1;
            this.modifyBanState('ban', body);
        }
        this.setState({accountData: this.props.accountData}); //forces re-render
    }

    async modifyBanState(action, body) {
        await fetch(`${configs.SERVER_URL}/admin/${action}`, constructRequest(body, 'POST')).then(res => res.json()); 
    }

    setAdminCallback = (user) => {
        let token = Cookies.get('token');
        let body = {token: token, username: user.username};

        if (user.access_level === 1) { //if already admin, revert to regular user
            // user.access_level = 0;
            // this.modifyAdminState(body);
        } else { //otherwise set account to admin
            user.access_level = 1;
            this.modifyAdminState(body);
        }
    }

    async modifyAdminState(body) {
        await fetch(`${configs.SERVER_URL}/add`, constructRequest(body, 'POST')).then(res => res.json()); 
    }
    

    renderTableHeader(){
        const tableHeaders = ["", "User Name", "Account Type", "", ""]
        const cellHeaders = [];
        for (let i = 0; i < tableHeaders.length; i++){
            cellHeaders.push(<TableCell key={Math.random()} width={'30'} sx={{fontWeight: 'bold'}}>{tableHeaders[i]}</TableCell>)
        }
        return cellHeaders;
    }

    render() {
        return (
            <div className='user-list'>
                <Table>
                <TableHead id='admin-user-table-head'>
                    <TableRow>
                        {this.renderTableHeader()}
                    </TableRow>
                </TableHead>
                    <TableBody>
                        {this.state.accountData.map((userAcc) => (
                            <ListRow
                                key = {Math.random()}
                                user={userAcc} 
                                banCallback={this.banCallback} 
                                setAdminCallback={this.setAdminCallback}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }
}
