import React from 'react';
import Header from '../../Components/Header';
import SchoolEnrollmentsTable from '../../Components/Tables/SchoolEnrollmentsTable';

export default function SchoolEnrollments() {
  return (
    <>
      <Header title="Matriculas" />
      <SchoolEnrollmentsTable />
    </>
  );
}
