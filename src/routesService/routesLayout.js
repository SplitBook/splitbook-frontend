import React from 'react';
import { BrowserRouter,Redirect,Route} from 'react-router-dom';
import notAllowedPage from '../pages/error/notAllowedPage';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import applicationRoutes from './appRoutes';
//import api from '../../services/api';
import App from '../pages/Layout/Layout';


export default function RoutesLayout({history}){
        return(
            <>
               <BrowserRouter>
                    {applicationRoutes.map(route => {
                        if(history.location.pathname===route.path){
                            var token = Cookies.get('token')
                            var decoded = jwt_decode(token);
                            console.log("decoded: "+decoded);
                            console.log("token: "+token);
                            if(decoded===null || token===null || token===undefined){
                                //Verificar se a token está válida
                                history.push('/login');
                                //return <Redirect to='/Login'/>
                            } 
                            else{
                                if((route.role===4 && decoded.charge === 'Encarregado de Educação') && route.redirect){
                                    return <Route path={route.path} component={route.component}/>
                                }
                                else if((route.role===3 && decoded.charge === 'Professor') && route.redirect){
                                    return <Route path={route.path} component={route.component}/>
                                }
                                else if((route.role===2 && decoded.charge === 'Docente') && route.redirect){
                                    return <Route path={route.path} component={route.component}/>
                                }
                                else if(route.redirect && decoded.charge === 'Administrador'){
                                    return <Route path={route.path} component={route.component}/>
                                }
                                else
                                    return <Redirect to='/app/notAllowedPage'/>
                            }
                        }
                                                
                        /*return (
                            (route.role===1 )?(
                                <Route path={route.path} component={route.component}/>
                            ):(
                                <Route path={route.path} component={route.component}/>
                            )
                            
                        <div key={route.path}>
                            <AuthRoute
                            key={route.path}
                            path={route.path}
                            exact={route.exact || false}
                            auth={route.auth}
                            role={route.role}
                            title={route.name}
                            Component={route.component}
                            />
                            {route.subpaths && route.subpaths.length > 0 && (
                            <Switch>
                                {route.subpaths.map(subRoute => {
                                return (
                                    <AuthRoute
                                    key={subRoute.path}
                                    path={route.path + subRoute.path}
                                    exact={subRoute.exact || false}
                                    auth={subRoute.auth}
                                    role={subRoute.role}
                                    title={subRoute.name}
                                    Component={subRoute.component}
                                    />
                                );
                                })}
                            </Switch>
                            )}
                        </div>
                        );*/
                    })}
                    <Route path="/app/notAllowedPage" component={notAllowedPage}/>
                  
                </BrowserRouter>
                
            </>
        );

    
}