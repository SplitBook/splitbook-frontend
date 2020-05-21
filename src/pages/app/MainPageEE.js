import React from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '../Components/TableRequisicoesEE';
import Card from '../Components/Card';
import './AppStyles.css';

export default function MainPageEE(){
  const [idStatus, setIdStatus] = React.useState(1);
    return (
      <div >
        <Grid container spacing={2}>
          <Grid item sm>
            <Table idStatus={idStatus}/>
          </Grid>
          <Grid item xs>
            <Card idStatus={idStatus}/>
          </Grid>
        </Grid>
      </div>
      );

}