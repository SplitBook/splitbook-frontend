import React from 'react';
import { BrowserRouter,Route} from 'react-router-dom';

import Login from '../pages/auth/Login';
import RecoverPassword from '../pages/auth/RecoverPassword';
import App from '../pages/Layout/Layout';

export default function Routes(){
    return(
        <BrowserRouter>
            <Route path="/login" exact component={Login}/>
            <Route path="/recover/password" component={RecoverPassword}/>
            <Route path='/app' component={App}>
                <Route path='/app/ee/home' component={App}/>
                <Route path='/app/new/request' component={App}/>
                <Route path="/app/add/manual" component={App}/>
                <Route path="/app/add/publisher" component={App}/>
            </Route>
        </BrowserRouter>
    );
}