import React from 'react';
import Table from '../Components/TableRequisicoesEE';
import './AppStyles.css';
import Header from '../Components/Header';


export default function MainPageEE({props}){
  const [idStatus, setIdStatus] = React.useState(1);
  //const [data, setData] = React.useState([]);
  
    return (
      <>
      <Header title='As minhas requisições'/>
      <Table idStatus={idStatus}/>
      </>
      );

}