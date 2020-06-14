import React from 'react';
import { BrowserRouter,Route,Redirect} from 'react-router-dom';
import Login from '../pages/auth/Login';
import RecoverPassword from '../pages/auth/RecoverPassword';
import App from '../pages/Layout/Layout';
import Error404 from '../pages/error/error404';
import Cookies from 'js-cookie';
import NewPassword from '../pages/auth/NewPassword';




export default function Routes(){

    return(
            <BrowserRouter>
                <Route path="/404" component={Error404}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/recover/password" component={RecoverPassword}/>
                <Route path="/reset/password" component={NewPassword}/>
                    <Route path='/app' component={App}>
                        <Route path='/app/home' component={App}/>
                        <Route path='/app/new/request' component={App}/>
                        <Route path="/app/add/manual" component={App}/>
                        <Route path="/app/add/subjects" component={App}/>
                        <Route path="/app/account" component={App} />
                        <Route path="/app/permissions" component={App}/>
                        <Route path="/app/books/delivery" component={App}/>
                        <Route path="/app/books/return" component={App}/>
                        <Route path="/app/requests" component={App}/>
                        <Route path="/app/add/user" component={App}/>
                        <Route path="/app/add/student" component={App}/>
                        <Route path="/app/add/registration" component={App}/>
                        <Route path="/app/classes" component={App}/>
                        <Route path="/app/schoolyears" component={App}/>
                        <Route path="/app/add/resume" component={App}/>
                        <Route path="/app/books/states" component={App}/>
                        <Route path="/app/books/location" component={App}/>
                        <Route path="/app/search/physicalbook" component={App}/>
                        <Route path="/app/aproved/requests" component={App}/>
                    </Route>
                <Route path="" redirectTo="/login"/>
                <Route exact path="/" render={() => (
                !(Cookies.get('token') && Cookies.get('tokenLogin'))? (
                    <Redirect to="/login"/>
                ) : (
                    <Redirect to="/app/home"/>
                )
                )}/>
            </BrowserRouter>
        
    );

}

//<Route path="/user/group" component={SelectGroup}/>


