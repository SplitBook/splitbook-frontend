import React from 'react';
import { BrowserRouter,Route, Redirect} from 'react-router-dom';


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
import Subjects from '../pages/app/Subjects';
import Cookies from 'js-cookie';
import AddUsers from '../pages/app/AddUsers';
import AddStudent from '../pages/app/AddStudent';
import AddRegistration from '../pages/app/AddRegistration';
import GeneralClasses from '../pages/app/GeneralClasses';
import SchoolYears from '../pages/app/SchoolYears';


export default function RoutesLayout({history}){
    
        return(
            <>
                <BrowserRouter>
                    <Route path="/app/home" component={Main}/>
                    <Route path="/app/new/request"  component={NewRequest}/>
                    <Route path="/app/add/manual" component={Manual}/>
                    <Route path="/app/add/subjects" component={Subjects}/>
                    <Route path="/app/account" component={AccountPage}/>
                    <Route path="/app/permissions" component={PermissionsManagement}/>
                    <Route path="/app/books/delivery" component={BooksDelivery}/>
                    <Route path="/app/books/return" component={BooksReturn}/>
                    <Route path="/app/requests" component={AllRequests}/>
                    <Route path="/app/add/user" component={AddUsers}/>
                    <Route path="/app/add/student" component={AddStudent}/>
                    <Route path="/app/add/registration" component={AddRegistration}/>
                    <Route path="/app/classes" component={GeneralClasses}/>
                    <Route path="/app/schoolyears" component={SchoolYears}/>
                    <Route path="/app/aproved/requests" component={AprovedRequests}/>
                </BrowserRouter>
                
            </>
        );

    
}