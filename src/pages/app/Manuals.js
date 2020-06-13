import React from 'react';
import TableManual from '../Components/TabelaManuais';
import Header from '../Components/Header';


export default function Manual(){

    return (
        <>
            <Header title='Manuais escolares adotados'/>
            <TableManual/>
        </>
    );
}