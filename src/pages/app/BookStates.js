import React from 'react';
import Header from '../Components/Header';
import BookStateTable from '../Components/BookStateTable';

export default function BookStates(){

    return (
        <>
            <Header title='Estado dos manuais'/>
            <BookStateTable/>
        </>
    );
}