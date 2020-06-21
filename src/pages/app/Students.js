import React from 'react';
import Header from '../Components/Header';
import StudentsTable from '../Components/StudentsTable';

export default function Students(){

    return (
        <>
            <Header title='Alunos'/>
            <StudentsTable/>
        </>
    );
}