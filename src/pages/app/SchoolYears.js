import React from 'react';
import TableSchollYears from '../Components/TableSchoolYears';
import Header from '../Components/Header';

export default function SchoolYears(){

    return (
        <>
            <Header title='Lista de anos letivos'/>
            <TableSchollYears/>
        </>
    );
}