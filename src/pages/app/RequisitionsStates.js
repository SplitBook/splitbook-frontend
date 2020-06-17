import React from 'react';
import Header from '../Components/Header';
import BookStateTable from '../Components/BookStateTable';

export default function RequisitionsStates(){

    return (
        <>
            <Header title='Estados das requisições'/>
            <BookStateTable/>
        </>
    );
}