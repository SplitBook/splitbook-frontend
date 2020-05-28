import React from 'react';
import { BrowserRouter,Route,Redirect} from 'react-router-dom';

import Login from '../pages/auth/Login';
import RecoverPassword from '../pages/auth/RecoverPassword';
import App from '../pages/Layout/Layout';
import Error404 from '../pages/error/error404';
import SelectGroup from '../pages/app/SelectGroup';

export default function Routes(){
    const [loggedIn, setLoggedIn] = React.useState(false);


    return(
        <BrowserRouter>
            <Route path="/404" component={Error404}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/recover/password" component={RecoverPassword}/>
            <Route path="/user/group" component={SelectGroup}/>
            <Route path='/app' component={App}>
                <Route path='/app/ee/home' component={App}/>
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
            loggedIn ? (
                <Redirect to="/app/ee/home"/>
            ) : (
                <Redirect to="/login"/>
            )
            )}/>
        </BrowserRouter>
    );
}