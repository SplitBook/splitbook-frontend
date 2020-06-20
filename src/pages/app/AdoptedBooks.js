import React from 'react';
import AdoptedBooksTable from '../Components/AdoptedBooksTable';
import Header from '../Components/Header';


export default function Manual(){

    return (
        <>
            <Header title='Manuais adotados'/>
            <AdoptedBooksTable/>
        </>
    );
}