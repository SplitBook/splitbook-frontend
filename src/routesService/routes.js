import React from 'react';
import { BrowserRouter as Router,Route,Redirect} from 'react-router-dom';
import Login from '../pages/auth/Login';
import RecoverPassword from '../pages/auth/RecoverPassword';
import App from '../pages/Layout/Layout';
import Error404 from '../pages/error/error404';
import Cookies from 'js-cookie';
import NewPassword from '../pages/auth/NewPassword';
import jwt_decode from 'jwt-decode';
import applicationRoutes from './appRoutes';

import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

export default function Routes(){
    var token = Cookies.get('token')
    var isAuth = false
    if(token!=null && token!=undefined)
    isAuth=true
    var loc = customHistory.location.pathname
    return(
        <>
        <Router>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/404" component={Error404}/>
                    <Route path="/recover/password" component={RecoverPassword}/>
                    <Route path="/reset/password" component={NewPassword}/>

                    <Route exact path='/' render={() => (
                        (!isAuth)? (
                            <Redirect to="/login"/>
                        ) : (
                            (jwt_decode(token).charge === 'Encarregado de Educação' || jwt_decode(token).charge === 'Professor')?
                            (<Redirect to="/app/home"/>):
                            (<Redirect to="/app/requests"/>)
                        )
                    )}/>
                    <Route path="/app" component={App} render={() => (
                        (!isAuth)?
                        (<Redirect to="/login"/>):(null)
                    )}>
                    <> 
                        {applicationRoutes.map(route => {
                            return <Route path={route.path} component={App}/>        
                        }            
                        )}
                    </>
                    </Route>
                    <Route history={customHistory} path="*" render={() => (
                        (loc==='/')?(<Redirect to='/login'/>):(
                            (!isAuth && (loc!=='/login' && loc!=='/recover/password' && loc!=='/reset/password'))?
                            (<Redirect to='/404'/>):(<Redirect to={loc}/>)
                        )
                    )}/>
                  
        </Router>
        </>
    );
    /*return(
            <BrowserRouter>
            {applicationRoutes.map(route => {

            })}
                <Route path="/404" component={Error404}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/recover/password" component={RecoverPassword}/>
                <Route path="/reset/password" component={NewPassword}/>
            
                    {applicationRoutes.map(route => {
                        if(token!=null){
                            return (<>
                                <Route path='/app' component={App}>
                                    <Route path={route.path} component={App}/>
                                </Route>
                            </>);
                            
                        }            
                    })}
                    
                
                <Route path='' redirectTo="/login"/>
                <Route exact path="/" render={() => (
                !(Cookies.get('token') && Cookies.get('tokenLogin'))? (
                    <Redirect to="/login"/>
                ) : (
                    (jwt_decode(token).charge === 'Encarregado de Educação' || jwt_decode(token).charge === 'Professor')?
                    (<Redirect to="/app/home"/>):
                    (<Redirect to="/app/requests"/>)
                )
                )}/>
            </BrowserRouter>
            
        
    );*/



//<Route path="/user/group" component={SelectGroup}/>
}