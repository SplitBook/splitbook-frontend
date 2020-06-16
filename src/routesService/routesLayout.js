import React from 'react';
import { BrowserRouter,Route} from 'react-router-dom';


import Main from '../pages/app/MainPageEE';
import NewRequest from '../pages/app/NewRequest';
import Manual from '../pages/app/Manuals';
import AccountPage from '../pages/app/AccountPage';
import PermissionsManagement from '../pages/app/PermissionsManagement';
import BooksDelivery from '../pages/app/BooksDelivery';
import BooksReturn from '../pages/app/BooksReturn';
import AllRequests from '../pages/app/AllRequests';
import AprovedRequests from '../pages/app/AprovedRequests';
import Subjects from '../pages/app/Subjects';
import AddUsers from '../pages/app/AddUsers';
import AddStudent from '../pages/app/AddStudent';
import AddRegistration from '../pages/app/AddRegistration';
import GeneralClasses from '../pages/app/GeneralClasses';
import SchoolYears from '../pages/app/SchoolYears';
import AddResumes from '../pages/app/AddResumes';
import SearchPhysicalBook from '../pages/app/SearchPhysicalBook';
import BookStates from '../pages/app/BookStates';
import BooksLocations from '../pages/app/BooksLocations';
import Classes from '../pages/app/Classes';
import SchoolEnrollments from '../pages/app/SchoolEnrollments';


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
                    <Route path="/app/registrations" component={SchoolEnrollments}/>
                    <Route path="/app/general/classes" component={GeneralClasses}/>
                    <Route path="/app/classes" component={Classes}/>
                    <Route path="/app/add/resume" component={AddResumes}/>
                    <Route path="/app/schoolyears" component={SchoolYears}/>
                    <Route path="/app/search/physicalbook" component={SearchPhysicalBook}/>
                    <Route path="/app/books/states" component={BookStates}/>
                    <Route path="/app/books/location" component={BooksLocations}/>
                    <Route path="/app/aproved/requests" component={AprovedRequests}/>
                </BrowserRouter>
                
            </>
        );

    
}