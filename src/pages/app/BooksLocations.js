import React from 'react';
import Header from '../../Components/Header';
import BookLocationTable from '../../Components/Tables/BookLocationTable';

export default function BookStates() {
  return (
    <>
      <Header title="Localização dos manuais" />
      <BookLocationTable />
    </>
  );
}
