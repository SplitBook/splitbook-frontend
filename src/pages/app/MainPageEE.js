import React from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '../Components/TableRequisicoesEE';
import Card from '../Components/Card';
import './AppStyles.css';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function MainPageEE(){
  const [idStatus, setIdStatus] = React.useState(1);
  const [data, setData] = React.useState([]);
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