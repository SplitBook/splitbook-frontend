import React from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '../Components/TableRequisicoesEE';
import Card from '../Components/Card';


export default function MainPageEE(){
  const [idStatus, setIdStatus] = React.useState(2);
    return (
      <div >
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Table idStatus={idStatus}/>
        </Grid>
        <Grid item xs={5}>
          <Card idStatus={idStatus}/>
        </Grid>
      </Grid>
    </div>
      );

}