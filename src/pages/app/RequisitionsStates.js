import React from 'react';
import Header from '../../Components/Header';
import RequisitionsStateTable from '../../Components/RequisitionsStateTable';

export default function RequisitionsStates() {
  return (
    <>
      <Header title="Estados das requisições" />
      <RequisitionsStateTable />
    </>
  );
}
