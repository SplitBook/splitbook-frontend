import React from 'react';
import { BrowserRouter,Route} from 'react-router-dom';


import Main from '../pages/app/MainPageEE';
import NewRequest from '../pages/app/NewRequest';
import Manual from '../pages/app/Manuals';
import Publisher from '../pages/app/Publishers';

export default function RoutesLayout(){
    return(
        <BrowserRouter>
            <Route path="/app/new/request"  component={NewRequest}/>
            <Route path="/app/ee/home" component={Main}/>
            <Route path="/app/add/manual" component={Manual}/>
            <Route path="/app/add/publisher" component={Publisher}/>
        </BrowserRouter>
    );
    
}