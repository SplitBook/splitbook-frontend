import React from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '../Components/TableRequisicoesEE';
import Card from '../Components/Card';


export default function MainPageEE(){

    return (
      <div >
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Table/>
        </Grid>
        <Grid item xs={5}>
          <Card num={1}/>
        </Grid>
      </Grid>
    </div>
      );

    
}