import React from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '../Components/TableRequisicoesEE';
import Card from '../Components/Card';
import './AppStyles.css';
import Header from '../Components/Header';


export default function MainPageEE({props}){
  const [idStatus, setIdStatus] = React.useState(0);
  setIdStatus(2)
  
    return (
      <>
      <Header title='As minhas requisições'/>
      <div>
        <Grid container spacing={2}>
          <Grid item sm>
            <Table idStatus={idStatus}/>
          </Grid>
          <Grid item xs>
            <Card idStatus={idStatus}/>
          </Grid>
        </Grid>  
      </div>
      </>
      );

}