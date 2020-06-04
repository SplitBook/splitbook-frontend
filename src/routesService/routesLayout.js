import React from 'react';
import { BrowserRouter,Route} from 'react-router-dom';


import Main from '../pages/app/MainPageEE';
import NewRequest from '../pages/app/NewRequest';
import Manual from '../pages/app/Manuals';
import Publisher from '../pages/app/Publishers';
import AccountPage from '../pages/app/AccountPage';
import PermissionsManagement from '../pages/app/PermissionsManagement';
import BooksDelivery from '../pages/app/BooksDelivery';
import BooksReturn from '../pages/app/BooksReturn';
import AllRequests from '../pages/app/AllRequests';
import AprovedRequests from '../pages/app/AprovedRequests';

export default function RoutesLayout(){
    return(
        <BrowserRouter>
            <Route path="/app/new/request"  component={NewRequest}/>
            <Route path="/app/home" component={Main}/>
            <Route path="/app/add/manual" component={Manual}/>
            <Route path="/app/add/publisher" component={Publisher}/>
            <Route path="/app/account" component={AccountPage}/>
            <Route path="/app/permissions" component={PermissionsManagement}/>
            <Route path="/app/books/delivery" component={BooksDelivery}/>
            <Route path="/app/books/return" component={BooksReturn}/>
            <Route path="/app/requests" component={AllRequests}/>
            <Route path="/app/aproved/requests" component={AprovedRequests}/>

        </BrowserRouter>
    );
    
}