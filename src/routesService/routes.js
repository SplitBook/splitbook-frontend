import React from 'react';
import { BrowserRouter,Route,Redirect} from 'react-router-dom';

import Login from '../pages/auth/Login';
import RecoverPassword from '../pages/auth/RecoverPassword';
import App from '../pages/Layout/Layout';
import Error404 from '../pages/error/error404';
import SelectGroup from '../pages/app/SelectGroup';
import Cookies from 'js-cookie';
import NewPassword from '../pages/auth/NewPassword';

export const UserData = () => 'Rafael Martins Santos Costa';

export default function Routes(){


    //console.log('token',Cookies.get('token')===null || Cookies.get('token')==='',Cookies.get('token'));
    return(
            <BrowserRouter>
                <Route path="/404" component={Error404}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/recover/password" component={RecoverPassword}/>
                <Route path="/password" component={NewPassword}/>
                <Route path="/user/group" component={SelectGroup}/>
                <Route path='/app' component={App} render={() => (
                    false ? 
                    (<Redirect to="/login"/>) : (<Redirect to="/login"/>))}>
                    <Route path='/app/home' component={App}/>
                    <Route path='/app/new/request' component={App}/>
                    <Route path="/app/add/manual" component={App}/>
                    <Route path="/app/add/publisher" component={App}/>
                    <Route path="/app/account" component={App}/>
                    <Route path="/app/permissions" component={App}/>
                    <Route path="/app/books/delivery" component={App}/>
                    <Route path="/app/books/return" component={App}/>
                    <Route path="/app/requests" component={App}/>
                    <Route path="/app/aproved/requests" component={App}/>
                </Route>
                <Route path="" redirectTo="/login"/>
                <Route exact path="/" render={() => (
                Cookies.get('token')!==null && Cookies.get('token')!=='' ? (
                    <Redirect to="/login"/>
                ) : (
                    <Redirect to="/app/home"/>
                )
                )}/>
            </BrowserRouter>
        
    );
}